namespace SafeCoding
{
  using System.Collections.Generic;
  using System.Diagnostics;


  class ServiceResponse
  {
    public bool value { get; set; }
    public string name { get; set; }
    public string uuid { get; set; }
  }

  class ExecutionResult
  {
    public string uuid { get; set; }
    public bool value { get; set; }
    public string name {get;set;}
    public Execution main { get; set; }
    public Execution replace { get; set; }
    public string Serialize() => System.Text.Json.JsonSerializer.Serialize(this);
  }


  class Execution
  {
    private Stopwatch _execTimer;
    public Execution()
    {
      _execTimer = new Stopwatch();
      _execTimer.Start();
    }

    private string _status;

    /// <summary> Indicate that executuon was succesfull</summary>
    public string status
    {
      get { return _status; }
      set
      {
        _execTimer.Stop();
        time = _execTimer.ElapsedMilliseconds;
        _status = value;
      }
    }
    public string errors { get; set; }

    ///<summary> string representation of value </summary>
    public long time { get; set; }
    public bool isMain {get; set;}
  }
}

class Statuses{
 public static string SUCCESS = "SUCCESS";
 public static string FAILED = "FAILED";
 public static string ERROR = "ERROR";

}