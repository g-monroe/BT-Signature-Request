"use strict";
exports.__esModule = true;
var Pages = require("../../Pages");
var UserTypes_1 = require("../../Util/Enums/UserTypes");
//===================Common Routes===================
exports.COMMON = {
    "_Login": {
        path: "/login",
        link: "/login",
        breadcrumbName: "Login",
        component: Pages.Login,
        hasNavBar: true,
        condition: function (User) { return true; }
    },
    "_Error": {
        path: "/error",
        link: "/error",
        breadcrumbName: "Error",
        component: Pages.Error,
        hasNavBar: false,
        condition: function (User) { return true; }
    }
};
//===================Requester Routes================
exports.REQUESTER = {
    "_Dashboard": {
        path: "/request/dashboard",
        link: "/request/dashboard",
        breadcrumbName: "Dashboard",
        component: Pages.DashBoard,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SENDER); }
    },
    "_Create": {
        path: "/request/create",
        link: "/request/create",
        breadcrumbName: "Create",
        component: Pages.Create,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SENDER); }
    },
    "_Send": {
        path: "/request/send",
        link: "/request/send",
        breadcrumbName: "Send",
        component: Pages.Send,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SENDER); }
    },
    "_View": {
        path: "/request/view",
        link: "/request/view",
        breadcrumbName: "View",
        component: Pages.View,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SENDER); }
    }
};
//===================Signer Routes===================
exports.SIGNER = {
    "_Dashboard": {
        path: "/response/dashboard",
        link: "/response/dashboard",
        breadcrumbName: "Dashboard",
        component: Pages.SignerDashboard,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SIGNER); }
    },
    "_AddSignature": {
        path: "/response/add",
        link: "/response/add",
        breadcrumbName: "Add",
        component: Pages.AddSignatures,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SIGNER); }
    },
    "_SignDocument": {
        path: "/response/sign",
        link: "/response/sign",
        breadcrumbName: "Sign",
        component: Pages.SignDocument,
        hasNavBar: true,
        condition: function (User) { return !!User && !!(User === UserTypes_1["default"].SIGNER); }
    }
};
exports.LoggedOut = [exports.COMMON._Login, exports.COMMON._Error];
exports.Request = [exports.REQUESTER._Create, exports.REQUESTER._Dashboard, exports.REQUESTER._Send, exports.REQUESTER._View];
exports.Response = [exports.SIGNER._AddSignature, exports.SIGNER._Dashboard, exports.SIGNER._SignDocument];
exports.All = [exports.REQUESTER._Create, exports.REQUESTER._Dashboard, exports.REQUESTER._Send, exports.REQUESTER._View,
    exports.SIGNER._AddSignature, exports.SIGNER._Dashboard, exports.SIGNER._SignDocument, exports.COMMON._Login, exports.COMMON._Error];
