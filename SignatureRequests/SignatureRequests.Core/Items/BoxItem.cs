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
        public bool isSignature { get; set; }
        public string text { get; set; }
        public BoxItem(float x, float y, int width, int height, bool isSignature, string text)
        {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.text = text;
            this.isSignature = isSignature;
        }
    }
}
