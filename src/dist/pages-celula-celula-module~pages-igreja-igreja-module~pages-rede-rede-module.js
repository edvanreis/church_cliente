(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-celula-celula-module~pages-igreja-igreja-module~pages-rede-rede-module"],{

/***/ "./src/app/diretives/diretives.module.ts":
/*!***********************************************!*\
  !*** ./src/app/diretives/diretives.module.ts ***!
  \***********************************************/
/*! exports provided: DiretivesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiretivesModule", function() { return DiretivesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _has_permission_has_permission_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./has-permission/has-permission.directive */ "./src/app/diretives/has-permission/has-permission.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DiretivesModule = /** @class */ (function () {
    function DiretivesModule() {
    }
    DiretivesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _has_permission_has_permission_directive__WEBPACK_IMPORTED_MODULE_1__["HasPermissionDirective"]
            ],
            imports: [],
            exports: [
                _has_permission_has_permission_directive__WEBPACK_IMPORTED_MODULE_1__["HasPermissionDirective"]
            ]
        })
    ], DiretivesModule);
    return DiretivesModule;
}());



/***/ }),

/***/ "./src/app/diretives/has-permission/has-permission.directive.ts":
/*!**********************************************************************!*\
  !*** ./src/app/diretives/has-permission/has-permission.directive.ts ***!
  \**********************************************************************/
/*! exports provided: HasPermissionDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HasPermissionDirective", function() { return HasPermissionDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/user.service */ "./src/app/service/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HasPermissionDirective = /** @class */ (function () {
    function HasPermissionDirective(templateRef, viewContainer, userService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.userService = userService;
        this.permissions = [];
    }
    Object.defineProperty(HasPermissionDirective.prototype, "hasPermission", {
        set: function (val) {
            this.permissao = val;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    HasPermissionDirective.prototype.updateView = function () {
        if (this.checkPermission()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    };
    HasPermissionDirective.prototype.checkPermission = function () {
        var hasPermission = false;
        var permissoes = this.userService.permissions().authorities;
        var permissoesArray = [];
        permissoesArray = this.permissao;
        if (permissoes) {
            permissoes.forEach(function (map) {
                var item = permissoesArray.find(function (i) { return i == map.authority; });
                if (item) {
                    hasPermission = true;
                }
            });
        }
        return hasPermission;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HasPermissionDirective.prototype, "hasPermission", null);
    HasPermissionDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[hasPermission]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"],
            _service_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], HasPermissionDirective);
    return HasPermissionDirective;
}());



/***/ }),

/***/ "./src/app/pages/componentes/redes/redes-componente.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/componentes/redes/redes-componente.module.ts ***!
  \********************************************************************/
/*! exports provided: RedesComponenteModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesComponenteModule", function() { return RedesComponenteModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _redes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redes.component */ "./src/app/pages/componentes/redes/redes.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var RedesComponenteModule = /** @class */ (function () {
    function RedesComponenteModule() {
    }
    RedesComponenteModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"]
            ],
            declarations: [
                _redes_component__WEBPACK_IMPORTED_MODULE_2__["RedesComponent"]
            ],
            exports: [
                _redes_component__WEBPACK_IMPORTED_MODULE_2__["RedesComponent"]
            ]
        })
    ], RedesComponenteModule);
    return RedesComponenteModule;
}());



/***/ }),

/***/ "./src/app/pages/componentes/redes/redes.component.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/componentes/redes/redes.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <mat-form-field class=\"full-width-field\">\r\n    <input type=\"text\" placeholder=\"Rede\" aria-label=\"Number\" matInput [formControl]=\"myControlRede\"\r\n      [matAutocomplete]=\"auto\" [(ngModel)]=\"nomeValue\">\r\n    <mat-autocomplete #auto=\"matAutocomplete\">\r\n      <mat-option *ngFor=\"let option of filteredRede | async\" [value]=\"option.nome\"\r\n        (onSelectionChange)=\"onSelectionChanged($event,option)\">\r\n        {{option.nome}}\r\n      </mat-option>\r\n    </mat-autocomplete>\r\n  </mat-form-field>\r\n  </div>"

/***/ }),

/***/ "./src/app/pages/componentes/redes/redes.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/pages/componentes/redes/redes.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/componentes/redes/redes.component.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/componentes/redes/redes.component.ts ***!
  \************************************************************/
/*! exports provided: RedesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedesComponent", function() { return RedesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RedesComponent = /** @class */ (function () {
    function RedesComponent(_redeService, _notifierService, _emitirEventoService) {
        this._redeService = _redeService;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this.comboRede = [];
        this.myControlRede = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]();
    }
    RedesComponent.prototype.ngOnInit = function () {
        this.getEmiter();
        this.carregarRede();
    };
    RedesComponent.prototype.carregarRede = function () {
        var _this = this;
        this._redeService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.comboRede = item;
            console.log(item);
            _this.filteredRede = _this.myControlRede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filter(value, _this.comboRede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar igrejas sede!");
        });
    };
    RedesComponent.prototype._filter = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    RedesComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            console.log("rede");
            if (item.type == 'add') {
                _this.redeSelecionada = item.data;
                _this.nomeValue = item.data;
            }
            if (item.type == 'clear') {
                _this.redeSelecionada = '';
                _this.nomeValue = '';
            }
            if (item.type == 'edit-rede') {
                _this.redeSelecionada = item.data;
                _this.nomeValue = item.data.nome;
                _this.setEmiter();
            }
        });
    };
    RedesComponent.prototype.onSelectionChanged = function ($event, option) {
        this.redeSelecionada = option;
        this.setEmiter();
    };
    RedesComponent.prototype.setEmiter = function () {
        this._emitirEventoService.emitir("rede-comp", this.redeSelecionada);
    };
    RedesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-redes',
            template: __webpack_require__(/*! ./redes.component.html */ "./src/app/pages/componentes/redes/redes.component.html"),
            styles: [__webpack_require__(/*! ./redes.component.scss */ "./src/app/pages/componentes/redes/redes.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_rede_service__WEBPACK_IMPORTED_MODULE_1__["RedeService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_3__["EmitirEventoService"]])
    ], RedesComponent);
    return RedesComponent;
}());



/***/ }),

/***/ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>\r\n  <h4 mat-dialog-title>\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">swap_horiz</i>\r\n      <h1 class=\"mat-headline center-align\">Transferir</h1>\r\n    </mat-toolbar>\r\n  </h4>\r\n  <div class=\"cdk-container\">\r\n  <app-igrejas *ngIf=\"data.controller==='igreja'\"></app-igrejas>\r\n    <div *ngIf=\"data.controller==='rede'\">\r\n      <mat-form-field class=\"full-width-field\">\r\n        <input type=\"text\" placeholder=\"Rede\" aria-label=\"Number\" matInput [formControl]=\"myControlRede\"\r\n          [matAutocomplete]=\"a\" [(ngModel)]=\"redeValue\">\r\n        <mat-autocomplete #a=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let option of filteredRede | async\" [value]=\"option.nome\"\r\n            (click)=\"onSelectionRedeClick($event,option)\">\r\n            {{option.nome}}\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n      </mat-form-field>\r\n    </div>\r\n    <div *ngIf=\"data.controller==='celula'\">\r\n      <mat-form-field class=\"full-width-field\">\r\n        <input type=\"text\" placeholder=\"Celula\" aria-label=\"Number\" matInput [formControl]=\"myControlCelula\"\r\n          [matAutocomplete]=\"auto\" [(ngModel)]=\"celulaValue\">\r\n        <mat-autocomplete #auto=\"matAutocomplete\">\r\n          <mat-option *ngFor=\"let option of filteredCelula | async\" [value]=\"option.nome\"\r\n            (onSelectionChange)=\"onSelectionCelulaClick($event,option)\">\r\n            {{option.nome}}\r\n          </mat-option>\r\n        </mat-autocomplete>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n  <div mat-dialog-actions align=\"end\">\r\n    <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"confirmar()\">\r\n      <i class=\"material-icons\">done</i>Confirmar</button>\r\n    <div fxFlex></div>\r\n    <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"close()\">\r\n      <i class=\"material-icons\">close</i>Fechar</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.scss":
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: DialogTransferirPessoaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogTransferirPessoaComponent", function() { return DialogTransferirPessoaComponent; });
/* harmony import */ var _service_celula_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../service/celula.service */ "./src/app/service/celula.service.ts");
/* harmony import */ var _service_visitante_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/visitante.service */ "./src/app/service/visitante.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/membro.service */ "./src/app/service/membro.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var DialogTransferirPessoaComponent = /** @class */ (function () {
    function DialogTransferirPessoaComponent(dialogRef, data, _membroService, _visitanteService, _notifierService, _emitirEventoService, _redeService, _celulaService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._membroService = _membroService;
        this._visitanteService = _visitanteService;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._redeService = _redeService;
        this._celulaService = _celulaService;
        this.myControlRede = new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]();
        this.comboRede = [];
        this.myControlCelula = new _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormControl"]();
        this.comboCelulas = [];
    }
    DialogTransferirPessoaComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        this.getEmiter();
        if (this.data.controller == 'rede') {
            this.carregarRede();
        }
        if (this.data.controller == 'celula') {
            this.carregarCelula();
        }
    };
    DialogTransferirPessoaComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'igreja-comp') {
                _this.igrejaSelecionada = item.data;
            }
        });
    };
    DialogTransferirPessoaComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    DialogTransferirPessoaComponent.prototype.confirmar = function () {
        var erro = false;
        if (this.data.controller === 'igreja') {
            if (this.igrejaSelecionada) {
                switch (this.data.tipoPessoa) {
                    case 'M':
                        this.transferirMembro(this.igrejaSelecionada.id);
                        break;
                    case 'V':
                        this.transferirVisitante(this.igrejaSelecionada.id);
                        break;
                }
            }
        }
        else if (this.data.controller === 'rede') {
            if (this.redeSelecionada) {
                switch (this.data.tipoPessoa) {
                    case 'M':
                        this.transferirMembro(this.redeSelecionada.id);
                        break;
                    case 'V':
                        this.transferirVisitante(this.redeSelecionada.id);
                        break;
                }
            }
        }
        else if (this.data.controller === 'celula') {
            if (this.celulaSelecionada) {
                switch (this.data.tipoPessoa) {
                    case 'M':
                        this.transferirMembro(this.celulaSelecionada.id);
                        break;
                    case 'V':
                        this.transferirVisitante(this.celulaSelecionada.id);
                        break;
                }
            }
        }
        if (erro) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, 'Por favor selecione ' + this.data.controller);
        }
    };
    DialogTransferirPessoaComponent.prototype.transferirMembro = function (id) {
        var _this = this;
        this._membroService.transferirMembro(this.data.controller, id, this.data.pessoaId, this.data.metodo)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            _this.setEmiter();
            _this.close();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, error.error.message);
        });
    };
    DialogTransferirPessoaComponent.prototype.transferirVisitante = function (id) {
        var _this = this;
        this._visitanteService.transferirVisitante(this.data.controller, id, this.data.pessoaId, this.data.metodo)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            _this.setEmiter();
            _this.close();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, error.error.message);
        });
    };
    DialogTransferirPessoaComponent.prototype.setEmiter = function () {
        this._emitirEventoService.emitir('transferido', this.data.tipoPessoa);
    };
    DialogTransferirPessoaComponent.prototype.onSelectionRedeClick = function ($event, option) {
        this.redeSelecionada = option;
    };
    DialogTransferirPessoaComponent.prototype.carregarRede = function () {
        var _this = this;
        this._redeService.getRedeIgreja(this.data.igrejaId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            _this.comboRede = item;
            // console.log(item);
            _this.filteredRede = _this.myControlRede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (value) { return _this._filterRede(value, _this.comboRede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, "Erro ao carregar as redes!");
        });
    };
    DialogTransferirPessoaComponent.prototype._filterRede = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    DialogTransferirPessoaComponent.prototype.carregarCelula = function () {
        var _this = this;
        this._celulaService.getCelulaRede(this.data.redeId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            _this.comboCelulas = item;
            // console.log(item);
            _this.filteredCelula = _this.myControlCelula.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (value) { return _this._filterCelula(value, _this.comboCelulas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, "Erro ao carregar as células!");
        });
    };
    DialogTransferirPessoaComponent.prototype._filterCelula = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    DialogTransferirPessoaComponent.prototype.onSelectionCelulaClick = function ($event, option) {
        this.celulaSelecionada = option;
    };
    DialogTransferirPessoaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-transferir-pessoa',
            template: __webpack_require__(/*! ./dialog-transferir-pessoa.component.html */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.html"),
            styles: [__webpack_require__(/*! ./dialog-transferir-pessoa.component.scss */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object, _service_membro_service__WEBPACK_IMPORTED_MODULE_4__["MembroService"],
            _service_visitante_service__WEBPACK_IMPORTED_MODULE_1__["VisitanteService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_6__["EmitirEventoService"],
            _service_rede_service__WEBPACK_IMPORTED_MODULE_8__["RedeService"],
            _service_celula_service__WEBPACK_IMPORTED_MODULE_0__["CelulaService"]])
    ], DialogTransferirPessoaComponent);
    return DialogTransferirPessoaComponent;
}());



/***/ }),

/***/ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module.ts ***!
  \******************************************************************************************/
/*! exports provided: DialogTransferirPessoaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogTransferirPessoaModule", function() { return DialogTransferirPessoaModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog-transferir-pessoa.component */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../componentes/igrejas/igreja-compenent.module */ "./src/app/pages/componentes/igrejas/igreja-compenent.module.ts");
/* harmony import */ var _componentes_redes_redes_componente_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../componentes/redes/redes-componente.module */ "./src/app/pages/componentes/redes/redes-componente.module.ts");
/* harmony import */ var _componentes_celula_celula_component_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../componentes/celula/celula-component.module */ "./src/app/pages/componentes/celula/celula-component.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DialogTransferirPessoaModule = /** @class */ (function () {
    function DialogTransferirPessoaModule() {
    }
    DialogTransferirPessoaModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_6__["IgrejasComponentModule"],
                _componentes_redes_redes_componente_module__WEBPACK_IMPORTED_MODULE_7__["RedesComponenteModule"],
                _componentes_celula_celula_component_module__WEBPACK_IMPORTED_MODULE_8__["CelulaComponentModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatOptionModule"]
            ],
            declarations: [
                _dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_2__["DialogTransferirPessoaComponent"]
            ],
            entryComponents: [
                _dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_2__["DialogTransferirPessoaComponent"]
            ]
        })
    ], DialogTransferirPessoaModule);
    return DialogTransferirPessoaModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-celula-celula-module~pages-igreja-igreja-module~pages-rede-rede-module.js.map