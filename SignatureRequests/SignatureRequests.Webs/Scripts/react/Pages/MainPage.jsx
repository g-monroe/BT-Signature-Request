"use strict";
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
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var antd_1 = require("antd");
var routes = require("./Routing/routes");
var Navigation_1 = require("./Navigation");
var UserTypes_1 = require("../Util/Enums/UserTypes");
var Login_1 = require("./login/Login");
var ALL_ROUTES = routes.All;
var MainPage = /** @class */ (function (_super) {
    __extends(MainPage, _super);
    function MainPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            user: UserTypes_1["default"].UNKNOWN
        };
        _this.changeUser = function (User) {
            _this.setState({
                user: User
            });
        };
        return _this;
    }
    MainPage.prototype.render = function () {
        return (<react_router_dom_1.BrowserRouter>
                <antd_1.Layout>
                    <antd_1.Layout.Header>
                        <Navigation_1.default userType={this.state.user}></Navigation_1.default>
                    </antd_1.Layout.Header>
                   <antd_1.Layout.Content>
                        {((this.state.user === UserTypes_1["default"].UNKNOWN) ?
            <Login_1.default userSelected={this.changeUser}></Login_1.default>
            :
                <react_router_dom_1.Switch>
                                {ALL_ROUTES.map(function (route, i) {
                    return (<react_router_dom_1.Route key={i} path={route.path} exact breadcrumbName={route.breadcrumbName} component={route.component}/>);
                })}
                                </react_router_dom_1.Switch>)}
                   </antd_1.Layout.Content>
                </antd_1.Layout>
            </react_router_dom_1.BrowserRouter>);
    };
    return MainPage;
}(React.Component));
exports["default"] = MainPage;
