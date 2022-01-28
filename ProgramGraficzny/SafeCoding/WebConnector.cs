using System;
using System.Net;
using System.Text.Json;
using System.Net.Http;

namespace SafeCoding
{
  class ControlFeatureServerConnector
  {
    private static Func<string, string> CreateUrl = (string key) => $"http://localhost:3000/api/feature/{key}";
    private static WebClient webClient;
    private static HttpClient httpClient;
    private string featureKey;
    private static string Url;
    //  private WebClient last;

    public ControlFeatureServerConnector(string featureKey)
    {
      this.featureKey = featureKey;

      if (httpClient == null)
        httpClient = new HttpClient();
    }

    public ServiceResponse Download()
    {
      if (Url == default)
        Url = CreateUrl(featureKey);

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
        Url = CreateUrl(featureKey);

      HttpRequestMessage rm = new(HttpMethod.Post, Url);
      rm.Content = new StringContent(er.Serialize());

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