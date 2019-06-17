var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Util/Enums/UserTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var UserType;
    (function (UserType) {
        UserType[UserType["UNKNOWN"] = 0] = "UNKNOWN";
        UserType[UserType["SENDER"] = 1] = "SENDER";
        UserType[UserType["SIGNER"] = 2] = "SIGNER";
    })(UserType || (UserType = {}));
    exports["default"] = UserType;
});
define("Pages/login/Login", ["require", "exports", "react", "../../node_modules/antd/dist/antd", "Components/User/ChooseUser"], function (require, exports, React, antd_1, ChooseUser_1) {
    "use strict";
    exports.__esModule = true;
    var Login = /** @class */ (function (_super) {
        __extends(Login, _super);
        function Login() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        Login.prototype.render = function () {
            return (<div>
                <h1 id='HeaderText'>Choose User Type</h1>
                <antd_1.Layout>
                    <ChooseUser_1.default changeUser={this.props.userSelected}></ChooseUser_1.default>
   
                
                </antd_1.Layout>
            </div>);
        };
        return Login;
    }(React.Component));
    exports["default"] = Login;
});
define("Pages/Requester/Create/Create", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var Create = /** @class */ (function (_super) {
        __extends(Create, _super);
        function Create() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        Create.prototype.render = function () {
            return (<h1 id='HeaderText'>Create a Form</h1>);
        };
        return Create;
    }(React.Component));
    exports["default"] = Create;
});
define("Pages/Requester/Dashboard/Dashboard", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var Dashboard = /** @class */ (function (_super) {
        __extends(Dashboard, _super);
        function Dashboard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        Dashboard.prototype.render = function () {
            return (<h1 id='HeaderText'>View DashBoard here</h1>);
        };
        return Dashboard;
    }(React.Component));
    exports["default"] = Dashboard;
});
define("Pages/Requester/Send/Send", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var Send = /** @class */ (function (_super) {
        __extends(Send, _super);
        function Send() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        Send.prototype.render = function () {
            return (<h1 id='HeaderText'>Send a Form</h1>);
        };
        return Send;
    }(React.Component));
    exports["default"] = Send;
});
define("Pages/Requester/View/View", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var View = /** @class */ (function (_super) {
        __extends(View, _super);
        function View() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        View.prototype.render = function () {
            return (<h1 id='HeaderText'>View a Form</h1>);
        };
        return View;
    }(React.Component));
    exports["default"] = View;
});
define("Pages/Signer/AddSignatures/AddSignatures", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var AddSignatues = /** @class */ (function (_super) {
        __extends(AddSignatues, _super);
        function AddSignatues() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        AddSignatues.prototype.render = function () {
            return (<h1 id='HeaderText'>Add signatures to your profile</h1>);
        };
        return AddSignatues;
    }(React.Component));
    exports["default"] = AddSignatues;
});
define("Pages/Signer/Dashboard/SignerDashboad", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var SignerDashboard = /** @class */ (function (_super) {
        __extends(SignerDashboard, _super);
        function SignerDashboard() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        SignerDashboard.prototype.render = function () {
            return (<h1 id='HeaderText'>Dashboard</h1>);
        };
        return SignerDashboard;
    }(React.Component));
    exports["default"] = SignerDashboard;
});
define("Pages/Signer/SignDocument/SignDocument", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var SignDocument = /** @class */ (function (_super) {
        __extends(SignDocument, _super);
        function SignDocument() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        SignDocument.prototype.render = function () {
            return (<h1 id='HeaderText'>Sign the Document here</h1>);
        };
        return SignDocument;
    }(React.Component));
    exports["default"] = SignDocument;
});
define("Pages/Error/Error", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    exports.__esModule = true;
    var Error = /** @class */ (function (_super) {
        __extends(Error, _super);
        function Error() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        Error.prototype.render = function () {
            return (<h3>You have found an issue</h3>);
        };
        return Error;
    }(React.Component));
    exports["default"] = Error;
});
define("Pages/index", ["require", "exports", "Pages/login/Login", "Pages/Requester/Create/Create", "Pages/Requester/Dashboard/Dashboard", "Pages/Requester/Send/Send", "Pages/Requester/View/View", "Pages/Signer/AddSignatures/AddSignatures", "Pages/Signer/Dashboard/SignerDashboad", "Pages/Signer/SignDocument/SignDocument", "Pages/Error/Error"], function (require, exports, Login_1, Create_1, Dashboard_1, Send_1, View_1, AddSignatures_1, SignerDashboad_1, SignDocument_1, Error_1) {
    "use strict";
    exports.__esModule = true;
    exports.Login = Login_1["default"];
    exports.Create = Create_1["default"];
    exports.DashBoard = Dashboard_1["default"];
    exports.Send = Send_1["default"];
    exports.View = View_1["default"];
    exports.AddSignatures = AddSignatures_1["default"];
    exports.SignerDashboard = SignerDashboad_1["default"];
    exports.SignDocument = SignDocument_1["default"];
    exports.Error = Error_1["default"];
});
define("Pages/Routing/routes", ["require", "exports", "Pages/index", "Util/Enums/UserTypes"], function (require, exports, Pages, UserTypes_1) {
    "use strict";
    exports.__esModule = true;
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
});
define("Components/User/ChooseUser", ["require", "exports", "react", "../../node_modules/antd/dist/antd", "Util/Enums/UserTypes", "Pages/Routing/routes", "../../node_modules/react-router-dom/index"], function (require, exports, React, antd_2, UserTypes_2, routes, index_1) {
    "use strict";
    exports.__esModule = true;
    var ChooseUser = /** @class */ (function (_super) {
        __extends(ChooseUser, _super);
        function ChooseUser() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.chooseUserType = function (newUser) {
                _this.props.changeUser(newUser);
            };
            return _this;
        }
        ChooseUser.prototype.render = function () {
            var _this = this;
            return (<div id='flex-container'>
                <antd_2.Card id='categoryBox' title='Requester'>
                    <p>Choose this option to view the app as a user able to send out documents</p>
                    <antd_2.Button id='Button' onClick={function () { return _this.chooseUserType(UserTypes_2["default"].SENDER); }}>
                        <index_1.Link to={routes.REQUESTER._Dashboard.link}> 
                            Select
                        </index_1.Link>
                    </antd_2.Button>
                </antd_2.Card>
                <antd_2.Card id='categoryBox' title='Signer'>
                    <p>Choose this option to view the app as a user able to receive/sign the documents</p>
                    <antd_2.Button id='Button' onClick={function () { return _this.chooseUserType(UserTypes_2["default"].SIGNER); }}>
                        <index_1.Link to={routes.SIGNER._Dashboard.link}> 
                            Select
                        </index_1.Link>
                    </antd_2.Button>
                </antd_2.Card>


            </div>);
        };
        return ChooseUser;
    }(React.Component));
    exports["default"] = ChooseUser;
});
define("Pages/Navigation", ["require", "exports", "react", "../node_modules/antd/dist/antd", "Pages/Routing/routes", "../node_modules/react-router-dom/index", "Util/Enums/UserTypes"], function (require, exports, React, antd_3, routes, index_2, UserTypes_3) {
    "use strict";
    exports.__esModule = true;
    var Navigation = /** @class */ (function (_super) {
        __extends(Navigation, _super);
        function Navigation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        Navigation.prototype.render = function () {
            var _a = this.props, location = _a.location, userType = _a.userType;
            var currRoutes = [];
            var userHome;
            switch (userType) {
                case UserTypes_3["default"].UNKNOWN:
                    currRoutes = routes.LoggedOut;
                    userHome = routes.COMMON._Login;
                    break;
                case UserTypes_3["default"].SENDER:
                    currRoutes = routes.Request;
                    userHome = routes.REQUESTER._Dashboard;
                    break;
                case UserTypes_3["default"].SIGNER:
                    currRoutes = routes.Response;
                    userHome = routes.SIGNER._Dashboard;
                    break;
            }
            return (<div className="navigation">
                <antd_3.Menu className="navigation__menu" theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                    {currRoutes.map(function (e) { return e.hasNavBar ?
                <antd_3.Menu.Item key={e.path} className="menuItem" style={(location.pathname === e.path) ? { backgroundColor: "#1890ff" } : { backgroundColor: "inherit" }}>
                            <index_2.NavLink to={e.link}>
                             {e.breadcrumbName}
                            </index_2.NavLink>
                        </antd_3.Menu.Item>
                : <div></div>; })}

                </antd_3.Menu>
                <index_2.NavLink to={userHome.link}> <div id="logo"/></index_2.NavLink>
            </div>);
        };
        return Navigation;
    }(React.Component));
    exports["default"] = index_2.withRouter(Navigation);
});
define("Pages/MainPage", ["require", "exports", "react", "../node_modules/react-router-dom/index", "../node_modules/antd/dist/antd", "Pages/Routing/routes", "Pages/Navigation", "Util/Enums/UserTypes", "Pages/login/Login"], function (require, exports, React, index_3, antd_4, routes, Navigation_1, UserTypes_4, Login_2) {
    "use strict";
    exports.__esModule = true;
    var ALL_ROUTES = routes.All;
    var MainPage = /** @class */ (function (_super) {
        __extends(MainPage, _super);
        function MainPage() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                user: UserTypes_4["default"].UNKNOWN
            };
            _this.changeUser = function (User) {
                _this.setState({
                    user: User
                });
            };
            return _this;
        }
        MainPage.prototype.render = function () {
            return (<index_3.BrowserRouter>
                <antd_4.Layout>
                    <antd_4.Layout.Header>
                        <Navigation_1.default userType={this.state.user}></Navigation_1.default>
                    </antd_4.Layout.Header>
                   <antd_4.Layout.Content>
                        {((this.state.user === UserTypes_4["default"].UNKNOWN) ?
                <Login_2.default userSelected={this.changeUser}></Login_2.default>
                :
                    <index_3.Switch>
                                {ALL_ROUTES.map(function (route, i) {
                        return (<index_3.Route key={i} path={route.path} exact breadcrumbName={route.breadcrumbName} component={route.component}/>);
                    })}
                                </index_3.Switch>)}
                   </antd_4.Layout.Content>
                </antd_4.Layout>
            </index_3.BrowserRouter>);
        };
        return MainPage;
    }(React.Component));
    exports["default"] = MainPage;
});
