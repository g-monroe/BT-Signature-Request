using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Items
{
    public class SignatureItem
    {
        public string Password { get; set; }
        public string SignatureAlgorithm { get; set; }
        public int Strength { get; set; }
        public string LoadPath { get; set; }
        public string SavePath { get; set; }
        public string SignPath { get; set; }
        public string PfxPath { get; set; }
        public DateTime NotBefore { get; set; }
        public DateTime NotAfter { get; set; }
        public string Location { get; set; }
        public string Reason { get; set; }
        public string ContactInfo { get; set; }
        public SignatureItem()
        {

        }
        public SignatureItem(string password, string signatureAlgorithm = "SHA256WithRSA", int strength = 2048, string loadPath = "", string savePath = "", string signPath = "", string pfxPath = "", DateTime notBefore = new DateTime(), DateTime notAfter = new DateTime(), string location = "", string reason = "", string contactInfo = "")
        {
            SignatureAlgorithm = signatureAlgorithm;
            Password = password;
            Strength = strength;
            LoadPath = loadPath;
            SavePath = savePath;
            SignPath = signPath;
            PfxPath = pfxPath;
            NotBefore = notBefore;
            NotAfter = notAfter;
            Location = location;
            Reason = reason;
            ContactInfo = contactInfo;
        }
    }
}
