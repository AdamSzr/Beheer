namespace SafeCoding
{
  using System.Collections.Generic;
  using System.Diagnostics;

  enum Status{
    SUCCESS,
    FAILED,
    ERROR
  }

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
    public Execution[] executions { get; set; }
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

    private Status _status;

    /// <summary> Indicate that executuon was succesfull</summary>
    public Status Status
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