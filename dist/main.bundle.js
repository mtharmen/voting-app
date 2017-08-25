webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home_component__ = __webpack_require__("../../../../../src/app/pages/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_profile_profile_component__ = __webpack_require__("../../../../../src/app/pages/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_poll_poll_component__ = __webpack_require__("../../../../../src/app/pages/poll/poll.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_admin_admin_component__ = __webpack_require__("../../../../../src/app/pages/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_auth_guard__ = __webpack_require__("../../../../../src/app/core/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_admin_guard__ = __webpack_require__("../../../../../src/app/core/admin.guard.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__pages_home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'poll/:id',
        component: __WEBPACK_IMPORTED_MODULE_4__pages_poll_poll_component__["a" /* PollComponent */]
    },
    {
        path: 'profile',
        component: __WEBPACK_IMPORTED_MODULE_3__pages_profile_profile_component__["a" /* ProfileComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__core_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'admin',
        component: __WEBPACK_IMPORTED_MODULE_5__pages_admin_admin_component__["a" /* AdminComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_7__core_admin_guard__["a" /* AdminGuard */]]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__core_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_7__core_admin_guard__["a" /* AdminGuard */]
        ]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: "\n    <div id=\"wrapper\">\n      <app-header></app-header>\n      <br>\n      <div id=\"content\" class=\"container\">\n        <router-outlet></router-outlet>\n      </div>\n    </div>\n    <app-footer></app-footer>\n  ",
        styles: []
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_misc_confirm_service__ = __webpack_require__("../../../../../src/app/core/misc/confirm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_form_login_form_service__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_chart_service__ = __webpack_require__("../../../../../src/app/core/chart.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__core_search_filter_pipe__ = __webpack_require__("../../../../../src/app/core/search-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__header_header_component__ = __webpack_require__("../../../../../src/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__footer_footer_component__ = __webpack_require__("../../../../../src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__core_misc_loading_component__ = __webpack_require__("../../../../../src/app/core/misc/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home_component__ = __webpack_require__("../../../../../src/app/pages/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile_component__ = __webpack_require__("../../../../../src/app/pages/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_poll_poll_component__ = __webpack_require__("../../../../../src/app/pages/poll/poll.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_admin_admin_component__ = __webpack_require__("../../../../../src/app/pages/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_login_form_login_form_component__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_new_poll_new_poll_component__ = __webpack_require__("../../../../../src/app/pages/new-poll/new-poll.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_update_form_update_form_component__ = __webpack_require__("../../../../../src/app/pages/update-form/update-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__core_misc_confirm_component__ = __webpack_require__("../../../../../src/app/core/misc/confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_user_info_user_info_component__ = __webpack_require__("../../../../../src/app/pages/user-info/user-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_poll_grid_poll_grid_component__ = __webpack_require__("../../../../../src/app/pages/poll-grid/poll-grid.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_14__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_15__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_17__pages_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_18__pages_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_19__pages_poll_poll_component__["a" /* PollComponent */],
            __WEBPACK_IMPORTED_MODULE_20__pages_admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_16__core_misc_loading_component__["a" /* LoadingComponent */],
            __WEBPACK_IMPORTED_MODULE_21__pages_login_form_login_form_component__["a" /* LoginFormComponent */],
            __WEBPACK_IMPORTED_MODULE_22__pages_new_poll_new_poll_component__["a" /* NewPollComponent */],
            __WEBPACK_IMPORTED_MODULE_23__pages_update_form_update_form_component__["a" /* UpdateFormComponent */],
            __WEBPACK_IMPORTED_MODULE_24__core_misc_confirm_component__["a" /* ConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_25__pages_user_info_user_info_component__["a" /* UserInfoComponent */],
            __WEBPACK_IMPORTED_MODULE_26__pages_poll_grid_poll_grid_component__["a" /* PollGridComponent */],
            __WEBPACK_IMPORTED_MODULE_11__core_search_filter_pipe__["a" /* SearchFilterPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_12__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot()
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_7__core_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__core_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_9__pages_login_form_login_form_service__["a" /* LoginFormService */],
            __WEBPACK_IMPORTED_MODULE_8__core_misc_confirm_service__["a" /* ConfirmService */],
            __WEBPACK_IMPORTED_MODULE_10__core_chart_service__["a" /* ChartService */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_21__pages_login_form_login_form_component__["a" /* LoginFormComponent */],
            __WEBPACK_IMPORTED_MODULE_24__core_misc_confirm_component__["a" /* ConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_22__pages_new_poll_new_poll_component__["a" /* NewPollComponent */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/admin.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminGuard = (function () {
    function AdminGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        if (this.auth.isAdmin && this.auth.validToken) {
            return true;
        }
        return false;
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AdminGuard);

var _a, _b;
//# sourceMappingURL=admin.guard.js.map

/***/ }),

/***/ "../../../../../src/app/core/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__("../../../../../src/app/core/config.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApiService = (function () {
    function ApiService(http, router) {
        this.http = http;
        this.router = router;
    }
    Object.defineProperty(ApiService.prototype, "authHeader", {
        get: function () {
            return "Bearer " + (localStorage.getItem('access_token') || '');
        },
        enumerable: true,
        configurable: true
    });
    ApiService.prototype.handleError = function (err) {
        var errorMsg = err.error ? err.error.message : 'Unabled to complete request';
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(errorMsg);
    };
    ApiService.prototype.setError = function (error) {
        console.error(error);
        window.location.href = __WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + '/error';
    };
    ApiService.prototype.getAllPolls$ = function (id) {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + ("/api/get-all-polls/" + (id || '')))
            .catch(this.handleError);
    };
    ApiService.prototype.getPoll$ = function (id) {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + '/api/get-poll/' + id)
            .catch(this.handleError);
    };
    ApiService.prototype.updateInfo$ = function (info, field) {
        return this.http
            .put(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + ("/api/update/" + field), info, {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpHeaders */]().set('Authorization', this.authHeader)
        })
            .catch(this.handleError);
    };
    ApiService.prototype.makeNewPoll$ = function (poll) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + '/api/make-poll', poll, {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpHeaders */]().set('Authorization', this.authHeader)
        })
            .catch(this.handleError);
    };
    ApiService.prototype.voteOnPoll$ = function (id, index) {
        return this.http
            .put(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + '/api/poll-vote/' + id, { index: index })
            .catch(this.handleError);
    };
    ApiService.prototype.addOption$ = function (id, newOption) {
        return this.http
            .put(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + '/api/poll-add-option/' + id, { newOption: newOption }, {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpHeaders */]().set('Authorization', this.authHeader)
        })
            .catch(this.handleError);
    };
    ApiService.prototype.deletePoll$ = function (id) {
        return this.http
            .delete(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* base_url */] + '/api/delete-poll/' + id, {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpHeaders */]().set('Authorization', this.authHeader)
        })
            .catch(this.handleError);
    };
    return ApiService;
}());
ApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], ApiService);

var _a, _b;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(auth) {
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.auth.validToken) {
            return true;
        }
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], AuthGuard);

var _a;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/core/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__("../../../../../src/app/core/config.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Used https://auth0.com/blog/real-world-angular-series-part-1/ as a reference








var AuthService = (function () {
    function AuthService(router, route, location, http) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.location = location;
        this.http = http;
        this.loggedIn$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](this.loggedIn);
        var previous = localStorage.getItem('previousPath'); // || '/'
        localStorage.removeItem('previousPath');
        if (previous !== null && this.location.path() !== '/error') {
            this.postTwitterLogin$()
                .subscribe(function (res) {
                _this.loading = false;
                _this.storeUserInfo(res);
                _this.router.navigateByUrl(previous);
            }, function (err) {
                _this.loading = false;
                // this.setError(err)
            });
        }
        else {
            if (this.validToken) {
                this.setLoggedIn(true);
            }
            else {
                this.removeUserInfo();
                // this.router.navigateByUrl('/')
            }
        }
    }
    Object.defineProperty(AuthService.prototype, "authHeader", {
        get: function () {
            return "Bearer " + (localStorage.getItem('access_token') || '');
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.handleError = function (err) {
        var errorMsg = err.error ? err.error.message : 'Unabled to complete request';
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw(errorMsg);
    };
    AuthService.prototype.setError = function (error) {
        console.error(error);
        window.location.href = __WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/error';
    };
    AuthService.prototype.twitterLogin = function () {
        this.setCurrentPath();
        // TODO: Is there a way to do this with angular?
        window.location.href = __WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/twitter';
    };
    AuthService.prototype.postTwitterLogin$ = function () {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/get-user', { withCredentials: true })
            .catch(this.handleError);
    };
    AuthService.prototype.twitterConnect = function (id) {
        this.setCurrentPath();
        // TODO: Is there a way to do this with angular?
        window.location.href = __WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/twitter/' + id;
    };
    AuthService.prototype.twitterDisconnect$ = function () {
        return this.http
            .get(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/disconnect-twitter', {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpHeaders */]().set('Authorization', this.authHeader)
        })
            .catch(this.handleError);
    };
    AuthService.prototype.localSignUp$ = function (signUpInfo) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/local/signup', signUpInfo)
            .catch(this.handleError);
    };
    AuthService.prototype.localLogin$ = function (loginInfo) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/local/login', loginInfo)
            .catch(this.handleError);
    };
    AuthService.prototype.localConnect$ = function (signUpInfo) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/connect-local', signUpInfo, {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpHeaders */]().set('Authorization', this.authHeader)
        })
            .catch(this.handleError);
    };
    AuthService.prototype.existingCheck$ = function (field) {
        return this.http
            .post(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* base_url */] + '/auth/local/existingCheck', { field: field })
            .catch(this.handleError);
    };
    AuthService.prototype.logout = function () {
        this.removeUserInfo();
        this.router.navigateByUrl('/');
    };
    AuthService.prototype.storeUserInfo = function (user) {
        localStorage.setItem('access_token', user.token);
        localStorage.setItem('exp', JSON.stringify(user.exp * 1000));
        localStorage.setItem('_id', user._id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('role', user.role);
        var twitter = JSON.parse(user.twitter);
        localStorage.setItem('twitter_id', twitter.id || '');
        var profile = JSON.parse(user.profile);
        localStorage.setItem('firstname', profile.firstname || '');
        localStorage.setItem('lastname', profile.lastname || '');
        this.setLoggedIn(true);
    };
    AuthService.prototype.redirectTo = function (redirect) {
        var redirectTo = redirect ? redirect : '/';
        if (redirectTo.indexOf('http:') > -1) {
            window.location.href = redirectTo;
        }
        this.router.navigateByUrl(redirectTo);
    };
    AuthService.prototype.setLoggedIn = function (value) {
        this.loggedIn$.next(value);
        this.loggedIn = value;
    };
    AuthService.prototype.removeUserInfo = function (redirect) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('exp');
        localStorage.removeItem('_id');
        localStorage.removeItem('username');
        // this.username = undefined
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('twitter_id');
        // this.isAdmin = undefined
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        this.setLoggedIn(false);
    };
    AuthService.prototype.setCurrentPath = function () {
        var previousPath = this.location.path();
        localStorage.setItem('previousPath', previousPath);
    };
    Object.defineProperty(AuthService.prototype, "validToken", {
        get: function () {
            var expiration = JSON.parse(localStorage.getItem('exp'));
            return Date.now() < expiration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isAdmin", {
        // TODO: Just assign to a variable instead?
        get: function () {
            return localStorage.getItem('role') === 'admin';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "user_id", {
        get: function () {
            return localStorage.getItem('_id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "username", {
        get: function () {
            return localStorage.getItem('username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "email", {
        get: function () {
            return localStorage.getItem('email');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "fullname", {
        get: function () {
            return [localStorage.getItem('firstname'), localStorage.getItem('lastname')];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "twitter_id", {
        get: function () {
            return localStorage.getItem('twitter_id');
        },
        enumerable: true,
        configurable: true
    });
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* Location */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpClient */]) === "function" && _d || Object])
], AuthService);

var _a, _b, _c, _d;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/chart.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js__ = __webpack_require__("../../../../chart.js/src/chart.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chart_js__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChartService = (function () {
    function ChartService() {
        // http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
        this.colours = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a'];
        this.max = 10;
        this.min = 1;
        this.type = 'horizontalBar';
    }
    ChartService.prototype.getRemainingColours = function (chart) {
        var currentColours = chart.data.datasets[0].backgroundColor;
        return this.colours.filter(function (colour) {
            return currentColours.indexOf(colour) < 0;
        });
    };
    ChartService.prototype.setMinMax = function (min, max) {
        if (min > max || max < 1 || min < 1) {
            return;
        }
        this.min = min;
        this.max = max;
    };
    ChartService.prototype.setType = function (type) {
        this.type = type;
    };
    ChartService.prototype.makeChart = function (ctx, data, labels) {
        var config = {
            type: this.type,
            data: {
                datasets: [{
                        data: data,
                        backgroundColor: this.colours.slice(0, data.length)
                    }],
                labels: labels
            }
        };
        config.options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }]
            },
            legend: {
                display: false
            }
        };
        return new __WEBPACK_IMPORTED_MODULE_1_chart_js___default.a(ctx, config);
    };
    ChartService.prototype.getColours = function () {
        return this.colours;
    };
    ChartService.prototype.increment = function (chart, i) {
        chart.data.datasets[0].data[i]++;
        chart.update();
    };
    ChartService.prototype.decrement = function (chart, i) {
        chart.data.datasets[0].data[i] += chart.data.datasets[0].data[i] ? -1 : 0;
        chart.update();
    };
    ChartService.prototype.addOption = function (chart, option, votes) {
        if (chart.data.labels.length >= this.max) {
            return;
        }
        chart.data.labels.push(option);
        chart.data.datasets[0].data.push(votes || 0);
        var n = chart.data.datasets[0].data.length;
        // chart.data.datasets[0].backgroundColor = this.colours.slice(0, n)
        var availableColours = this.getRemainingColours(chart);
        chart.data.datasets[0].backgroundColor.push(availableColours[0]);
        chart.update();
    };
    ChartService.prototype.removeOption = function (chart, i) {
        if (chart.data.labels.length < this.min) {
            return;
        }
        chart.data.labels.splice(i, 1);
        chart.data.datasets[0].data.splice(i, 1);
        var n = chart.data.datasets[0].data.length;
        // chart.data.datasets[0].backgroundColor = this.colours.slice(0, n)
        chart.data.datasets[0].backgroundColor.splice(i, 1);
        chart.update();
    };
    return ChartService;
}());
ChartService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ChartService);

//# sourceMappingURL=chart.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return base_url; });
var base_url = 'http://localhost:8080';
//# sourceMappingURL=config.js.map

/***/ }),

/***/ "../../../../../src/app/core/misc/confirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirm_service__ = __webpack_require__("../../../../../src/app/core/misc/confirm.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfirmComponent = (function () {
    function ConfirmComponent(cf, activeModal) {
        this.cf = cf;
        this.activeModal = activeModal;
        this.confirmObj = {
            prompt: '',
            name: '',
            input: ''
        };
    }
    ConfirmComponent.prototype.ngOnInit = function () {
        this.confirmObj.prompt = this.cf.prompt;
        this.confirmObj.name = this.cf.confirmName;
    };
    ConfirmComponent.prototype.setDisable = function () {
        return this.confirmObj.name && this.confirmObj.name !== this.confirmObj.input;
    };
    ConfirmComponent.prototype.confirm = function () {
        if (this.confirmObj.name) {
            if (this.confirmObj.name !== this.confirmObj.input) {
                this.error = 'Does not match';
                this.confirmObj.input = '';
                return;
            }
        }
        this.cf.settings('', '');
        this.activeModal.close('Confirm');
    };
    ConfirmComponent.prototype.cancel = function () {
        this.activeModal.dismiss('Cancel');
    };
    return ConfirmComponent;
}());
ConfirmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-confirm',
        template: "\n    <div class=\"modal-body text-center\">\n      <h3>{{confirmObj.prompt}}</h3>\n      <div *ngIf=\"confirmObj.name\">\n        <br>\n        <input  type=\"text\" class=\"form-control\" [(ngModel)]=\"confirmObj.input\" name=\"name\">\n      </div>\n      <br>\n      <button class=\"btn btn-success\" (click)=\"confirm()\" [disabled]=\"setDisable()\">Confirm</button>\n      <button class=\"btn btn-danger\" (click)=\"cancel()\">Cancel</button>\n    </div>\n  ",
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__confirm_service__["a" /* ConfirmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__confirm_service__["a" /* ConfirmService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _b || Object])
], ConfirmComponent);

var _a, _b;
//# sourceMappingURL=confirm.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/misc/confirm.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConfirmService = (function () {
    function ConfirmService() {
    }
    ConfirmService.prototype.settings = function (prompt, confirmName) {
        this.prompt = prompt;
        this.confirmName = confirmName;
    };
    return ConfirmService;
}());
ConfirmService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ConfirmService);

//# sourceMappingURL=confirm.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/misc/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    return LoadingComponent;
}());
LoadingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-loading',
        template: "\n      <img src=\"/assets/loading.svg\">\n  ",
        styles: ["\n  img {\n    margin: -20px auto;\n    width: 50px;\n  }\n  "]
    })
], LoadingComponent);

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "../../../../../src/app/core/models/signup.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpModel; });
var SignUpModel = (function () {
    function SignUpModel(email, password, username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
    return SignUpModel;
}());

//# sourceMappingURL=signup.model.js.map

/***/ }),

/***/ "../../../../../src/app/core/search-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchFilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchFilterPipe = (function () {
    function SearchFilterPipe() {
    }
    SearchFilterPipe.prototype.transform = function (polls, filter) {
        return polls.filter(function (poll) { return poll.title.toLowerCase().indexOf(filter) > -1; });
    };
    return SearchFilterPipe;
}());
SearchFilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'searchFilter' })
], SearchFilterPipe);

//# sourceMappingURL=search-filter.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/core/validators/custom-pattern.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = customPatternValidator;
function customPatternValidator(pattern, label) {
    return function (control) {
        var error = {};
        error[label] = { value: control.value };
        return pattern.test(control.value) && control.value ? error : null;
    };
}
//# sourceMappingURL=custom-pattern.directive.js.map

/***/ }),

/***/ "../../../../../src/app/core/validators/custom-regexp.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomRegExp; });
// from http://emailregex.com/
var email = /^(?!.*^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var username = /[^a-zA-Z0-9]/;
var CustomRegExp = {
    email: email,
    username: username
};
//# sourceMappingURL=custom-regexp.js.map

/***/ }),

/***/ "../../../../../src/app/core/validators/dupe-check.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DupeCheckValidator; });
var DupeCheckValidator = (function () {
    function DupeCheckValidator() {
    }
    DupeCheckValidator.dupeCheck = function (control) {
        // NOTE: why does this fire three times per input on load?
        var value = control.value;
        var optionsGroup = control.parent;
        // To prevent calling .value on null since it fires on instantiation when optionsGroup has no parent
        if (optionsGroup && value) {
            var options = optionsGroup.value;
            var dupes = options.filter(function (elm) { return elm === value; });
            return dupes.length > 1 && !control.errors ? { dupeCheck: true } : null;
        }
        return null;
    };
    return DupeCheckValidator;
}());

//# sourceMappingURL=dupe-check.validator.js.map

/***/ }),

/***/ "../../../../../src/app/core/validators/password-match.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidator; });
var PasswordValidator = (function () {
    function PasswordValidator() {
    }
    PasswordValidator.notMatch = function (control) {
        var password2 = control.value;
        var parent = control.parent;
        // NOTE: Validators are triggered when , so when parent doesn't exist?
        if (parent) {
            var password = parent.get('password').value;
            if (password2 !== password) {
                return password2 ? { notMatch: true } : null;
            }
        }
        return null;
    };
    return PasswordValidator;
}());

//# sourceMappingURL=password-match.validator.js.map

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-footer',
        template: "\n  <footer class=\"footer text-center\">\n    <div class=\"container\">\n      <p><small>\n        <a href=\"https://www.freecodecamp.com/challenges/build-a-voting-app\" target=\"_blank\">FCC Voting App</a> | \n        <a href=\"https://github.com/mtharmen/voting-app\" target=\"_blank\">GitHub Repo <i class=\"fa fa-github\" aria-hidden=\"true\"></i></a> | \n        <a href=\"http://fontawesome.io/\" target=\"_blank\">Font Awesome <i class=\"fa fa-font-awesome\" aria-hidden=\"true\"></i></a> | \n        <a href=\"http://www.chartjs.org/\" target=\"_blank\">Charts from Chartjs</a>\n      </small></p>\n    </div>\n  </footer>\n  ",
        styles: []
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <nav class=\"navbar navbar-expand-lg navbar-light bg-light justify-content-end\">\r\n    <div class=\"container\">\r\n      <a class=\"navbar-brand\" routerLink=\"/\">Voting App</a>\r\n      <button class=\"navbar-toggler\" type=\"button\" (click)=\"isCollapsed = !isCollapsed\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n        <span class=\"navbar-toggler-icon\"></span>\r\n      </button>\r\n      <div class=\"collapse navbar-collapse\" id=\"navbarNav\" [ngbCollapse]=\"isCollapsed\">\r\n        <app-loading *ngIf=\"this.auth.loading\"></app-loading>\r\n        <div class=\"navbar-nav ml-auto\" *ngIf=\"!this.auth.loading\">\r\n          <a class=\"nav-item nav-link\" *ngIf=\"auth.isAdmin\" routerLink=\"/admin\">Admin</a>\r\n          <a class=\"nav-item nav-link\" *ngIf=\"auth.loggedIn\" routerLink=\"/profile\">Profile</a>\r\n          <a class=\"nav-item nav-link\" *ngIf=\"auth.loggedIn\" (click)=\"newPoll()\">New Poll</a>\r\n          <a class=\"nav-item nav-link\" *ngIf=\"!auth.loggedIn\" (click)=\"login()\">\r\n            <i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i> Login\r\n          </a>\r\n          <a class=\"nav-item nav-link\" *ngIf=\"auth.loggedIn\" (click)=\"logout()\">\r\n            <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> Logout\r\n          </a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n</header>"

/***/ }),

/***/ "../../../../../src/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_form_login_form_service__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_form_login_form_component__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_new_poll_new_poll_component__ = __webpack_require__("../../../../../src/app/pages/new-poll/new-poll.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HeaderComponent = (function () {
    function HeaderComponent(auth, modalService, lf) {
        this.auth = auth;
        this.modalService = modalService;
        this.lf = lf;
        this.isCollapsed = true;
        this.modalOptions = { backdrop: 'static', keyboard: false };
    }
    HeaderComponent.prototype.login = function () {
        this.lf.setConnectStatus(false);
        var loginModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__pages_login_form_login_form_component__["a" /* LoginFormComponent */], this.modalOptions);
        // loginModal.result.then(result => {
        //   if (result === 'Login Complete') {
        //     console.log('logged in')
        //   }
        // }, reason => {
        //   console.log(reason)
        // })
    };
    HeaderComponent.prototype.newPoll = function () {
        var _this = this;
        var newPollModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_5__pages_new_poll_new_poll_component__["a" /* NewPollComponent */], this.modalOptions);
        newPollModal.result.then(function (id) {
            _this.auth.redirectTo('/poll/' + id);
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.auth.logout();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-header',
        template: __webpack_require__("../../../../../src/app/header/header.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__pages_login_form_login_form_service__["a" /* LoginFormService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__pages_login_form_login_form_service__["a" /* LoginFormService */]) === "function" && _c || Object])
], HeaderComponent);

var _a, _b, _c;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Admin Page</h1>\r\n\r\n<p>Admin Stuff</p>"

/***/ }),

/***/ "../../../../../src/app/pages/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminComponent = (function () {
    function AdminComponent() {
    }
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-admin',
        template: __webpack_require__("../../../../../src/app/pages/admin/admin.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [])
], AdminComponent);

//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"loading\"></app-loading>\n<div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n<app-poll-grid *ngIf=\"!loading && !error\" [polls]=\"polls\"></app-poll-grid>"

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import Chart from 'chart.js'
var HomeComponent = (function () {
    function HomeComponent(api) {
        this.api = api;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.allPollsSub = this.api.getAllPolls$()
            .subscribe(function (res) {
            _this.loading = false;
            _this.polls = res;
        }, function (err) {
            _this.loading = false;
            _this.error = err;
            _this.api.setError(err);
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/pages/home/home.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_api_service__["a" /* ApiService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/login-form/login-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <ul class=\"nav nav-pills nav-fill\">\n    <li class=\"nav-item fake-pointer\" (click)=\"switch(false)\">\n      <a class=\"nav-link\" [ngClass]=\"!signup ? 'active' : ''\">\n        {{ lf.connect ? 'Existing Account' : 'Login' }}\n      </a>\n    </li>\n    <li class=\"nav-item fake-pointer\" (click)=\"switch(true)\">\n      <a class=\"nav-link\" [ngClass]=\"signup ? 'active' : ''\">\n        {{lf.connect ? 'New Account' : 'Sign Up'}}\n      </a>\n    </li>\n  </ul>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n    <!-- Email -->\n    <div class=\"form-group\">\n      <label for=\"email\">Email</label>\n      <input id=\"email\" type=\"text\" class=\"form-control\" formControlName=\"email\">\n      <div *ngIf=\"!formErrors.email.valid && (formErrors.email.dirty || formErrors.email.touched)\" class=\"small text-danger\">\n        <div *ngIf=\"formErrors.email.errors.required\">\n          Email is required.\n        </div>\n        <div *ngIf=\"formErrors.email.errors.invalidEmail\">\n          Invalid Format.\n        </div>\n      </div>\n    </div>\n\n    <!-- Username -->\n    <div class=\"form-group\" *ngIf=\"signup\">\n      <label for=\"username\">Username</label>\n      <input id=\"username\" type=\"text\" class=\"form-control\" formControlName=\"username\">\n      <div *ngIf=\"showErrors('username')\" class=\"small text-danger\">\n        <div *ngIf=\"formErrors.username.errors.required\">\n          Username is required.\n        </div>\n        <div *ngIf=\"formErrors.username.errors.minlength\">\n          Username must be at least 4 characters long.\n        </div>\n        <div *ngIf=\"formErrors.username.errors.maxlength\">\n          Username must be less than 24 characters long.\n        </div>\n        <div *ngIf=\"formErrors.username.errors.invalidChar\">\n          Alphanumeric characters only.\n        </div>\n      </div>\n    </div>\n\n    <!-- Password -->\n    <div class=\"form-group\">\n      <label for=\"password\">Password</label>\n      <input id=\"password\" type=\"password\" class=\"form-control\" formControlName=\"password\">\n      <div *ngIf=\"!formErrors.password.valid && (formErrors.password.dirty || formErrors.password.touched)\" class=\"small text-danger\">\n        <div *ngIf=\"formErrors.password.errors.required\">\n          Password is required.\n        </div>\n        <div *ngIf=\"formErrors.password.errors.minlength\">\n          Password must be at least 5 characters long.\n        </div>\n      </div>\n    </div>\n\n    <!-- Password Confirm -->\n    <div class=\"form-group\" *ngIf=\"signup\">\n      <label for=\"password2\">Confirm Password</label>\n      <input id=\"password2\" type=\"password\" class=\"form-control\" formControlName=\"password2\">\n      <div *ngIf=\"!formErrors.password2.valid && (formErrors.password2.dirty || formErrors.password2.touched)\" class=\"small text-danger\">\n        <div *ngIf=\"formErrors.password2.errors.required\">\n          Please confirm your password\n        </div>\n        <div *ngIf=\"formErrors.password2.errors.notMatch\">\n          Passwords do not match\n        </div>\n      </div>\n    </div>\n\n    <!-- Submit -->\n    <div class=\"form-group\">\n      <div *ngIf=\"error\" class=\"alert alert-danger\">\n        <strong>Error:</strong> {{error}}\n      </div>\n      <button type=\"submit\" class=\"btn btn-info btn-block\" [disabled]=\"!loginForm.valid || submitting\">\n        <span *ngIf=\"!submitting\">{{lf.connect ? 'Connect' : buttonText }}</span>\n        <app-loading *ngIf=\"submitting\"></app-loading>\n      </button>\n    </div>\n  </form>\n  <span *ngIf=\"!signup && !lf.connect\">\n    <hr>\n    <button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"twitterLogin()\" [disabled]=\"submitting\">\n      <i class=\"fa fa-twitter\" aria-hidden=\"true\"></i> {{ lf.connect ? 'Connect ' : 'Login With '}} Twitter\n    </button>\n  </span>\n  \n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/login-form/login-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_form_service__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_models_signup_model__ = __webpack_require__("../../../../../src/app/core/models/signup.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_validators_password_match_validator__ = __webpack_require__("../../../../../src/app/core/validators/password-match.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_validators_custom_pattern_directive__ = __webpack_require__("../../../../../src/app/core/validators/custom-pattern.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_validators_custom_regexp__ = __webpack_require__("../../../../../src/app/core/validators/custom-regexp.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// TODO: refactor to move modal elements into its own service
var LoginFormComponent = (function () {
    function LoginFormComponent(fb, auth, lf, router, activeModal) {
        this.fb = fb;
        this.auth = auth;
        this.lf = lf;
        this.router = router;
        this.activeModal = activeModal;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginFormComponent.prototype.buildForm = function () {
        var _this = this;
        this.loginForm = this.fb.group({
            email: ['', [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__core_validators_custom_pattern_directive__["a" /* customPatternValidator */])(__WEBPACK_IMPORTED_MODULE_9__core_validators_custom_regexp__["a" /* CustomRegExp */].email, 'invalidEmail')
                ]],
            password: ['', [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(5)
                ]]
        });
        if (this.signup) {
            this.loginForm.addControl('username', this.fb.control('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(4),
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(24),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__core_validators_custom_pattern_directive__["a" /* customPatternValidator */])(__WEBPACK_IMPORTED_MODULE_9__core_validators_custom_regexp__["a" /* CustomRegExp */].username, 'invalidChar')
            ]));
            this.loginForm.addControl('password2', this.fb.control('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_7__core_validators_password_match_validator__["a" /* PasswordValidator */].notMatch
            ]));
            // Force validate password2 when password changes
            this.passwordChangeSub = this.loginForm.get('password')
                .valueChanges
                .subscribe(function (value) { return _this.loginForm.get('password2').updateValueAndValidity(); });
        }
        this.formErrors = this.loginForm.controls;
    };
    LoginFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitting = true;
        this.error = null;
        var email = this.loginForm.get('email').value;
        var username = this.signup ? this.loginForm.get('username').value : undefined;
        var password = this.loginForm.get('password').value;
        this.userInfo = new __WEBPACK_IMPORTED_MODULE_6__core_models_signup_model__["a" /* SignUpModel */](email, password, username);
        var logSign;
        if (this.lf.connect) {
            logSign = 'localConnect$';
        }
        else {
            logSign = this.signup ? 'localSignUp$' : 'localLogin$';
        }
        this.submitLoginSub = this.auth[logSign](this.userInfo)
            .subscribe(function (res) {
            _this.submitting = false;
            _this.auth.storeUserInfo(res);
            _this.activeModal.close('Login Complete');
        }, function (err) {
            _this.error = err,
                _this.submitting = false;
        });
    };
    LoginFormComponent.prototype.twitterLogin = function () {
        var loginType = this.lf.connect ? 'twitterConnect$' : 'twitterLogin';
        this.auth[loginType]();
    };
    LoginFormComponent.prototype.switch = function (val) {
        if (this.signup !== val) {
            this.signup = val;
            this.error = null;
            if (this.passwordChangeSub) {
                this.passwordChangeSub.unsubscribe();
            }
            // NOTE: Could add/remove inputs instead of rebuilding for each time
            //       But need to remove values anyway
            this.buildForm();
        }
    };
    LoginFormComponent.prototype.showErrors = function (field) {
        return !this.formErrors[field].valid && (this.formErrors[field].dirty || this.formErrors[field].touched);
    };
    LoginFormComponent.prototype.close = function () {
        if (!this.submitting) {
            this.activeModal.dismiss('Cross click');
        }
    };
    Object.defineProperty(LoginFormComponent.prototype, "buttonText", {
        get: function () {
            return this.signup ? 'Sign Up' : 'Login';
        },
        enumerable: true,
        configurable: true
    });
    LoginFormComponent.prototype.ngOnDestroy = function () {
        if (this.submitLoginSub) {
            this.submitLoginSub.unsubscribe();
        }
        if (this.passwordChangeSub) {
            this.passwordChangeSub.unsubscribe();
        }
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-login-form',
        template: __webpack_require__("../../../../../src/app/pages/login-form/login-form.component.html"),
        styles: ["\n    .fake-pointer {\n        cursor: pointer;\n        user-select: none;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__login_form_service__["a" /* LoginFormService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__login_form_service__["a" /* LoginFormService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _e || Object])
], LoginFormComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/login-form/login-form.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginFormService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginFormService = (function () {
    function LoginFormService() {
    }
    LoginFormService.prototype.setConnectStatus = function (val) {
        this.connect = val;
    };
    return LoginFormService;
}());
LoginFormService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], LoginFormService);

//# sourceMappingURL=login-form.service.js.map

/***/ }),

/***/ "../../../../../src/app/pages/new-poll/new-poll.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h3>Make A New Poll</h3>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"close()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form [formGroup]=\"newForm\" (ngSubmit)=\"onSubmit()\">\n    <!-- Title -->\n    <div class=\"form-group\">\n      <label for=\"title\">Title</label>\n      <input id=\"title\" type=\"text\" class=\"form-control\" formControlName=\"title\">\n      <div *ngIf=\"!formErrors.title.valid && (formErrors.title.dirty || formErrors.title.touched)\" class=\"small text-danger\">\n        <div *ngIf=\"formErrors.title.errors.required\">\n          Title is required.\n        </div>\n        <div *ngIf=\"formErrors.title.errors.minlength\">\n          Title must be at least 4 characters long.\n        </div>\n        <div *ngIf=\"formErrors.title.errors.maxlength\">\n          Title must be less than 24 characters long.\n        </div>\n      </div>\n    </div>\n\n    <div formArrayName=\"options\">\n      <div class=\"form-group\" *ngFor=\"let option of options.controls; let i = index\">\n        <label for=\"option\">Option {{i+1}}</label>\n        <div class=\"input-group\">\n          <input type=\"text\" id=\"option{{i+1}}\" class=\"form-control\" formControlName=\"{{i}}\" required>\n          <span class=\"input-group-btn\" *ngIf=\"i> 1\">\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeOption(i)\">&times;</button>\n          </span>\n        </div>\n        <div *ngIf=\"!option.valid && (option.dirty || option.touched)\" class=\"small text-danger\">\n          <div *ngIf=\"option.errors?.minlength\">\n            Must be at least 2 characters\n          </div>\n          <div *ngIf=\"option.errors?.maxlength\">\n            Must be less than 12 characters\n          </div>\n          <div *ngIf=\"option.errors?.dupeCheck\">\n            Duplicate\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <br>\n    <!-- Submit -->\n    <div class=\"form-group\">\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"addOption()\" [disabled]=\"!options.valid || options.value.length > 9\">+</button>\n      <button type=\"submit \" class=\"btn btn-primary \" (click)=\"onSubmit()\" [disabled]=\"!newForm.valid || submitting\">\n        <span *ngIf=\"!submitting\">Make New Poll</span>\n        <app-loading *ngIf=\"submitting\"></app-loading>\n      </button>\n      <p *ngIf=\"error \" class=\"mt-3 alert alert-danger \">\n        <strong>Error:</strong> {{error}}\n      </p>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/new-poll/new-poll.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_validators_dupe_check_validator__ = __webpack_require__("../../../../../src/app/core/validators/dupe-check.validator.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewPollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewPollComponent = (function () {
    function NewPollComponent(fb, api, activeModal) {
        this.fb = fb;
        this.api = api;
        this.activeModal = activeModal;
    }
    NewPollComponent.prototype.ngOnInit = function () {
        var _this = this;
        // NOTE: maybe give the first two options the Validator.required rule
        var validators = [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(2),
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(12),
            __WEBPACK_IMPORTED_MODULE_4__core_validators_dupe_check_validator__["a" /* DupeCheckValidator */].dupeCheck
        ];
        var options = this.fb.array([
            ['', validators],
            ['', validators]
        ]);
        this.newForm = this.fb.group({
            title: ['', [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(4),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(24)
                ]],
            options: options
        });
        this.formErrors = this.newForm.controls;
        // Subscribing to options to manually force update all fields for dupe check
        this.optionsChangeSub = this.options
            .valueChanges
            .debounceTime(100)
            .subscribe(function (data) { return _this.onChange(); });
    };
    NewPollComponent.prototype.onChange = function () {
        var _this = this;
        // NOTE: Currently validates the changed value twice,
        //       but dupeCheck needs the current set of all values anyway
        var values = this.options.value;
        values.forEach(function (elm, i) {
            var stri = '' + i;
            // don't emitEvent since .valueChanges will refire
            _this.options.get(stri).updateValueAndValidity({ emitEvent: false });
        });
        // Manually check if there are two non-empty entries
        // const nonEmpty = values.filter(elm => elm)
        // this.minRequired = nonEmpty.length > 1 // ? '' : 'Need a minimum of two options'
    };
    Object.defineProperty(NewPollComponent.prototype, "options", {
        get: function () {
            return this.newForm.get('options');
        },
        enumerable: true,
        configurable: true
    });
    NewPollComponent.prototype.addOption = function () {
        var newOption = this.fb.control('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(12), __WEBPACK_IMPORTED_MODULE_4__core_validators_dupe_check_validator__["a" /* DupeCheckValidator */].dupeCheck]);
        this.options.push(newOption);
    };
    NewPollComponent.prototype.removeOption = function (index) {
        this.options.removeAt(index);
    };
    NewPollComponent.prototype.onSubmit = function () {
        var _this = this;
        this.error = '';
        this.submitting = true;
        var newPoll = this.newForm.value;
        this.newPollSub = this.api
            .makeNewPoll$(newPoll)
            .subscribe(function (res) {
            _this.submitting = false;
            _this.activeModal.close(res.id);
        }, function (err) {
            _this.submitting = false;
            _this.error = err;
            if (err === 'Poll With Same Title Already Exists') {
                _this.newForm.get('title').reset();
            }
        });
    };
    NewPollComponent.prototype.close = function () {
        if (!this.submitting) {
            this.activeModal.dismiss();
        }
    };
    NewPollComponent.prototype.ngOnDestroy = function () {
        this.optionsChangeSub.unsubscribe();
        if (this.newPollSub) {
            this.newPollSub.unsubscribe();
        }
    };
    return NewPollComponent;
}());
NewPollComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-new-poll',
        template: __webpack_require__("../../../../../src/app/pages/new-poll/new-poll.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _c || Object])
], NewPollComponent);

var _a, _b, _c;
//# sourceMappingURL=new-poll.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/poll-grid/poll-grid.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\">\n  <input class=\"form-control col-8 justify-content-center\" name=\"search\" type=\"text\" placeholder=\"Search polls...\" [(ngModel)]=\"input.search\" #search=\"ngModel\" />\n</div>\n<br>\n<div class=\"row justify-content-center\">\n  <div class=\"col-10 col-lg-4\" *ngFor=\"let poll of polls | searchFilter:input.search\">\n    <a routerLink=\"/poll/{{poll?._id}}\">\n        <div class=\"card\">\n          <h2 class=\"card-body text-center\">{{poll?.title}}</h2>\n        </div>\n    </a>\n  </div>\n</div>\n<div *ngIf=\"!(polls | searchFilter:input.search).length\">\n  <h4 class=\"text-center\">No Polls Found</h4>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/poll-grid/poll-grid.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollGridComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PollGridComponent = (function () {
    function PollGridComponent(auth) {
        this.auth = auth;
        this.input = { search: '' };
    }
    return PollGridComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])('polls'),
    __metadata("design:type", Array)
], PollGridComponent.prototype, "polls", void 0);
PollGridComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-poll-grid',
        template: __webpack_require__("../../../../../src/app/pages/poll-grid/poll-grid.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], PollGridComponent);

var _a;
//# sourceMappingURL=poll-grid.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#chart-container {\r\n  position: relative;\r\n  width: 570;\r\n  padding-top: 22px;\r\n}\r\n\r\n#vote-buttons {\r\n  margin-top: 30px;\r\n}\r\n\r\n#confirm-add-choice {\r\n  width: 38px;\r\n}\r\n\r\n/*https://stackoverflow.com/questions/30106614/font-awesome-how-to-remove-the-space-around-a-circled-number*/\r\n.mock-radio {\r\n  display: inline-block;\r\n  /* color: #007BFF; */\r\n  font-size: 1.8em;\r\n  line-height: 1.2em;\r\n  width: 38px;\r\n  border: 2px solid;\r\n  /* border-color: #007BFF; */\r\n  border-radius: 15%;\r\n  text-align: center;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n.hide {\r\n  opacity: 0;\r\n}\r\n\r\n.show {\r\n  opacity: 1\r\n}\r\n\r\n.btn {\r\n  cursor: pointer;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading *ngIf=\"loading && !error\"></app-loading>\r\n<h1 *ngIf=\"error\">{{error}}</h1>\r\n<ng-template ngIf=\"!loading && !error\">\r\n  <h1>\r\n    {{ poll?.title }}\r\n    <button class=\"btn btn-danger\" id=\"delete\" (click)=\"deletePoll()\" *ngIf=\"auth.username == poll?.owner || auth.isAdmin\">\r\n      <i class=\"fa fa-trash fa-lg\" aria-hidden=\"true\"></i>\r\n    </button>\r\n  </h1>\r\n  <h4 class=\"text-muted\">By: {{ poll?.owner }}</h4>\r\n  <div class=\"row\">\r\n    <!-- Chart -->\r\n    <div class=\"col-lg-6 text-center\">\r\n      <button [hidden]=\"!auth.loggedIn || voted || show\" class=\"btn btn-primary\" (click)=\"makeChart()\">Show Poll</button>\r\n      <div id=\"chart-container\">\r\n        <canvas #chart></canvas>\r\n      </div>\r\n    </div>\r\n    \r\n    <!-- Choice Card -->\r\n    <div *ngIf=\"!voted\" class=\"col-lg-6 card\">\r\n      <div class=\"card-body\">\r\n        <div class=\"row\">\r\n          <ng-container *ngFor=\"let choice of poll?.labels; let i = index\">\r\n            <div class=\"col-10 mt-3\">\r\n              <button class=\"btn btn-primary btn-block\" (click)=\"choose(choice)\" [disabled]=\"edit\">\r\n                {{ choice }}\r\n              </button>\r\n            </div>\r\n            <div class=\"col-2 mt-3 pl-0\">\r\n              <span *ngIf=\"!edit\" class=\"mock-radio text-center\" (click)=\"choose(choice)\"><span class=\"hide\" [ngClass]=\"{'show': pick === choice}\">&#10003;</span></span>\r\n              <!-- <i class=\"fa fa-square-o fa-3x mock-radio\" aria-hidden=\"true\" *ngIf=\"pick !== choice && !edit\"></i>\r\n              <i class=\"fa fa-check-square-o fa-3x mock-radio\" aria-hidden=\"true\" *ngIf=\"pick === choice && !edit\"></i> -->\r\n            </div>\r\n          </ng-container>\r\n          <ng-container *ngIf=\"edit\">\r\n            <div class=\"col-10 mt-3\">\r\n              <input class=\"form-control text-center\" name=\"input\" type=\"text\" [(ngModel)]=\"newChoice.newLabel\" #newLabel=\"ngModel\" minlength=\"2\" maxlength=\"15\" (keyup)=\"dupeCheck()\" required/>\r\n            </div>\r\n            <div class=\"col-2 mt-3 pl-0\">\r\n              <button id=\"confirm-add-choice\" class=\"btn btn-success\" (click)=\"addData()\" [disabled]=\"!newLabel.valid || duplicate\">&#10003;</button>\r\n            </div>\r\n            <small *ngIf=\"newLabel.errors?.minlength\" class=\"col text-danger\">Must be at leat 2 characters long</small>\r\n            <small *ngIf=\"duplicate\" class=\"col text-danger\">That choice already exists</small>\r\n        </ng-container>\r\n          <div class=\"col-12\">\r\n            <div id=\"vote-buttons\" class=\"row\">\r\n              <button *ngIf=\"auth.loggedIn && !edit\" class=\"btn btn-primary col-auto mr-auto\" (click)=\"addNewChoice()\">Add Choice</button>\r\n              <button *ngIf=\"edit\" class=\"btn btn-danger col-auto mr-auto\" (click)=\"cancel()\">Cancel</button>\r\n              <button class=\"btn btn-success col-auto\" (click)=\"vote()\" [disabled]=\"edit || !pick || voted\">Vote {{pick ? 'for ' + pick : ''}}</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Post Vote Card -->\r\n    <div *ngIf=\"voted\" class=\"col-lg-6 card\">\r\n      <div class=\"card-body text-center\">\r\n        <h4>You voted for {{pick}}!</h4>\r\n        <h3>Thanks for voting</h3>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/pages/poll/poll.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_chart_service__ = __webpack_require__("../../../../../src/app/core/chart.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_misc_confirm_service__ = __webpack_require__("../../../../../src/app/core/misc/confirm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_misc_confirm_component__ = __webpack_require__("../../../../../src/app/core/misc/confirm.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PollComponent = (function () {
    function PollComponent(api, auth, cs, route, modalService, confirm) {
        this.api = api;
        this.auth = auth;
        this.cs = cs;
        this.route = route;
        this.modalService = modalService;
        this.confirm = confirm;
        this.newChoice = { newLabel: '' };
        this.modalOptions = { backdrop: 'static', keyboard: false };
    }
    PollComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.routeSub = this.route.paramMap
            .subscribe(function (params) {
            _this.getPoll(params.get('id'));
        });
    };
    PollComponent.prototype.getPoll = function (id) {
        var _this = this;
        this.loading = true;
        this.pollSub = this.api
            .getPoll$(id)
            .subscribe(function (res) {
            _this.poll = res;
            // this.makeChart()
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
            if (err === 'No Poll Found' || err.indexOf('Cast to ObjectId') > -1) {
                _this.error = 'No Poll Found';
            }
            else {
                _this.api.setError(err);
            }
        });
    };
    PollComponent.prototype.makeChart = function () {
        var height = 64 + this.poll.data.length * 53;
        this.chartRef.nativeElement.parentElement.style.height = height + 'px';
        this.show = true;
        var ctx = this.chartRef.nativeElement.getContext('2d');
        this.chart = this.cs.makeChart(ctx, this.poll.data, this.poll.labels);
    };
    PollComponent.prototype.choose = function (choice) {
        this.pick = choice;
    };
    PollComponent.prototype.addNewChoice = function () {
        this.edit = true;
        this.pick = '';
    };
    PollComponent.prototype.dupeCheck = function () {
        this.duplicate = false;
        if (this.poll.labels.indexOf(this.newChoice.newLabel) > -1) {
            this.duplicate = true;
        }
    };
    PollComponent.prototype.cancel = function () {
        this.edit = false;
        this.newChoice.newLabel = '';
    };
    PollComponent.prototype.addData = function () {
        var _this = this;
        this.edit = false;
        this.loading = true;
        this.error = '';
        var newOption = this.newChoice.newLabel;
        this.newChoice.newLabel = '';
        this.addOptionSub = this.api
            .addOption$(this.poll._id, newOption)
            .subscribe(function (res) {
            _this.loading = false;
            _this.pick = newOption;
            if (_this.show) {
                _this.cs.addOption(_this.chart, newOption);
            }
            else {
                _this.poll.labels.push(newOption);
                _this.poll.data.push(0);
            }
        }, function (err) {
            _this.loading = false;
            _this.error = err;
            console.error(err);
        });
    };
    PollComponent.prototype.deletePoll = function () {
        var _this = this;
        this.confirm.settings('Enter the name of this poll below to delete it', this.poll.title);
        var modal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_7__core_misc_confirm_component__["a" /* ConfirmComponent */]);
        modal.result.then(function (result) {
            _this.deleteSub = _this.api
                .deletePoll$(_this.poll._id)
                .subscribe(function (res) {
                _this.auth.redirectTo('/profile');
            }, function (err) {
                console.error(err);
            });
        });
    };
    PollComponent.prototype.vote = function () {
        var _this = this;
        this.error = '';
        this.loading = true;
        var i = this.poll.labels.indexOf(this.pick);
        this.voteSub = this.api
            .voteOnPoll$(this.poll._id, i)
            .subscribe(function (res) {
            _this.loading = false;
            _this.voted = true;
            if (_this.show) {
                _this.cs.increment(_this.chart, i);
            }
            else {
                _this.poll.data[i]++;
                _this.makeChart();
            }
        }, function (err) {
            _this.loading = false;
            console.error(err);
            _this.error = err;
        });
    };
    PollComponent.prototype.ngOnDestroy = function () {
        this.pollSub.unsubscribe();
        this.routeSub.unsubscribe();
        if (this.deleteSub) {
            this.deleteSub.unsubscribe();
        }
        if (this.voteSub) {
            this.voteSub.unsubscribe();
        }
    };
    return PollComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewChild */])('chart'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], PollComponent.prototype, "chartRef", void 0);
PollComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-poll',
        template: __webpack_require__("../../../../../src/app/pages/poll/poll.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/poll/poll.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_chart_service__["a" /* ChartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_chart_service__["a" /* ChartService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__core_misc_confirm_service__["a" /* ConfirmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_misc_confirm_service__["a" /* ConfirmService */]) === "function" && _g || Object])
], PollComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=poll.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"nav nav-pills card-header-pills nav-fill\">\r\n  <li class=\"nav-item fake-pointer\" (click)=\"switch('my-stuff')\">\r\n    <p class=\"nav-link\" [ngClass]=\"current === 'my-stuff' ? 'active' : ''\">My Stuff</p>\r\n  </li>\r\n  <li class=\"nav-item fake-pointer\" (click)=\"switch('info')\">\r\n    <p class=\"nav-link fake-pointer\" [ngClass]=\"current === 'info' ? 'active' : ''\">My Info</p>\r\n  </li>\r\n  <li class=\"nav-item fake-pointer\" (click)=\"switch('update-info')\">\r\n    <p class=\"nav-link\" [ngClass]=\"current === 'update-info' ? 'active' : ''\">Update Info</p>\r\n  </li>\r\n</ul>\r\n\r\n<div *ngIf=\"current === 'my-stuff'\">\r\n  <app-loading *ngIf=\"loading\"></app-loading>\r\n  <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\r\n  <app-poll-grid *ngIf=\"!loading && !error\" [polls]=\"polls\"></app-poll-grid>\r\n</div>\r\n<div *ngIf=\"current === 'info'\">\r\n  <app-user-info></app-user-info>\r\n</div>\r\n<div *ngIf=\"current === 'update-info'\">\r\n  <app-update-form></app-update-form>\t\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/pages/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(api, auth) {
        this.api = api;
        this.auth = auth;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.current = localStorage.getItem('previous_tab') || 'my-stuff';
        localStorage.removeItem('previous_tab');
        this.loading = true;
        this.allPollsSub = this.api.getAllPolls$(this.auth.user_id)
            .subscribe(function (res) {
            _this.loading = false;
            _this.polls = res;
        }, function (err) {
            _this.loading = false;
            _this.error = err;
            console.log(err);
        });
    };
    ProfileComponent.prototype.switch = function (val) {
        this.current = val;
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-profile',
        template: __webpack_require__("../../../../../src/app/pages/profile/profile.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], ProfileComponent);

var _a, _b;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/update-form/update-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\">\n  <div class=\"col-8\">\n    <div class=\"card\">\n      <div class=\"card-header\">\n          <ul class=\"nav nav-pills nav-fill\">\n            <li class=\"nav-item fake-pointer\" (click)=\"switch('Name')\">\n              <p class=\"nav-link\" [ngClass]=\"current === 'Name' ? 'active' : ''\">Name</p>\n            </li>\n            <li class=\"nav-item fake-pointer\" (click)=\"switch('Email')\">\n              <p class=\"nav-link fake-pointer\" [ngClass]=\"current === 'Email' ? 'active' : ''\">Email</p>\n            </li>\n            <li class=\"nav-item fake-pointer\" (click)=\"switch('Password')\">\n              <p class=\"nav-link\" [ngClass]=\"current === 'Password' ? 'active' : ''\">Password</p>\n            </li>\n          </ul>\n      </div>\n      <div class=\"card-body\">\n        <form id=\"updateForm\" [formGroup]=\"updateForm\" (ngSubmit)=\"onSubmit()\">\n          <!-- Current Password -->\n          <div class=\"form-group\">\n            <label for=\"currentPassword\">Current Password</label>\n            <input id=\"currentPassword\" type=\"password\" class=\"form-control\" formControlName=\"currentPassword\">\n            <div *ngIf=\"!formErrors.currentPassword.valid && (formErrors.currentPassword.dirty || formErrors.currentPassword.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.currentPassword.errors.required\">\n                Current password is required.\n              </div>\n            </div>\n          </div>\n\n          <!-- First Name -->\n          <div class=\"form-group\" *ngIf=\"current === 'Name'\">\n            <label for=\"firstname\">First Name</label>\n            <input id=\"firstname\" type=\"text\" class=\"form-control\" placeholder=\"{{defaultFirstName}}\" formControlName=\"firstname\">\n            <div *ngIf=\"!formErrors.firstname.valid && (formErrors.firstname.dirty || formErrors.firstname.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.firstname.errors.required\">\n                First Name is required.\n              </div>\n              <div *ngIf=\"formErrors.firstname.errors.minlength\">\n                First Name must be at least 2 characters long.\n              </div>\n              <div *ngIf=\"formErrors.firstname.errors.maxlength\">\n                First Name must be less than 50 characters long.\n              </div>\n              <div *ngIf=\"formErrors.firstname.errors.notNew\">\n                Matches current entry, please input a new one\n              </div>\n              <div *ngIf=\"formErrors.firstname.errors.nonLetter\">\n                Invalid Character Found.\n              </div>\n            </div>\n          </div>\n\n          <!-- Last Name -->\n          <div class=\"form-group\" *ngIf=\"current === 'Name'\">\n            <label for=\"lastname\">Last Name</label>\n            <input id=\"lastname\" type=\"lastname\" class=\"form-control\" placeholder=\"{{defaultLastName}}\" formControlName=\"lastname\">\n            <div *ngIf=\"!formErrors.lastname.valid && (formErrors.lastname.dirty || formErrors.lastname.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.lastname.errors.required\">\n                Last Name is required.\n              </div>\n              <div *ngIf=\"formErrors.lastname.errors.minlength\">\n                  Last Name must be at least 2 characters long.\n              </div>\n              <div *ngIf=\"formErrors.lastname.errors.maxlength\">\n                Last Name must be less than 50 characters long.\n              </div>\n              <div *ngIf=\"formErrors.lastname.errors.notNew\">\n                Matches current entry, please input a new one\n              </div>\n              <div *ngIf=\"formErrors.lastname.errors.nonLetter\">\n                Invalid Character Found.\n              </div>\n            </div>\n          </div>\n\n          <!-- Email -->\n          <div class=\"form-group\" *ngIf=\"current === 'Email'\">\n            <label for=\"email\">New Email</label>\n            <input id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"{{defaultEmail}}\" formControlName=\"email\">\n            <div *ngIf=\"!formErrors.email.valid && (formErrors.email.dirty || formErrors.email.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.email.errors.required\">\n                Email is required.\n              </div>\n              <div *ngIf=\"formErrors.email.errors.notNew\">\n                Matches current entry, please input a new one\n              </div>\n              <div *ngIf=\"formErrors.email.errors.invalidEmail\">\n                Invalid Format\n              </div>\n            </div>\n          </div>\n\n          <!-- Confirm Email -->\n          <!-- <div class=\"form-group\" *ngIf=\"current === 'Email'\">\n            <label for=\"email2\">Confirm New Email</label>\n            <input id=\"email2\" type=\"text\" class=\"form-control\" formControlName=\"email2\">\n            <div *ngIf=\"!formErrors.email2.valid && (formErrors.email2.dirty || formErrors.email2.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.email2.errors.required\">\n                Please confirm your Email\n              </div>\n              <div *ngIf=\"formErrors.email2.errors.notMatch\">\n                Does not match with new email\n              </div>\n            </div>\n          </div> -->\n\n          <!-- Password -->\n          <div class=\"form-group\" *ngIf=\"current === 'Password'\">\n            <label for=\"password\">New Password</label>\n            <input id=\"password\" type=\"password\" class=\"form-control\" formControlName=\"password\">\n            <div *ngIf=\"!formErrors.password.valid && (formErrors.password.dirty || formErrors.password.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.password.errors.required\">\n                New Password is required.\n              </div>\n              <div *ngIf=\"formErrors.password.errors.minlength\">\n                New Password must be at least 5 characters long.\n              </div>\n            </div>\n          </div>\n\n          <!-- Password Confirm -->\n          <div class=\"form-group\" *ngIf=\"current === 'Password'\">\n            <label for=\"password2\">Confirm New Password</label>\n            <input id=\"password2\" type=\"password\" class=\"form-control\" formControlName=\"password2\">\n            <div *ngIf=\"!formErrors.password2.valid && (formErrors.password2.dirty || formErrors.password2.touched)\" class=\"small text-danger\">\n              <div *ngIf=\"formErrors.password2.errors.required\">\n                Please confirm your new password.\n              </div>\n              <div *ngIf=\"formErrors.password2.errors.notMatch\">\n                Passwords do not match.\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"card-footer\">\n        <!-- Submit -->\n        <div class=\"form-group\">\n          <div *ngIf=\"error\" class=\"alert alert-danger text-center\">\n            <strong>Error:</strong> {{error}}\n          </div>\n          <div *ngIf=\"success\" class=\"alert alert-success text-center\">\n            <strong>{{current}} Updated</strong>\n          </div>\n          <button type=\"submit\" class=\"btn btn-primary btn-block\" form=\"updateForm\" [disabled]=\"!updateForm.valid || submitting\">\n            <span *ngIf=\"!submitting\">Update</span>\n            <app-loading *ngIf=\"submitting\"></app-loading>\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/update-form/update-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_api_service__ = __webpack_require__("../../../../../src/app/core/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_validators_password_match_validator__ = __webpack_require__("../../../../../src/app/core/validators/password-match.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_validators_custom_pattern_directive__ = __webpack_require__("../../../../../src/app/core/validators/custom-pattern.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_validators_custom_regexp__ = __webpack_require__("../../../../../src/app/core/validators/custom-regexp.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UpdateFormComponent = (function () {
    function UpdateFormComponent(fb, auth, api, router) {
        this.fb = fb;
        this.auth = auth;
        this.api = api;
        this.router = router;
        this.current = 'Name';
    }
    UpdateFormComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    UpdateFormComponent.prototype.buildForm = function () {
        var _this = this;
        this.updateForm = this.fb.group({
            currentPassword: ['', [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(5)
                ]]
        });
        if (this.current === 'Name') {
            this.addFullName(this.updateForm);
        }
        if (this.current === 'Email') {
            this.addEmail(this.updateForm);
        }
        if (this.current === 'Password') {
            this.addNewPassword(this.updateForm);
            // To force validate and make both password fields match
            this.passwordChangeSub = this.updateForm.get('password')
                .valueChanges
                .subscribe(function (value) { return _this.updateForm.get('password2').updateValueAndValidity(); });
        }
        this.formErrors = this.updateForm.controls;
    };
    // TODO: messy, figure out how to only check for one new value
    UpdateFormComponent.prototype.addFullName = function (form) {
        this.defaultFirstName = this.auth.fullname[0] || '';
        this.defaultLastName = this.auth.fullname[1] || '';
        var validators = [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(2),
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(50),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__core_validators_custom_pattern_directive__["a" /* customPatternValidator */])(/[^A-Za-z]/, 'nonLetter'),
        ];
        form.addControl('firstname', this.fb.control('', validators));
        validators = [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(2),
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].maxLength(50),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__core_validators_custom_pattern_directive__["a" /* customPatternValidator */])(/[^A-Za-z]/, 'nonLetter'),
        ];
        form.addControl('lastname', this.fb.control('', validators));
    };
    UpdateFormComponent.prototype.addEmail = function (form) {
        this.defaultEmail = this.auth.email || '';
        var validators = [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__core_validators_custom_pattern_directive__["a" /* customPatternValidator */])(__WEBPACK_IMPORTED_MODULE_7__core_validators_custom_regexp__["a" /* CustomRegExp */].email, 'invalidEmail'),
        ];
        form.addControl('email', this.fb.control('', validators));
    };
    UpdateFormComponent.prototype.addNewPassword = function (form) {
        form.addControl('password', this.fb.control('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].minLength(5)]));
        form.addControl('password2', this.fb.control('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__core_validators_password_match_validator__["a" /* PasswordValidator */].notMatch]));
    };
    UpdateFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitting = true;
        this.error = null;
        this.success = false;
        var userInfo = {};
        userInfo.currentPassword = this.updateForm.get('currentPassword').value;
        if (this.current === 'Name') {
            userInfo.firstname = this.updateForm.get('firstname').value;
            userInfo.lastname = this.updateForm.get('lastname').value;
        }
        if (this.current === 'Email') {
            userInfo.email = this.updateForm.get('email').value;
        }
        if (this.current === 'Password') {
            userInfo.newPassword = this.updateForm.get('password').value;
        }
        this.submitSub = this.api
            .updateInfo$(userInfo, this.current)
            .subscribe(function (res) {
            _this.submitting = false;
            _this.success = true;
            _this.auth.storeUserInfo(res);
            _this.resetFields();
        }, function (err) {
            _this.error = err,
                _this.submitting = false;
            _this.resetFields();
        });
    };
    UpdateFormComponent.prototype.resetFields = function () {
        this.updateForm.get('currentPassword').reset();
        if (this.current === 'Password') {
            this.updateForm.get('password').reset();
            this.updateForm.get('password2').reset();
        }
    };
    UpdateFormComponent.prototype.switch = function (val) {
        if (this.current !== val) {
            this.current = val;
            this.error = null;
            this.success = false;
            if (this.passwordChangeSub) {
                this.passwordChangeSub.unsubscribe();
            }
            // NOTE: Could add/remove inputs instead of rebuilding for each time
            //       But need to remove values anyway
            this.buildForm();
        }
    };
    UpdateFormComponent.prototype.showErrors = function (field) {
        return !this.formErrors[field].valid && (this.formErrors[field].dirty || this.formErrors[field].touched);
    };
    UpdateFormComponent.prototype.ngOnDestroy = function () {
        if (this.submitSub) {
            this.submitSub.unsubscribe();
        }
        if (this.passwordChangeSub) {
            this.passwordChangeSub.unsubscribe();
        }
    };
    return UpdateFormComponent;
}());
UpdateFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-update-form',
        template: __webpack_require__("../../../../../src/app/pages/update-form/update-form.component.html"),
        styles: ["\n    .fake-pointer {\n      cursor: pointer\n    }\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__core_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_api_service__["a" /* ApiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _d || Object])
], UpdateFormComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=update-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/user-info/user-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row justify-content-center\">\n  <div class=\"col-8\">\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h2>{{auth.username}}</h2>\n      </div>\n      <div class=\"card-body\">\n        <div *ngIf=\"auth.email\">\n          <h4 class=\"card-title\">Local</h4>\n          <p class=\"card-text\">Email: {{auth.email}}</p>\n          <br>\n        </div>\n        <div *ngIf=\"auth.twitter_id\">\n          <h4 class=\"card-title\">Twitter</h4>\n          <p class=\"card-text\">Twitter ID: {{auth.twitter_id}}</p>\n          <br>\n        </div>\n      </div>\n      <div class=\"card-footer\">\n        <button  *ngIf=\"!auth.email || !auth.twitter_id\" class=\"btn btn-primary\" (click)=\"connect()\">Connect A {{auth.email ? 'Twitter Account' : 'Local Account'}}</button>\n        <button *ngIf=\"auth.email && auth.twitter_id\" class=\"btn btn-primary\" (click)=\"disconnect()\">Disconnect Twitter Account</button>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/pages/user-info/user-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_auth_service__ = __webpack_require__("../../../../../src/app/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_misc_confirm_service__ = __webpack_require__("../../../../../src/app/core/misc/confirm.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_misc_confirm_component__ = __webpack_require__("../../../../../src/app/core/misc/confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_form_login_form_service__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_form_login_form_component__ = __webpack_require__("../../../../../src/app/pages/login-form/login-form.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserInfoComponent = (function () {
    function UserInfoComponent(auth, modalService, lf, cf) {
        this.auth = auth;
        this.modalService = modalService;
        this.lf = lf;
        this.cf = cf;
        this.modalOptions = { backdrop: 'static', keyboard: false };
    }
    UserInfoComponent.prototype.connect = function () {
        var _this = this;
        if (this.auth.email) {
            this.cf.settings('Connect a Twitter Account?');
            localStorage.setItem('previous_tab', 'info');
            var twitterModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__core_misc_confirm_component__["a" /* ConfirmComponent */]);
            twitterModal.result.then(function (result) {
                _this.auth.twitterConnect(_this.auth.user_id);
            });
        }
        else {
            this.lf.setConnectStatus(true);
            var localModal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_6__login_form_login_form_component__["a" /* LoginFormComponent */], this.modalOptions);
            // localModal.result.then(result => {
            //   window.location.reload()
            // })
        }
    };
    UserInfoComponent.prototype.disconnect = function () {
        var _this = this;
        this.cf.settings('Disconnect your Twitter Account?');
        var modal = this.modalService.open(__WEBPACK_IMPORTED_MODULE_4__core_misc_confirm_component__["a" /* ConfirmComponent */]);
        modal.result.then(function (result) {
            _this.auth.twitterDisconnect$()
                .subscribe(function (res) {
                console.log(res);
                _this.auth.storeUserInfo(res);
            }, function (err) {
                _this.auth.setError(err);
            });
        });
    };
    return UserInfoComponent;
}());
UserInfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-user-info',
        template: __webpack_require__("../../../../../src/app/pages/user-info/user-info.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__core_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__login_form_login_form_service__["a" /* LoginFormService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__login_form_login_form_service__["a" /* LoginFormService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__core_misc_confirm_service__["a" /* ConfirmService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_misc_confirm_service__["a" /* ConfirmService */]) === "function" && _d || Object])
], UserInfoComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=user-info.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map