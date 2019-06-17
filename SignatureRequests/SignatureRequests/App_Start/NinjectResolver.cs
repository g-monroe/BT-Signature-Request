using Ninject;
using Ninject.Extensions.ChildKernel;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Managers;
using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;

namespace SignatureRequests.App_Start
{
    public class NinjectResolver : IDependencyResolver
    {
        private IKernel kernel;

        public NinjectResolver() : this(new StandardKernel())
        {

        }
        public NinjectResolver(IKernel ninjectKernel, bool scope = false)
        {
            kernel = ninjectKernel;
            if (!scope)
            {
                AddBindings(kernel);
            }
        }
        private void AddBindings(IKernel kernel)
        {
            // singleton and transient bindings go here
        }
        private IKernel AddRequestBindings(IKernel kernel)
        {
            var context = new SignatureRequestsContext();

            kernel.Bind<IUserHandler>().To<UserHandler>().WithConstructorArgument("context", context);
            kernel.Bind<IUserManager>().To<UserManager>().InSingletonScope();
            kernel.Bind<ISignatureLibManager>().To<SignatureLibManager>().InSingletonScope();
            kernel.Bind<IFormManager>().To<FormManager>().InSingletonScope();
            kernel.Bind<IFormHandler>().To<FormHandler>().WithConstructorArgument("context", context);
            kernel.Bind<ISignatureManager>().To<SignatureManager>().InSingletonScope();
            kernel.Bind<ISignatureHandler>().To<SignatureHandler>().InSingletonScope();

            return kernel;
        }

        public IDependencyScope BeginScope()
        {
            return new NinjectResolver(AddRequestBindings(new ChildKernel(kernel)), true);
        }

        public void Dispose()
        {
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

    }
}