using System;

namespace SafeCoding
{

  interface IFeature{
    public IFeature Replace(Action code);
    public void With(Action code);
  }

  class Feature : IFeature
  {
    private string uuid { get;  set; }
    private bool value { get;  set; }
    private string name {get;  set;}
    private Action oldCode { get; set; }
    private Action newCode { get; set; }
    internal ControlFeatureServerConnector connector { get; set; }
    public static IFeature ControledBy(string uuid)
    {
      return new Feature()
      {
        uuid = uuid,
        connector = new ControlFeatureServerConnector(uuid)
      };
    }
    public IFeature Replace(Action code)
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
        result.execution = RunCode(newCode);
        result.execution.isMain = true;
      }
      else
      {
        result.execution = RunCode(oldCode);
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
