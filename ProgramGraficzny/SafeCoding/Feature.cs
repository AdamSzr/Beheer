using System;

namespace SafeCoding
{
  class Feature
  {
    public string key { get; private set; }
    public bool value { get; private set; }

    private Action oldCode { get; set; }
    private Action newCode { get; set; }


    private ControlFeatureServerConnector connector { get; set; }

    public static Feature ControledBy(string key)
    {
      return new Feature()
      {
        key = key,
        connector = new ControlFeatureServerConnector(key)
      };
    }


    public Feature Replace(Action code)
    {
      this.oldCode = code;
      return this;
    }

    public void With(Action code)
    {
      newCode = code;
      Execute();
    }

    private void Execute()
    {
      ExecutionResult result = new();
      result.FlagKey = key;
      result.FlagValue = connector.Download().value;
      if (result.FlagValue)
      {
        result.WithExecution = RunCode(newCode);
        result.WithExecution.IsNewCode = true;
      }
      else
      {
        result.ReplaceExecution = RunCode(oldCode);
      }


      connector.Publish(result);
    }


    private Execution RunCode(Action code)
    {
      Execution exec = new();
      try
      {
        code();
        exec.Status = true;
      }
      catch (Exception ex)
      {
        exec.Status = false;
        exec.Errors.Add(ex.Message);
      }
      return exec;
    }

    private bool SendStats()
    {
      return true;
    }

  }
}
