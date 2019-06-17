using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.Core.RequestObjects;
using SignatureRequests.Core.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Managers
{
    public class SignatureManager : ISignatureManager
    {
        private readonly ISignatureHandler _signatureHandler;
        public SignatureManager(ISignatureHandler signatureHandler)
        {
            _signatureHandler = signatureHandler;
        }
        public SignatureEntity CreateSignatureEntity(SignatureEntity newSignature)
        {
            _signatureHandler.Insert(newSignature);
            _signatureHandler.SaveChanges();
            return newSignature;
        }

        public void Delete(SignatureEntity signature)
        {
            _signatureHandler.Delete(signature);
        }

        public SignatureEntity GetSignature(int id)
        {
            var result = _signatureHandler.GetById(id);
            return result;
        }

        public IEnumerable<SignatureEntity> GetSignatures()
        {
            return _signatureHandler.GetAll();
        }
        public IEnumerable<SignatureEntity> GetAllInclude()
        {
            return _signatureHandler.GetAllInclude();
        }
        public SignatureEntity UpdateSignature(SignatureEntity signature, SignatureEntity newSignature)
        {
            signature.User = newSignature.User;
            signature.UserId = newSignature.UserId;
            signature.CertificatePassword = newSignature.CertificatePassword;
            signature.CertificatePath = newSignature.CertificatePath;
            signature.ImagePath = newSignature.ImagePath;
            signature.ExpirationDate = newSignature.ExpirationDate;
            signature.ContactInfo = newSignature.ContactInfo;
            signature.Reason = newSignature.Reason;
            signature.isInitial = newSignature.isInitial;
            signature.Location = newSignature.Location;
            _signatureHandler.Update(signature);
            return signature;
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
                User = me.User,
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
            updating.User = me.User;
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
