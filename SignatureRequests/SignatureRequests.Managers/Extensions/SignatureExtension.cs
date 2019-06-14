using BTSuggestions.Core.Entities;
using SignatureRequests.Core.Entities;
using SignatureRequests.Managers.RequestObjects;
using SignatureRequests.Managers.ResponseObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SignatureRequests.Managers.Extensions
{
    public static class SignatureExtension
    {
        public static SignatureResponseList SignatureToListResponse(this IEnumerable<SignatureEntity> me)
        {
            var resp = new SignatureResponseList
            {
                TotalResults = me.Count(),
                SignaturesList= me.Select(x => x.SignatureToListItem()).ToList()
            };
            return resp;
        }
        public static SignatureResponse SignatureToListItem(this SignatureEntity me)
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
        public static SignatureEntity SignatureToDbItem(this SignatureRequest me, SignatureEntity updating = null)
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
