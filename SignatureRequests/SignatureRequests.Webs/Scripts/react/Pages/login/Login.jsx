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
var ChooseUser_1 = require("../../Components/User/ChooseUser");
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
