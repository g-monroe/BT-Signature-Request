using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using SignatureRequests.Core.Entities;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Infrastructure;

namespace SignatureRequests.DataAccessHandlers
{
    public abstract class BaseHandler<T> : IBaseHandler<T> where T : class, IBaseEntity
    {
        protected readonly DbSet<T> _dbSet;
        protected readonly SignatureRequestsContext _context;

        public BaseHandler(SignatureRequestsContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<IQueryable<T>> AsQueryable()
        {
            var result = _dbSet.AsQueryable();
            return await Task.FromResult(result);
        }

        public async Task<bool> Contains(T entity)
        {
            return await _dbSet.ContainsAsync(entity);
        }

        public async Task<long> Count()
        {
            return await _dbSet.CountAsync();
        }

        public async Task<long> Count(Expression<Func<T, bool>> where)
        {
            var result = await _dbSet.CountAsync(where);
            return result;
        }

        public Task Delete(T entity)
        {
            _dbSet.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task<T> First(Expression<Func<T, bool>> where)
        {
            return await _dbSet.FirstAsync(where);
        }

        public async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> where)
        {
            return await _dbSet.Where(where).ToListAsync();
        }

        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public async Task<T> GetById(int id)
        {
            return await _dbSet.FirstAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<T>> GetByIds(IEnumerable<int> ids)
        {
            return await _dbSet.Where(e => ids.Contains(e.Id)).ToListAsync();
        }

        public T Insert(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public void InsertMany(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public Task<T> Update(T entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            return Task.FromResult(entity);
        }

        public async Task SaveChanges()
        {
           await _context.SaveChangesAsync();
        }
    }
}
