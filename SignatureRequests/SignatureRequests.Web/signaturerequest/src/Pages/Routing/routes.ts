import * as Pages from '../../Pages';
import UserType from '../../Util/Enums/UserTypes';


//===================Common Routes===================

export const COMMON = {
    "_Login":{
        path: "/login",
        link:() => "/login",
        breadcrumbName:"Login",
        component:Pages.Login,
        hasNavBar:true,
        condition:(User: UserType | null) => true
    },

    "_Error":{
        path: "/error",
        link:() => "/error",
        breadcrumbName:"Error",
        component:Pages.Error,
        hasNavBar:false,
        condition:(User: UserType | null) => true
    }
}

//===================Requester Routes================

export const REQUESTER = {
    "_Create":{
        path: "request/create",
        link:() => "request/create",
        breadcrumbName:"Create",
        component:Pages.Create,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SENDER)
    },

    "_Dashboard":{
        path: "request/dashboard",
        link:() => "request/dashboard",
        breadcrumbName:"Dashboard",
        component:Pages.DashBoard,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SENDER)
    },

    "_Send":{
        path: "request/send",
        link:() => "request/send",
        breadcrumbName:"Send",
        component:Pages.Send,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SENDER)
    },

    "_View":{
        path: "request/view",
        link:() => "request/view",
        breadcrumbName:"View",
        component:Pages.View,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SENDER)
    }
}

//===================Signer Routes===================

export const SIGNER = {
    "_AddSignature":{
        path: "response/add",
        link:() => "response/add",
        breadcrumbName:"Add",
        component:Pages.AddSignatures,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SIGNER)
    },
    "_Dashboard":{
        path: "response/dashboard",
        link:() => "response/dashboard",
        breadcrumbName:"Dashboard",
        component:Pages.SignerDashboard,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SIGNER)
    },
    "_SignDocument":{
        path: "response/sign",
        link:() => "response/sign",
        breadcrumbName:"Sign",
        component:Pages.SignDocument,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.SIGNER)
    },
}

export const LoggedOut = [COMMON._Login,COMMON._Error]
export const Request = [REQUESTER._Create,REQUESTER._Dashboard,REQUESTER._Send,REQUESTER._View]
export const Response = [SIGNER._AddSignature,SIGNER._Dashboard,SIGNER._SignDocument]
export const All = [REQUESTER._Create,REQUESTER._Dashboard,REQUESTER._Send,REQUESTER._View,
    SIGNER._AddSignature,SIGNER._Dashboard,SIGNER._SignDocument,COMMON._Login,COMMON._Error]