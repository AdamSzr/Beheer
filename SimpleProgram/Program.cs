using System;
using SafeCoding;
namespace SimpleProgram
{
    class Program
    {
        static void Main(string[] args)
        {
            //var start = DateTime.Now;

          Feature.ControledBy("testing")
          .Replace(()=>{ throw new Exception("failed") ;})
          .With(()=>{Console.WriteLine("new code"); });




           //  for(int i =0 ;i<2;i++)
           //  {
           //  var w = ControlFeature<int>.ControledBy("testing").Replace(()=>{return z;}).With(()=>{return 2;});
           //  var x = ControlFeature<int>.ControledBy("none").Replace(()=>{return z;}).With(()=>{return 2;});
           //  Console.WriteLine(x);
           //  Console.WriteLine(w);
           //  }
           // var stop = DateTime.Now;
           //  Console.WriteLine(stop-start);
        }
    }
}
