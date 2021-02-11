(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-usuario-usuario-module"],{

/***/ "./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span *ngIf=\"titulo=='Editar'\"><i class=\"material-icons\">create</i></span>\r\n      <span *ngIf=\"titulo=='Novo'\"><i class=\"material-icons\">add</i></span>\r\n      <h1 class=\"mat-headline center-align\">{{ titulo }} Usuario</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div fxFlex.xs=\"100\" fxFlex.lg=\"100\" fxFlex.md=\"100\" fxFlex.sm=\"100\">\r\n        <form form [formGroup]=\"form\">\r\n          <div [hidden]=\"titulo=='Editar'\" >\r\n            <mat-form-field class=\"full-width-field\">\r\n              <input matInput placeholder=\"login\" formControlName=\"login\" id=\"login\">\r\n              <mat-error *ngIf=\"!form.controls.login.valid\">Campo Obrigatório</mat-error>\r\n            </mat-form-field>\r\n          </div>\r\n          <div  [hidden]=\"titulo=='Novo'\">\r\n            <mat-form-field class=\"full-width-field\">\r\n              <input matInput placeholder=\"login\" formControlName=\"login-desable\" id=\"login\">\r\n            </mat-form-field>\r\n          </div>\r\n          <div [hidden]=\"titulo=='Editar'\" >\r\n            <mat-form-field class=\"full-width-field\">\r\n              <input type=\"text\" placeholder=\"Membro\" aria-label=\"Number\" matInput [formControl]=\"myControlMembro\"\r\n                [matAutocomplete]=\"auto\" [(ngModel)]=\"membroValue\">\r\n              <mat-autocomplete #auto=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let option of filteredMembro | async\" [value]=\"option.nomeCompleto\"\r\n                  (onSelectionChange)=\"onSelectionChangedMembro($event,option)\">\r\n                  {{option.nomeCompleto}}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n            </mat-form-field>\r\n          </div>\r\n          <div [hidden]=\"titulo=='Novo'\" >\r\n            <mat-form-field class=\"full-width-field\" >\r\n              <input matInput placeholder=\"Membro\" formControlName=\"nome\" id=\"nome\">\r\n            </mat-form-field>\r\n            <mat-form-field class=\"full-width-field\" [hidden]=\"titulo=='Novo'\">\r\n              <input matInput placeholder=\"CPF\" formControlName=\"cpf\" >\r\n            </mat-form-field>\r\n          </div>\r\n          <div [hidden]=\"titulo=='Novo'\">\r\n            <mat-form-field class=\"full-width-field\">\r\n              <mat-label>Status</mat-label>\r\n              <mat-select formControlName=\"status\" id=\"status\">\r\n                <mat-option *ngFor=\"let item of comboStatus\" [value]=\"item.codigo\">\r\n                  {{item.value}}\r\n                </mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n          </div>\r\n          <div>\r\n            <div>\r\n            <mat-form-field class=\"full-width-field\">\r\n              <input type=\"text\" placeholder=\"Perfil\" aria-label=\"Number\" matInput [formControl]=\"myControlPerfil\"\r\n                [matAutocomplete]=\"aut\" [(ngModel)]=\"perfilValue\">\r\n              <mat-autocomplete #aut=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let option of filteredPerfil | async\" [value]=\"option.nome\"\r\n                  (onSelectionChange)=\"onSelectionChangedPerfil($event,option)\">\r\n                  {{option.nome}}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n            </mat-form-field>\r\n          </div>\r\n          <div>\r\n            <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"adicionar()\">\r\n              <i class=\"material-icons\">add</i>adicionar</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n        <div class=\"table-responsive\" *ngIf=\"perfis.length > 0\">\r\n          <table>\r\n            <thead class=\"text-primary\">\r\n              <th>Nome</th>\r\n              <th>Remover</th>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of perfis\">\r\n                <td>{{ item.nome}}</td>\r\n                <td><span style=\"color: #1d68a5;cursor: pointer\" (click)=\"remover(item)\" *ngIf=\"item.nome!='basico'\">\r\n                    <i class=\"material-icons\">delete</i></span></td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n        <br />\r\n        <br />\r\n        <div>\r\n          <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"saveOrEdit()\">\r\n            <i class=\"material-icons\">save</i>Salvar</button>\r\n          <div fxFlex></div>\r\n          <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"voltar()\">\r\n            <i class=\"material-icons\">reply</i>Voltar</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.ts ***!
  \************************************************************************/
/*! exports provided: CadastrarUsuarioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastrarUsuarioComponent", function() { return CadastrarUsuarioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_perfil_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/perfil.service */ "./src/app/service/perfil.service.ts");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/user.service */ "./src/app/service/user.service.ts");
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/membro.service */ "./src/app/service/membro.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ELEMENT_DATA = [
    { codigo: 'A', value: 'Ativo' },
    { codigo: 'I', value: 'Inativo' },
    { codigo: null, value: 'Todas' },
];
var CadastrarUsuarioComponent = /** @class */ (function () {
    function CadastrarUsuarioComponent(_router, _notifierService, _userService, _avRoute, _perfilService, _membroService) {
        this._router = _router;
        this._notifierService = _notifierService;
        this._userService = _userService;
        this._avRoute = _avRoute;
        this._perfilService = _perfilService;
        this._membroService = _membroService;
        this.obj = {};
        this.comboPerfil = [];
        this.comboMembro = [];
        this.perfis = [];
        this.myControlMembro = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.myControlPerfil = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.comboStatus = ELEMENT_DATA;
    }
    CadastrarUsuarioComponent.prototype.ngOnInit = function () {
        this._buildForm();
        this.getParams();
        this.carregarComboPerfis();
        this.carregarComboPessoa();
    };
    CadastrarUsuarioComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: '', disabled: true }),
            'login-desable': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: '', disabled: true }),
            'login': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            'status': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'pefil': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'cpf': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: '', disabled: true }),
            'cpfdesable': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({ value: '', disabled: true })
        });
    };
    CadastrarUsuarioComponent.prototype.voltar = function () {
        this._router.navigate(['/auth/usuario/pesquisar'], {
            queryParams: {
                login: this.login,
                nome: this.nome,
                cpf: this.cpf,
                status: this.status
            },
            skipLocationChange: true
        });
    };
    CadastrarUsuarioComponent.prototype.getParams = function () {
        if (this._avRoute.snapshot.queryParamMap.get("id")) {
            this.id = this._avRoute.snapshot.queryParamMap.get("id");
            this.getUsuario(this.id);
        }
        if (this._avRoute.snapshot.queryParamMap.get("janela")) {
            this.titulo = this._avRoute.snapshot.queryParamMap.get("janela");
        }
        if (this._avRoute.snapshot.queryParamMap.get("login")) {
            this.login = this._avRoute.snapshot.queryParamMap.get("login");
        }
        if (this._avRoute.snapshot.queryParamMap.get("nome")) {
            this.nome = this._avRoute.snapshot.queryParamMap.get("nome");
        }
        if (this._avRoute.snapshot.queryParamMap.get("status")) {
            this.status = this._avRoute.snapshot.queryParamMap.get("status");
        }
    };
    CadastrarUsuarioComponent.prototype.edit = function () {
        var _this = this;
        this.setObj();
        this._userService.update(this.obj).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, error.message);
        });
    };
    CadastrarUsuarioComponent.prototype.save = function () {
        var _this = this;
        if (!this.form.valid) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, "Preencha todos os campos obrigatórios!");
            return false;
        }
        this.setObj();
        console.log(this.obj);
        this._userService.save(this.obj).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Success, item.value);
            _this.voltar();
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, error.message);
        });
    };
    CadastrarUsuarioComponent.prototype.setObj = function () {
        this.obj.membro = { id: this.membro.id };
        this.obj.login = this.form.controls['login'].value;
        this.obj.perfis = this.perfis;
        this.obj.status = this.form.controls['status'].value;
        if (this.id) {
            this.obj.id = this.id;
        }
    };
    CadastrarUsuarioComponent.prototype.getUsuario = function (id) {
        var _this = this;
        this._userService.getUser(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            //  console.log(item)
            _this.form.controls['login-desable'].patchValue(item.login);
            _this.form.controls['nome'].patchValue(item.nome);
            _this.form.controls['cpf'].patchValue(item.cpf);
            _this.form.controls['status'].patchValue(item.status);
            _this.form.controls['login'].patchValue(item.login);
            _this.perfis = item.perfis;
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, error.errors.message);
        });
    };
    CadastrarUsuarioComponent.prototype.saveOrEdit = function () {
        if (this.id) {
            this.edit();
        }
        else {
            this.save();
        }
    };
    CadastrarUsuarioComponent.prototype.carregarComboPerfis = function () {
        var _this = this;
        this._perfilService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            // this.comboPerfil = item;
            // this.comboPerfil.forEach(element => {
            //   if(element.nome=='basico' && this.perfis.length == 0){
            //         this.perfis.push(element);
            //         this.perfilUsuario = element;
            //   }
            // });
            // console.log(item)
            _this.comboPerfil = item;
            _this.filteredPerfil = _this.myControlPerfil.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterPerfil(value, _this.comboPerfil); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, "Erro ao carregar os perfis!");
        });
    };
    CadastrarUsuarioComponent.prototype.adicionar = function () {
        var _this = this;
        var adicionada = false;
        this.perfis.forEach(function (element) {
            if (element.id == _this.perfilUsuario.id) {
                adicionada = true;
            }
        });
        if (adicionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, "Permissão já adicionada!");
            return false;
        }
        else {
            this.perfis.push(this.perfilUsuario);
            this.form.controls['perfil'].patchValue('');
        }
    };
    //  remove uma linha da grid
    CadastrarUsuarioComponent.prototype.remover = function (index) {
        this.perfis.splice(index, 1);
    };
    CadastrarUsuarioComponent.prototype.onSelectionChangedPerfil = function ($event, option) {
        this.perfilUsuario = option;
    };
    CadastrarUsuarioComponent.prototype.onSelectionChangedMembro = function ($event, option) {
        this.membro = option;
        this.form.controls['cpf'].patchValue(option.cpf);
    };
    CadastrarUsuarioComponent.prototype.carregarComboPessoa = function () {
        var _this = this;
        this._membroService.getListMembros().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.comboMembro = item;
            _this.filteredMembro = _this.myControlMembro.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterMembro(value, _this.comboMembro); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    CadastrarUsuarioComponent.prototype._filterMembro = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarUsuarioComponent.prototype._filterPerfil = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarUsuarioComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cadastrar-usuario',
            template: __webpack_require__(/*! ./cadastrar-usuario.component.html */ "./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.html"),
            styles: [__webpack_require__(/*! ./cadastrar-usuario.component.scss */ "./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_3__["NotifierService"],
            _service_user_service__WEBPACK_IMPORTED_MODULE_7__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _service_perfil_service__WEBPACK_IMPORTED_MODULE_6__["PerfilService"],
            _service_membro_service__WEBPACK_IMPORTED_MODULE_8__["MembroService"]])
    ], CadastrarUsuarioComponent);
    return CadastrarUsuarioComponent;
}());



/***/ }),

/***/ "./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">person</i>\r\n      <h1 class=\"mat-headline center-align\">Usuario</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"100px\">\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"cadastrar()\">\r\n          <i class=\"material-icons\">add</i>Novo</button>\r\n      </div>\r\n      <form form [formGroup]=\"form\">\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput placeholder=\"Nome\" formControlName=\"nome\" id=\"nome\">\r\n          </mat-form-field>\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput placeholder=\"Login\" formControlName=\"login\" id=\"login\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field>\r\n            <mat-label>Status</mat-label>\r\n            <mat-select formControlName=\"status\" id=\"status\">\r\n              <mat-option *ngFor=\"let item of comboStatus\" [value]=\"item.codigo\">\r\n                {{item.value}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n      </form>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"pesquisar()\">\r\n          <i class=\"material-icons\">search</i>Buscar</button>\r\n        <div [hidden]=\"!loading\" align=\"center\" style=\"width: 100%\">\r\n          <h4>Buscando...</h4>\r\n          <mat-spinner [diameter]=\"40\"></mat-spinner>\r\n        </div>\r\n        <div class=\"example-header\" style=\"padding: 0 20px;\" *ngIf=\"dados.data.length > 0 && !loading\">\r\n          <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n            <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filtrar\">\r\n          </mat-form-field>\r\n        </div>\r\n        <div *ngIf=\"dados.data.length > 0 && !loading\">\r\n          <mat-table #table [dataSource]=\"dados\" matSort style=\"margin-top: 20px;\">\r\n            <ng-container matColumnDef=\"{{ column.id }}\" *ngFor=\"let column of columnNames\">\r\n              <mat-header-cell *matHeaderCellDef mat-sort-header> {{column.value}} </mat-header-cell>\r\n              <mat-cell *matCellDef=\"let element\">\r\n                <span *ngIf=\"column.id!='id'\">{{element[column.id]}}</span>\r\n                <span *ngIf=\"column.id=='id'\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"editar(element.id)\"><i\r\n                    class=\"material-icons\">create</i></span>\r\n              </mat-cell>\r\n            </ng-container>\r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n          </mat-table>\r\n          <mat-paginator #paginator [length]=\"dados.length\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n            [pageIndex]=\"pageIndex\" (page)=\"paginatorEvent($event)\" showFirstLastButtons></mat-paginator>\r\n        </div>\r\n      </div>\r\n"

/***/ }),

/***/ "./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.ts ***!
  \************************************************************************/
/*! exports provided: PesquisarUsuarioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PesquisarUsuarioComponent", function() { return PesquisarUsuarioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/user.service */ "./src/app/service/user.service.ts");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ELEMENT_DATA = [
    { codigo: 'A', value: 'Ativo' },
    { codigo: 'I', value: 'Inativo' },
    { codigo: null, value: 'Todas' },
];
var PesquisarUsuarioComponent = /** @class */ (function () {
    function PesquisarUsuarioComponent(_router, _userService, _notifierService, _dialog, _emitirEventoService, _avRoute) {
        this._router = _router;
        this._userService = _userService;
        this._notifierService = _notifierService;
        this._dialog = _dialog;
        this._emitirEventoService = _emitirEventoService;
        this._avRoute = _avRoute;
        this.maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
        this.displayedColumns = [];
        this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.pageIndex = 0;
        this.loading = false;
        this.lista = [];
        this.comboStatus = ELEMENT_DATA;
    }
    PesquisarUsuarioComponent.prototype.ngOnInit = function () {
        this.columns();
        this.builForm();
        this.getParams();
    };
    PesquisarUsuarioComponent.prototype.builForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'login': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'status': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'dataInicio': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            'dataFim': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('')
        });
    };
    PesquisarUsuarioComponent.prototype.getParams = function () {
        var editar = false;
        if (this._avRoute.snapshot.queryParamMap.get("login")) {
            var login = this._avRoute.snapshot.queryParamMap.get("login");
            this.form.controls['login'].patchValue(login);
            editar = true;
        }
        if (this._avRoute.snapshot.queryParamMap.get("nome")) {
            var nome = this._avRoute.snapshot.queryParamMap.get("nome");
            this.form.controls['nome'].patchValue(nome);
            editar = true;
        }
        if (this._avRoute.snapshot.queryParamMap.get("status")) {
            var status_1 = this._avRoute.snapshot.queryParamMap.get("status");
            this.form.controls['status'].patchValue(status_1);
            editar = true;
        }
        if (editar) {
            this.pesquisar();
        }
    };
    PesquisarUsuarioComponent.prototype.applyFilter = function (value) {
        this.dados.filter = value.trim().toLowerCase();
    };
    PesquisarUsuarioComponent.prototype.paginatorEvent = function (event) {
        this.pageIndex = event.pageIndex;
    };
    PesquisarUsuarioComponent.prototype.columns = function () {
        this.columnNames = [
            { id: 'login', value: 'Login' },
            { id: 'nome', value: 'Nome' },
            { id: 'status', value: 'Status' },
            { id: 'id', value: 'Ação' }
        ];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
    };
    PesquisarUsuarioComponent.prototype.cadastrar = function () {
        this._router.navigate(['/auth/usuario/cadastrar'], {
            queryParams: {
                janela: 'Novo',
            },
            skipLocationChange: true
        });
    };
    PesquisarUsuarioComponent.prototype.editar = function (id) {
        this._router.navigate(['/auth/usuario/cadastrar'], {
            queryParams: {
                janela: 'Editar',
                id: id,
                login: this.form.controls['login'].value,
                nome: this.form.controls['nome'].value,
                status: this.form.controls['status'].value
            },
            skipLocationChange: true
        });
    };
    PesquisarUsuarioComponent.prototype.pesquisar = function () {
        var _this = this;
        this.loading = true;
        console.log(this.obj());
        this._userService.pesquisar(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](item);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            // console.log(error);
            _this.loading = false;
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, error.message);
        });
    };
    PesquisarUsuarioComponent.prototype.obj = function () {
        return {
            nome: this.form.controls['nome'].value,
            login: this.form.controls['login'].value,
            status: this.form.controls['status'].value
        };
    };
    PesquisarUsuarioComponent.prototype.alterarSenha = function (id) {
        this._router.navigate(['/auth/usuario/senha'], {
            queryParams: {
                janela: 'Editar',
                id: id,
                login: this.form.controls['login'].value,
                nome: this.form.controls['nome'].value,
                status: this.form.controls['status'].value
            },
            skipLocationChange: true
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], PesquisarUsuarioComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paginator'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], PesquisarUsuarioComponent.prototype, "paginator", void 0);
    PesquisarUsuarioComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pesquisar-usuario',
            template: __webpack_require__(/*! ./pesquisar-usuario.component.html */ "./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.html"),
            styles: [__webpack_require__(/*! ./pesquisar-usuario.component.scss */ "./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _service_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_4__["NotifierService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_5__["EmitirEventoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], PesquisarUsuarioComponent);
    return PesquisarUsuarioComponent;
}());



/***/ }),

/***/ "./src/app/pages/usuario/usuario.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/usuario/usuario.module.ts ***!
  \*************************************************/
/*! exports provided: UsuarioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioModule", function() { return UsuarioModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pesquisar_pesquisar_usuario_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pesquisar/pesquisar-usuario.component */ "./src/app/pages/usuario/pesquisar/pesquisar-usuario.component.ts");
/* harmony import */ var _cadastrar_cadastrar_usuario_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadastrar/cadastrar-usuario.component */ "./src/app/pages/usuario/cadastrar/cadastrar-usuario.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _service_interceptor_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../service/interceptor.service */ "./src/app/service/interceptor.service.ts");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    { path: 'pesquisar', component: _pesquisar_pesquisar_usuario_component__WEBPACK_IMPORTED_MODULE_2__["PesquisarUsuarioComponent"], data: { animation: 'buttons' } },
    { path: 'cadastrar', component: _cadastrar_cadastrar_usuario_component__WEBPACK_IMPORTED_MODULE_3__["CadastrarUsuarioComponent"], data: { animation: 'buttons' } },
];
var UsuarioModule = /** @class */ (function () {
    function UsuarioModule() {
    }
    UsuarioModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                angular2_text_mask__WEBPACK_IMPORTED_MODULE_10__["TextMaskModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatNativeDateModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"],
            ],
            declarations: [
                _pesquisar_pesquisar_usuario_component__WEBPACK_IMPORTED_MODULE_2__["PesquisarUsuarioComponent"],
                _cadastrar_cadastrar_usuario_component__WEBPACK_IMPORTED_MODULE_3__["CadastrarUsuarioComponent"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HTTP_INTERCEPTORS"], useClass: _service_interceptor_service__WEBPACK_IMPORTED_MODULE_9__["InterceptorService"], multi: true }
            ]
        })
    ], UsuarioModule);
    return UsuarioModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-usuario-usuario-module.js.map