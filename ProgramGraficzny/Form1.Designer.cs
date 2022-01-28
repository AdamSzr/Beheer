namespace ProgramGraficzny
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.btnImgLoad = new System.Windows.Forms.Button();
            this.btnCMY = new System.Windows.Forms.Button();
            this.btnGray = new System.Windows.Forms.Button();
            this.imgField = new System.Windows.Forms.PictureBox();
            this.btnBase = new System.Windows.Forms.Button();
            this.btnSave = new System.Windows.Forms.Button();
            this.saveFileDialog1 = new System.Windows.Forms.SaveFileDialog();
            ((System.ComponentModel.ISupportInitialize)(this.imgField)).BeginInit();
            this.SuspendLayout();
            //
            // openFileDialog1
            //
            this.openFileDialog1.FileName = "openFileDialog1";
            //
            // btnImgLoad
            //
            this.btnImgLoad.Location = new System.Drawing.Point(13, 13);
            this.btnImgLoad.Name = "btnImgLoad";
            this.btnImgLoad.Size = new System.Drawing.Size(94, 23);
            this.btnImgLoad.TabIndex = 0;
            this.btnImgLoad.Text = "Load Img";
            this.btnImgLoad.UseVisualStyleBackColor = true;
            this.btnImgLoad.Click += new System.EventHandler(this.btnImgLoad_Click);
            //
            // btnCMY
            //
            this.btnCMY.Location = new System.Drawing.Point(275, 13);
            this.btnCMY.Name = "btnCMY";
            this.btnCMY.Size = new System.Drawing.Size(75, 23);
            this.btnCMY.TabIndex = 3;
            this.btnCMY.Text = "CMY";
            this.btnCMY.UseVisualStyleBackColor = true;
            this.btnCMY.Click += new System.EventHandler(this.btnCMY_Click);
            //
            // btnGray
            //
            this.btnGray.Location = new System.Drawing.Point(194, 12);
            this.btnGray.Name = "btnGray";
            this.btnGray.Size = new System.Drawing.Size(75, 23);
            this.btnGray.TabIndex = 4;
            this.btnGray.Text = "Gray";
            this.btnGray.UseVisualStyleBackColor = true;
            this.btnGray.Click += new System.EventHandler(this.btnGray_Click);
            //
            // imgField
            //
            this.imgField.Location = new System.Drawing.Point(13, 43);
            this.imgField.MaximumSize = new System.Drawing.Size(1239, 626);
            this.imgField.Name = "imgField";
            this.imgField.Size = new System.Drawing.Size(1239, 626);
            this.imgField.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.imgField.TabIndex = 5;
            this.imgField.TabStop = false;
            this.imgField.Visible = false;
            //
            // btnBase
            //
            this.btnBase.Location = new System.Drawing.Point(113, 13);
            this.btnBase.Name = "btnBase";
            this.btnBase.Size = new System.Drawing.Size(75, 23);
            this.btnBase.TabIndex = 6;
            this.btnBase.Text = "Base";
            this.btnBase.UseVisualStyleBackColor = true;
            this.btnBase.Click += new System.EventHandler(this.btnBase_Click);
            //
            // btnSave
            //
            this.btnSave.Location = new System.Drawing.Point(356, 13);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(145, 23);
            this.btnSave.TabIndex = 7;
            this.btnSave.Text = "Save img from box";
            this.btnSave.UseVisualStyleBackColor = true;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            //
            // Form1
            //
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSize = true;
            this.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.ClientSize = new System.Drawing.Size(756, 240);
            this.Controls.Add(this.btnSave);
            this.Controls.Add(this.btnBase);
            this.Controls.Add(this.imgField);
            this.Controls.Add(this.btnGray);
            this.Controls.Add(this.btnCMY);
            this.Controls.Add(this.btnImgLoad);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.MaximumSize = new System.Drawing.Size(1284, 724);
            this.MinimumSize = new System.Drawing.Size(505, 55);
            this.Name = "Form1";
            this.Text = "Form1";
            ((System.ComponentModel.ISupportInitialize)(this.imgField)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.Button btnImgLoad;
        private System.Windows.Forms.Button btnCMY;
        private System.Windows.Forms.Button btnGray;
        private System.Windows.Forms.PictureBox imgField;
        private System.Windows.Forms.Button btnBase;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.SaveFileDialog saveFileDialog1;
    }
}
