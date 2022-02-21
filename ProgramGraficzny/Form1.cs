using System;
using System.Drawing;
using System.Windows.Forms;

namespace ProgramGraficzny
{
  using SafeCoding;
  public partial class Form1 : Form
  {
    private readonly string FLAG_ZAPISYWANIE_OBRAZKA = "76c5481a-1c03-4109-a20b-56256fcc55c5";

    private Bitmap imgBase;
    private Bitmap imgCMY;
    private Bitmap imgGray;
    private string imgName;
    private imgType imgType;

    public Form1()
    {

      InitializeComponent();
      this.Text = "Converter RGB -> GRAY | CMY";

    }

    private void btnImgLoad_Click(object sender, EventArgs e)
    {
      using (openFileDialog1 = new OpenFileDialog()
      {
        Filter = "Image Files(*.BMP;*.JPG;*.GIF;*.PNG)|*.BMP;*.JPG;*.GIF;*.PNG|All files (*.*)|*.*",
        InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.CommonPictures)
      })
      {
        if (openFileDialog1.ShowDialog() == DialogResult.OK)
        {
          if (this.imgBase != null || this.imgCMY != null || this.imgGray != null)
          {
            this.imgBase = this.imgGray = this.imgCMY = null;
          }

          this.imgName = openFileDialog1.SafeFileName;

          var filepath = openFileDialog1.FileName;
          this.imgBase = (Bitmap)Image.FromFile(filepath);
          this.imgField.Image = imgBase;

          this.Size = new Size(imgBase.Width + 150, imgBase.Height + 150);


          this.imgType = imgType.normal;
          this.imgField.Visible = true;
        }
      }


    }

    private void btnGray_Click(object sender, EventArgs e)
    {

      if (this.imgBase != null)
      {
        if (this.imgGray == null)
        {
          this.imgGray = conv2Gray(this.imgBase);
          this.imgField.Image = this.imgGray;
        }
        else
        {
          this.imgField.Image = this.imgGray;
        }
        this.imgType = imgType.gray;
      }
    }
    public Bitmap conv2CMY(Bitmap arg)
    {
      var pixel = arg.GetPixel(0, 0);


      Bitmap ret = new Bitmap(arg.Width, arg.Height);
      for (int y = 0; y < arg.Height; y++)
      {
        for (int x = 0; x < arg.Width; x++)
        {
          pixel = arg.GetPixel(x, y);
          ret.SetPixel(x, y, convColorRgb2CMY(pixel));
        }
      }
      return ret;
    }

    public Bitmap conv2Gray(Bitmap arg)
    {
      var pixel = arg.GetPixel(0, 0);
      int grayValue = 0;
      Bitmap ret = new Bitmap(arg.Width, arg.Height);
      for (int y = 0; y < arg.Height; y++)
      {
        for (int x = 0; x < arg.Width; x++)
        {
          pixel = arg.GetPixel(x, y);
          grayValue = (pixel.R + pixel.G + pixel.G) / 3;
          ret.SetPixel(x, y, Color.FromArgb(grayValue, grayValue, grayValue));
        }
      }
      return ret;
    }

    private void btnBase_Click(object sender, EventArgs e)
    {
      if (this.imgBase != null)
      {
        this.imgField.Image = this.imgBase;
        this.imgType = imgType.normal;
      }

    }

    public static Color convColorRgb2CMY(Color color) =>
        Color.FromArgb(
            255 - color.R,
            255 - color.G,
            255 - color.B
            );

    private void btnCMY_Click(object sender, EventArgs e)
    {
      if (this.imgBase != null)
      {
        if (this.imgCMY == null)
        {
          this.imgCMY = conv2CMY(imgBase);
          this.imgField.Image = this.imgCMY;

        }
        else
        {
          this.imgField.Image = this.imgCMY;
        }
        this.imgType = imgType.cmy;
      }
    }

    private string generateFileName() => $"{imgType.ToString()}_{this.imgName}";

    private void btnSave_Click(object sender, EventArgs e)
    {

      Feature.ControledBy(FLAG_ZAPISYWANIE_OBRAZKA)
      .Replace(() =>
      {
        string message = "This functionality is not ready.";
        string caption = "We are working.";
        MessageBoxButtons buttons = MessageBoxButtons.OK;

        MessageBox.Show(message, caption, buttons);
      }).With(() =>
      {
        if (this.imgBase != null)
        {
          saveFileDialog1 = new SaveFileDialog() { Filter = " Image Files(*.BMP;*.JPG,*.PNG)|*.BMP;*.JPG;*.PNG", FileName = generateFileName() };

          if (saveFileDialog1.ShowDialog() == DialogResult.OK)
          {
            using (var x = saveFileDialog1.OpenFile())
            {
              this.imgField.Image.Save(x, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
          }
        }
      });


    }
  }
  enum imgType
  {
    normal,
    gray,
    cmy,
  }

}