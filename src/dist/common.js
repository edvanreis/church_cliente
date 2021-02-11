(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/service/grupo.service.ts":
/*!******************************************!*\
  !*** ./src/app/service/grupo.service.ts ***!
  \******************************************/
/*! exports provided: GrupoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrupoService", function() { return GrupoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GrupoService = /** @class */ (function () {
    function GrupoService(http) {
        this.http = http;
        this._url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "grupoTrabalho/";
    }
    GrupoService.prototype.getList = function () {
        return this.http.get(this._url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.save = function (grupo) {
        return this.http.post(this._url, grupo)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.update = function (grupo) {
        return this.http.put(this._url, grupo)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.getGrupo = function (id) {
        return this.http.get(this._url + id + "/getGrupoTrabalho")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.getGruposByIgrejas = function (obj) {
        return this.http.post(this._url + "gruposByIgrejas", obj)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.findGruposTrabalhoESubByIgreja = function (obj) {
        return this.http.post(this._url + "gruposSubByIgrejas", obj)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.getGruposByIgrejasGroupBy = function (obj) {
        return this.http.post(this._url + "gruposByIgrejasGrupby", obj)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.search = function (grupo) {
        return this.http.post(this._url + "pesquisar", grupo)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.getListForStatus = function (status) {
        return this.http.get(this._url + status + "/grupoPorStatus")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.getModalidade = function () {
        return this.http.get(this._url + "musicoModalidades")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService.prototype.removerPessoaModalidade = function (obj) {
        return this.http.post(this._url + "removerPessoaModalidade", obj)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    GrupoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], GrupoService);
    return GrupoService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map