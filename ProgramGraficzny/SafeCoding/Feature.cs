using System;

namespace SafeCoding
{
  class Feature
  {
    public string uuid { get; private set; }
    public bool value { get; private set; }
    public string name {get; private set;}

    private Action oldCode { get; set; }
    private Action newCode { get; set; }


    private ControlFeatureServerConnector connector { get; set; }

    public static Feature ControledBy(string uuid)
    {
      return new Feature()
      {
        uuid = uuid,
        connector = new ControlFeatureServerConnector(uuid)
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
      result.uuid = uuid;
      var response = connector.Download();
      result.value = response.value;
      result.name = response.name;
      if (result.value)
      {
        result.main = RunCode(newCode);
        result.main.isMain = true;
      }
      else
      {
        result.replace = RunCode(oldCode);
      }


      connector.Publish(result);
    }


    private Execution RunCode(Action code)
    {
      Execution exec = new();
      try
      {
        code();
        exec.status = Statuses.SUCCESS;
      }
      catch (Exception ex)
      {
        exec.status = Statuses.FAILED;
        exec.errors = ex.Message;
      }
      return exec;
    }

  }
}
