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
var UserTypes_1 = require("../../Util/Enums/UserTypes");
var routes = require("../../Pages/Routing/routes");
var react_router_dom_1 = require("react-router-dom");
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
                <antd_1.Card id='categoryBox' title='Requester'>
                    <p>Choose this option to view the app as a user able to send out documents</p>
                    <antd_1.Button id='Button' onClick={function () { return _this.chooseUserType(UserTypes_1["default"].SENDER); }}>
                        <react_router_dom_1.Link to={routes.REQUESTER._Dashboard.link}> 
                            Select
                        </react_router_dom_1.Link>
                    </antd_1.Button>
                </antd_1.Card>
                <antd_1.Card id='categoryBox' title='Signer'>
                    <p>Choose this option to view the app as a user able to receive/sign the documents</p>
                    <antd_1.Button id='Button' onClick={function () { return _this.chooseUserType(UserTypes_1["default"].SIGNER); }}>
                        <react_router_dom_1.Link to={routes.SIGNER._Dashboard.link}> 
                            Select
                        </react_router_dom_1.Link>
                    </antd_1.Button>
                </antd_1.Card>


            </div>);
    };
    return ChooseUser;
}(React.Component));
exports["default"] = ChooseUser;
