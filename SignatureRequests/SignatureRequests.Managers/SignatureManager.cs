﻿using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers
{
    public class SignatureManager : ISignatureManager
    {
        private readonly ISignatureHandler _signatureHandler;
        private readonly IUserHandler _userHandler;
        public SignatureManager(ISignatureHandler signatureHandler, IUserHandler userHandler)
        {
            _signatureHandler = signatureHandler;
            _userHandler = userHandler;
        }
        public SignatureResponse CreateSignatureEntity(SignatureRequest newSignature)
        {
            var result = SignatureToDbItem(newSignature);
            _signatureHandler.Insert(result);
            _signatureHandler.SaveChanges();
            var resp = SignatureToListItem(result);
            return resp;
        }
        public async Task SaveSignatureAsync(MultipartMemoryStreamProvider provider, string filePath)
        {
            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();
                Stream x = await file.ReadAsStreamAsync();
                Image pix = Image.FromStream(x);
                Bitmap bmp;
                using (var ms = x)
                {
                    bmp = new Bitmap(ms);
                }
                Color white = Color.White;
                bmp.MakeTransparent(white);
                string workingDirectory = System.Reflection.Assembly.GetExecutingAssembly().Location;
                bmp.Save(AppDomain.CurrentDomain.BaseDirectory + filePath + filename, ImageFormat.Png);
            }
        }
        public void Delete(int id)
        {
            var signature = _signatureHandler.GetById(id);
            _signatureHandler.Delete(signature);
            _signatureHandler.SaveChanges();
        }

        public SignatureResponse GetSignature(int id)
        {
            var result = _signatureHandler.GetById(id);
            var resp = SignatureToListItem(result);
            return resp;
        }

        public SignatureResponseList GetSignatures()
        {
           var result = _signatureHandler.GetAll();
           var resp = SignatureToListResponse(result);
           return resp;
        }
        public SignatureResponseList GetAllInclude()
        {
            var result = _signatureHandler.GetAllInclude();
            var resp = SignatureToListResponse(result);
            return resp;
        }
        public SignatureResponse UpdateSignature(int id, SignatureRequest newSignature)
        {
            var signature = _signatureHandler.GetById(id);
            var reqSignature = SignatureToDbItem(newSignature);
            signature.User = reqSignature.User;
            signature.UserId = reqSignature.UserId;
            signature.CertificatePassword = reqSignature.CertificatePassword;
            signature.CertificatePath = reqSignature.CertificatePath;
            signature.ImagePath = reqSignature.ImagePath;
            signature.ExpirationDate = reqSignature.ExpirationDate;
            signature.ContactInfo = reqSignature.ContactInfo;
            signature.Reason = reqSignature.Reason;
            signature.isInitial = reqSignature.isInitial;
            signature.Location = reqSignature.Location;
            _signatureHandler.Update(signature);
            _signatureHandler.SaveChanges();
            var resp = SignatureToListItem(signature); 
            return resp;
        }
        public SignatureResponseList SignatureToListResponse(IEnumerable<SignatureEntity> me)
        {
            var resp = new SignatureResponseList
            {
                TotalResults = me.Count(),
                SignaturesList = new List<SignatureResponse>()
            };
            foreach(SignatureEntity sign in me)
            {
                var item = SignatureToListItem(sign);
                resp.SignaturesList.Add(item);
            }
            return resp;
        }
        public SignatureResponse SignatureToListItem(SignatureEntity me)
        {
            return new SignatureResponse()
            {
                Id = me.Id,
                UserId = me.UserId,
                CertificatePassword = me.CertificatePassword,
                CertificatePath = me.CertificatePath,
                ImagePath = me.ImagePath,
                ExpirationDate = me.ExpirationDate,
                ContactInfo = me.ContactInfo,
                Reason = me.Reason,
                IsInitial = me.isInitial,
                Location = me.Location
            };
        }
        public SignatureEntity SignatureToDbItem(SignatureRequest me, SignatureEntity updating = null)
        {
            if (updating == null)
            {
                updating = new SignatureEntity();
            }
            updating.Id = me.Id;
            updating.User = _userHandler.GetById(me.UserId);
            updating.UserId = me.UserId;
            updating.CertificatePassword = me.CertificatePassword;
            updating.CertificatePath = me.CertificatePath;
            updating.ImagePath = me.ImagePath;
            updating.ExpirationDate = me.ExpirationDate;
            updating.ContactInfo = me.ContactInfo;
            updating.Reason = me.Reason;
            updating.isInitial = me.IsInitial;
            updating.Location = me.Location;
            return updating;
        }

    }
}
