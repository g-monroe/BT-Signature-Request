using BTSuggestions.Core.Entities;
using SignatureRequests.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SignatureRequests.Core.Interfaces.DataAccessHandlers
{
    public interface IBaseHandler<T> where T : IBaseEntity
    {
        Task<IQueryable<T>> AsQueryable();
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> Get(Expression<Func<T, bool>> where);
        Task<T> GetById(int id);
        Task<IEnumerable<T>> GetByIds(IEnumerable<int> ids);
        Task<T> First(Expression<Func<T, bool>> where);
        Task<bool> Contains(T entity);
        Task<long> Count();
        Task<long> Count(Expression<Func<T, bool>> where);
        T Insert(T entity);
        void InsertMany(IEnumerable<T> entities);
        Task<T> Update(T entity);
        Task Delete(T entity);
        Task SaveChanges();
    }
}
