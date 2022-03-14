using System;
using System.Windows.Forms;
using SafeCoding;

namespace ProstyKalkulator
{
  public partial class Kalkulator : Form
    {
        string input = string.Empty;        //String storing user input
        String operand1 = string.Empty;     //String storing first operand
        String operand2 = string.Empty;     //String storing second operand
        char operation;                     //Char to store operator
        double result = 0.0;                //Get result
        private IFeature FLAG_KALKULATOR_OPERACJA_DZIELENIA = Feature.ControledBy("faa4a222-5470-4de4-9e7a-09460fc304f5");
        public Kalkulator()
        {
            InitializeComponent();
            this.Text = "Calculator";
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "1";
            this.textBox1.Text += input;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "2";
            this.textBox1.Text += input;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "3";
            this.textBox1.Text += input;
        }

        private void button4_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "4";
            this.textBox1.Text += input;
        }

        private void button5_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "5";
            this.textBox1.Text += input;
        }

        private void button6_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "6";
            this.textBox1.Text += input;
        }

        private void resetTextBox(){
        	this.textBox1.Text = "";
        }

        private void button7_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "7";
            this.textBox1.Text += input;
        }

        private void button8_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "8";
            this.textBox1.Text += input;
        }

        private void button9_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "9";
            this.textBox1.Text += input;
        }

        private void button10_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            input += "0";
            this.textBox1.Text += input;
        }

        private void button11_Click(object sender, EventArgs e)
        {
            input += ".";
        }

        private void button12_Click(object sender, EventArgs e)
        {
            operand1 = input;
            operation = '*';
            input = string.Empty;
            resetTextBox();
        }

        private void button13_Click(object sender, EventArgs e)
        {
            operand1 = input;
            operation = '/';
            input = string.Empty;
            resetTextBox();
        }

        private void button14_Click(object sender, EventArgs e)
        {
            operand1 = input;
            operation = '-';
            input = string.Empty;
            resetTextBox();
        }

        private void button15_Click(object sender, EventArgs e)
        {
            operand1 = input;
            operation = '+';
            input = string.Empty;
            resetTextBox();
        }

        private void button16_Click(object sender, EventArgs e)
        {
            operand2 = input;
            Int32 num1, num2;
            Int32.TryParse(operand1, out num1);
            Int32.TryParse(operand2, out num2);

            if (operation == '+')
            {
                result = num1 + num2;
                textBox1.Text = result.ToString();
            }
            else if (operation == '-')
            {
                result = num1 - num2;
                textBox1.Text = result.ToString();
            }
            else if (operation == '*')
            {
                result = num1 * num2;
                textBox1.Text = result.ToString();
            }
            else if (operation == '/')
            {
                FLAG_KALKULATOR_OPERACJA_DZIELENIA
                .Replace(() => {
                    textBox1.Text="Dzielenie nie jest zaimplementowane";
                })
                .With(() => {
                    result = num1 / num2;
                    textBox1.Text = result.ToString();
                });


            }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button17_Click(object sender, EventArgs e)
        {
            this.textBox1.Text = "";
            this.input = string.Empty;
            this.operand1 = string.Empty;
            this.operand2 = string.Empty;
        }



    }
}