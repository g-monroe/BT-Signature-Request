import * as Pages from '../../Pages/index';
import UserType from '../../Util/Enums/UserTypes';


export class RouteEntity {
    path: string;
    link: (id: number) => string;
    breadcrumbName:string;
    component:any;
    hasNavBar:boolean;
    hideNavBar?: boolean;
    condition:(User: UserType | null) => boolean;

    constructor(data: any){
        this.path = data.path;
        this.link =  data.link;
        this.breadcrumbName = data.breadcrumbName;
        this.component = data.component;
        this.hasNavBar = data.hasNavBar;
        this.hideNavBar =  data.hideNavBar;
        this.condition = data.condition;
    }
}


//===================Common Routes===================

export const COMMON = {
    "_Login" : new RouteEntity({
        path: "/",
        link:"/",
        breadcrumbName:"Login",
        component:Pages.Login,
        hasNavBar:true,
        condition:(User: UserType | null) => true
    }),
    "_Signup":new RouteEntity({
        path: "/signup",
        link:"/signup",
        breadcrumbName:"Signup",
        component:Pages.SignUp,
        hasNavBar:true,
        condition:(User: UserType | null) => true
    }),

    "_Error":new RouteEntity({
        path: "/error",
        link:"/error",
        breadcrumbName:"Error",
        component:Pages.Error,
        hasNavBar:false,
        condition:(User: UserType | null) => true
    })
}

//===================Requester Routes================

export const REQUESTER = {
    "_Dashboard":new RouteEntity({
        path: "/request/dashboard",
        link:"/request/dashboard",
        breadcrumbName:"Dashboard",
        component:Pages.DashBoard,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    }),
   
    "_Create":new RouteEntity({
        path: "/request/create",
        link: "/request/create",
        breadcrumbName:"Upload a PDF",
        component:Pages.Create,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    }),

    "_Edit":new RouteEntity({
        path: `/request/edit/:id`,
        link: (id: number) => `/request/edit/${id}`,
        breadcrumbName:"Edit a From",
        component:Pages.Edit,
        hasNavBar:false,
        hideNavBar: true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    }),

    "_Send":new RouteEntity({
        path: "/request/send",
        link:"/request/send",
        breadcrumbName:"Send Forms",
        component:Pages.Send,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    }),

    "_View":new RouteEntity({
        path: "/request/view",
        link:"/request/view",
        breadcrumbName:"View your Forms",
        component:Pages.View,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    })
}

//===================Signer Routes===================

export const SIGNER = {

    "_AddSignature":new RouteEntity({
        path: "/response/signatures",
        link:"/response/signatures",
        breadcrumbName:"View Signature",
        component:Pages.AddSignatures,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    }),

    "_SignDocument": new RouteEntity({
        path: `/response/sign/:requestid`,
        link:  (requestid: number) => `/response/sign/${requestid}`,
        breadcrumbName:"Sign Active Documents",
        component:Pages.SignDocument,
        hasNavBar:true,
        condition:(User: UserType | null) => !!User && !!(User === UserType.REGISTERED)
    })
}

export const LoggedOut = [COMMON._Login,COMMON._Signup,COMMON._Error]
export const Request = [REQUESTER._Create,REQUESTER._Dashboard,REQUESTER._Send,REQUESTER._View, REQUESTER._Edit]
export const Response = [SIGNER._AddSignature,SIGNER._SignDocument]
export const Registered = [REQUESTER._Dashboard,REQUESTER._Create,REQUESTER._View,REQUESTER._Send,SIGNER._AddSignature,SIGNER._SignDocument, REQUESTER._Edit]
export const All = [REQUESTER._Create,REQUESTER._Dashboard,REQUESTER._Send,REQUESTER._View,
    SIGNER._AddSignature,SIGNER._SignDocument,COMMON._Login,COMMON._Signup,COMMON._Error, REQUESTER._Edit]