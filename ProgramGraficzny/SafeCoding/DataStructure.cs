namespace SafeCoding
{
  using System.Collections.Generic;
  using System.Diagnostics;

  class ServiceResponse
  {
    public bool value { get; set; }
  }

  class ExecutionResult
  {
    public string FlagKey { get; set; }
    public bool FlagValue { get; set; }
    public Execution ReplaceExecution { get; set; }
    public Execution WithExecution { get; set; }

    public string Serialize() => System.Text.Json.JsonSerializer.Serialize(this);

  }

  class Execution
  {
    private Stopwatch _execTimer;
    public Execution()
    {
      _execTimer = new Stopwatch();
      Errors = new List<string>();
      _execTimer.Start();
    }

    private bool _status;

/// <summary> Indicate that executuon was succesfull</summary>
    public bool Status
    {
      get { return _status; }
      set
      {
        _execTimer.Stop();
        Time = _execTimer.ElapsedMilliseconds;
        _status = value;
      }
    }
    public List<string> Errors { get; set; }

    ///<summary> string representation of value </summary>
    public long Time { get; set; }
    public bool IsNewCode {get; set;}
  }
}