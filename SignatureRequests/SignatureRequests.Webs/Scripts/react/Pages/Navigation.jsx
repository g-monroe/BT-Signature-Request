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
var antd_1 = require("antd");
var routes = require("./Routing/routes");
var react_router_dom_1 = require("react-router-dom");
var UserTypes_1 = require("../Util/Enums/UserTypes");
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
            case UserTypes_1["default"].UNKNOWN:
                currRoutes = routes.LoggedOut;
                userHome = routes.COMMON._Login;
                break;
            case UserTypes_1["default"].SENDER:
                currRoutes = routes.Request;
                userHome = routes.REQUESTER._Dashboard;
                break;
            case UserTypes_1["default"].SIGNER:
                currRoutes = routes.Response;
                userHome = routes.SIGNER._Dashboard;
                break;
        }
        return (<div className="navigation">
                <antd_1.Menu className="navigation__menu" theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
                    {currRoutes.map(function (e) { return e.hasNavBar ?
            <antd_1.Menu.Item key={e.path} className="menuItem" style={(location.pathname === e.path) ? { backgroundColor: "#1890ff" } : { backgroundColor: "inherit" }}>
                            <react_router_dom_1.NavLink to={e.link}>
                             {e.breadcrumbName}
                            </react_router_dom_1.NavLink>
                        </antd_1.Menu.Item>
            : <div></div>; })}

                </antd_1.Menu>
                <react_router_dom_1.NavLink to={userHome.link}> <div id="logo"/></react_router_dom_1.NavLink>
            </div>);
    };
    return Navigation;
}(React.Component));
exports["default"] = react_router_dom_1.withRouter(Navigation);
