using Ninject;
using Ninject.Extensions.ChildKernel;
using SignatureRequests.Core.Interfaces.DataAccessHandlers;
using SignatureRequests.Core.Interfaces.Engines;
using SignatureRequests.Core.Interfaces.Managers;
using SignatureRequests.DataAccessHandlers;
using SignatureRequests.DataAccessHandlers.Infrastructure;
using SignatureRequests.Engines;
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
            kernel.Bind<IUserEngine>().To<UserEngine>().InSingletonScope();
            kernel.Bind<ISignatureLibManager>().To<SignatureLibManager>().InSingletonScope();
            kernel.Bind<ISignatureManager>().To<SignatureManager>().InSingletonScope();
            kernel.Bind<ISignatureEngine>().To<SignatureEngine>().InSingletonScope();
            kernel.Bind<ISignatureHandler>().To<SignatureHandler>().WithConstructorArgument("context", context);
            kernel.Bind<IFormManager>().To<FormManager>().InSingletonScope();
            kernel.Bind<IFormHandler>().To<FormHandler>().WithConstructorArgument("context", context);
            kernel.Bind<IRequestManager>().To<RequestManager>().InSingletonScope();
            kernel.Bind<IRequestHandler>().To<RequestHandler>().WithConstructorArgument("context", context);
            kernel.Bind<IGroupManager>().To<GroupManager>().InSingletonScope();
            kernel.Bind<IGroupEngine>().To<GroupEngine>().InSingletonScope();
            kernel.Bind<IGroupHandler>().To<GroupHandler>().WithConstructorArgument("context", context);
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