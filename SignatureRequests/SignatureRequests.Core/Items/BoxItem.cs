using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Items
{
    public class BoxItem
    {
        public float X { get; set; }
        public float Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public bool NotSignature { get; set; }
        public string Text { get; set; }
        public BoxItem(float x, float y, int width, int height, bool notsignature, string text)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
            Text = text;
            NotSignature = notsignature;
        }
    }
}
