using System;
using System.Net;
using System.Text.Json;
using System.Net.Http;

namespace SafeCoding
{
  class ControlFeatureServerConnector
  {
    private static Func<string, string> CreateUrl = (string uuid) => $"http://localhost:3000/api/feature/{uuid}";
    private static HttpClient httpClient;
    private string featureUuid;
    private static string Url;
    //  private WebClient last;

    public ControlFeatureServerConnector(string featureUuid)
    {
      this.featureUuid = featureUuid;

      if (httpClient == null)
        httpClient = new HttpClient();
    }

    public ServiceResponse Download()
    {
      if (Url == default)
        Url = CreateUrl(featureUuid);

      Console.Write(Url);

      try
      {
        HttpRequestMessage rm = new(HttpMethod.Get, Url);
        var responseMess = httpClient.Send(rm);
        var responseBodyStream = responseMess.Content.ReadAsStream();
        var responseBodyString = new System.IO.StreamReader(responseBodyStream).ReadToEnd();
        return JsonSerializer.Deserialize<ServiceResponse>(responseBodyString);
      }
      catch (Exception e)
      {
        Console.Error.Write(e.Message + System.Environment.NewLine);
        return new ServiceResponse(); /* when no internet when serve false as a default, to run old code */
      }
    }

    public bool Publish(ExecutionResult er)
    {
      if (Url == default)
        Url = CreateUrl(featureUuid);

      var content = new System.Net.Http.StringContent(er.Serialize(), System.Text.Encoding.UTF8, "application/json");

      HttpRequestMessage rm = new(HttpMethod.Post, Url);
      rm.Content = content;

      try
      {
        var response = httpClient.Send(rm);
        return response.IsSuccessStatusCode;
      }
      catch (Exception e)
      {
        Console.Error.Write(e.Message + System.Environment.NewLine);
        return false;
      }
    }
  }
}