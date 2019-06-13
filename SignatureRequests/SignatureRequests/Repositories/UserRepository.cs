using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics.CodeAnalysis;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Repositories;
using SignatureRequests.Core.Entities;
using SignatureRequests.Models;

namespace SignatureRequests.Repositories
{
    [ExcludeFromCodeCoverage]
    public class UserRepository : IUserRepository
    {
        private readonly SignatureRequestsContext _context;
        public UserRepository()
        {
            _context = new SignatureRequestsContext();
        }
        public bool Delete(int id)
        {
            using (var ctx = new SignatureRequestsContext())
            {
                UserEntity products = ctx.Users.Find(id);
                ctx.Users.Remove(products);
                int rowsAffected = ctx.SaveChanges();
                return rowsAffected > 0 ? true : false;
            }
        }
        public IList<UserJSON> GetUsers()
        {
            IQueryable<UserJSON> products = _context.Users.Select(
                    p => new UserJSON
                    {
                        Id = p.Id,
                        Name = p.Name
                    });
            return products.ToList();
        }
        public bool AddUser(UserJSON product)
        {
            if (product == null)
            {
                throw new ArgumentNullException("product");
            }

            UserJSON newProduct = new UserJSON();

            try
            {
                UserEntity user = new UserEntity
                {
                    Name = product.Name
                };
                _context.Users.Add(user);
                int rowsAffected = _context.SaveChanges();

                return rowsAffected > 0 ? true : false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool UpdateUser(UserJSON p)
        {
            if (p == null)
            {
                throw new ArgumentNullException("product");
            }

            using (var ctx = new SignatureRequestsContext())
            {
                var product = _context.Users.Single(a => a.Id == p.Id);

                if (product != null)
                {
                    product.Name = p.Name;

                    int rowsAffected = _context.SaveChanges();

                    return rowsAffected > 0 ? true : false;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}