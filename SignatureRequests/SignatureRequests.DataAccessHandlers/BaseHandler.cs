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

        public IQueryable<T> AsQueryable()
        {
            var result = _dbSet.AsQueryable();
            return result;
        }

        public bool Contains(T entity)
        {
            return _dbSet.Contains(entity);
        }

        public long Count()
        {
            return _dbSet.Count();
        }

        public long Count(Expression<Func<T, bool>> where)
        {
            var result = _dbSet.Count(where);
            return result;
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public  T First(Expression<Func<T, bool>> where)
        {
            return  _dbSet.First(where);
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>> where)
        {
            return _dbSet.Where(where).ToList();
        }
        public IEnumerable<T> GetSelectIncludes(Expression<Func<T, bool>> where, string col)
        {
            return _dbSet.Where(where).Include(col).ToList();
        }
        public IEnumerable<T> GetIncludes(string col) 
        {
            return _dbSet.Include(col).ToList();
        }
        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {
            return _dbSet.First(e => e.Id == id);
        }

        public IEnumerable<T> GetByIds(IEnumerable<int> ids)
        {
            return _dbSet.Where(e => ids.Contains(e.Id)).ToList();
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

        public T Update(T entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            return entity;
        }

        public void SaveChanges()
        {
           _context.SaveChanges();
        }
    }
}
