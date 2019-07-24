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
        public float x { get; set; }
        public float y { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public bool signature { get; set; }
        public string text { get; set; }
        public BoxItem(float X, float Y, int Width, int Height, bool Signature, string Text)
        {
            x = X;
            y = Y;
            width = Width;
            height = Height;
            text = Text;
            signature = Signature;
        }
    }
}
