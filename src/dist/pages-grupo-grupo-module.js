(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-grupo-grupo-module"],{

/***/ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div mat-dialog-content>\r\n  <h4 mat-dialog-title>\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">music_video</i>\r\n      <h1 class=\"mat-headline center-align\">Modalidade Membro</h1>\r\n    </mat-toolbar>\r\n  </h4>\r\n  <div class=\"cdk-container\">\r\n    <div>\r\n      <mat-form-field class=\"full-width-field\">\r\n        <mat-label>Selecione...</mat-label>\r\n        <mat-select id=\"modalidades\" [(ngModel)]=\"modalidade\">\r\n          <mat-option *ngFor=\"let item of modalidades\" [value]=\"item\">\r\n            {{item.nome}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div>\r\n      <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"adicionar()\">\r\n        <i class=\"material-icons\">add</i>adicionar</button>\r\n    </div>\r\n    <br />\r\n    <br />\r\n    <div class=\"table-responsive\" *ngIf=\"modalidadesPessoa.length > 0\">\r\n      <table>\r\n        <thead class=\"text-primary\">\r\n          <th></th>\r\n          <th>Modalidade</th>\r\n          <th>Remover</th>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of modalidadesPessoa;let i = index\">\r\n            <td>{{ i+1 }}</td>\r\n            <td>{{ item.nome}}</td>\r\n            <td><span style=\"color: #1d68a5;cursor: pointer\" (click)=\"remover(item,i)\"><i\r\n                  class=\"material-icons\">delete</i></span></td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n  <div mat-dialog-actions align=\"end\">\r\n    <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"confirmar()\">\r\n      <i class=\"material-icons\">delete_forever</i>Confirmar</button>\r\n    <div fxFlex></div>\r\n    <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"close()\">\r\n      <i class=\"material-icons\">close</i>Fechar</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.scss":
/*!*************************************************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.ts ***!
  \***********************************************************************************************************************/
/*! exports provided: DialogPessoaGrupoModalidadeMusicoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogPessoaGrupoModalidadeMusicoComponent", function() { return DialogPessoaGrupoModalidadeMusicoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_grupo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/grupo.service */ "./src/app/service/grupo.service.ts");
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







var DialogPessoaGrupoModalidadeMusicoComponent = /** @class */ (function () {
    function DialogPessoaGrupoModalidadeMusicoComponent(dialogRef, data, _notifierService, _emitirEventoService, _service) {
        this.dialogRef = dialogRef;
        this.data = data;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._service = _service;
        this.modalidades = new Array();
        this.modalidadesPessoa = new Array();
    }
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        this.getModalidades();
        this.setModalidadePessoa();
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.getModalidades = function () {
        var _this = this;
        this.data.modalidades.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (map) {
            console.log(map);
            _this.modalidades = map;
        });
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.setModalidadePessoa = function () {
        if (this.data.modalidadesPessoa && this.data.modalidadesPessoa.length > 0) {
            this.modalidadesPessoa = this.data.modalidadesPessoa;
        }
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.adicionar = function () {
        if (!this.modalidade) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_4__["AlertType"].Error, "Por favor escolha um cargo.!");
            return false;
        }
        this.modalidadesPessoa.push(this.modalidade);
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.remover = function (item, i) {
        var _this = this;
        var obj = {
            id: this.data.grupoId,
            pessoaId: this.data.id,
            modalidadeId: item.id
        };
        this._service.removerPessoaModalidade(obj).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (item) {
            _this.modalidadesPessoa.splice(i, 1);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_4__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_4__["AlertType"].Error, "Item removido com sucesso");
        });
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.setEmiter = function () {
        var obj = {
            id: this.data.id,
            modalidades: this.modalidadesPessoa
        };
        this._emitirEventoService.emitir("dialog-pessoa-modalidade", obj);
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    DialogPessoaGrupoModalidadeMusicoComponent.prototype.confirmar = function () {
        this.setEmiter();
        this.close();
    };
    DialogPessoaGrupoModalidadeMusicoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-pessoa-grupo-modalidade-musico',
            template: __webpack_require__(/*! ./dialog-pessoa-grupo-modalidade-musico.component.html */ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.html"),
            styles: [__webpack_require__(/*! ./dialog-pessoa-grupo-modalidade-musico.component.scss */ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, angular_notifier__WEBPACK_IMPORTED_MODULE_3__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_5__["EmitirEventoService"],
            _service_grupo_service__WEBPACK_IMPORTED_MODULE_6__["GrupoService"]])
    ], DialogPessoaGrupoModalidadeMusicoComponent);
    return DialogPessoaGrupoModalidadeMusicoComponent;
}());



/***/ }),

/***/ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.module.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.module.ts ***!
  \********************************************************************************************************************/
/*! exports provided: DialogPessoaGrupoModalidadeMusicoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogPessoaGrupoModalidadeMusicoModule", function() { return DialogPessoaGrupoModalidadeMusicoModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dialog_pessoa_grupo_modalidade_musico_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog-pessoa-grupo-modalidade-musico.component */ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DialogPessoaGrupoModalidadeMusicoModule = /** @class */ (function () {
    function DialogPessoaGrupoModalidadeMusicoModule() {
    }
    DialogPessoaGrupoModalidadeMusicoModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"]
            ],
            declarations: [
                _dialog_pessoa_grupo_modalidade_musico_component__WEBPACK_IMPORTED_MODULE_2__["DialogPessoaGrupoModalidadeMusicoComponent"]
            ],
            entryComponents: [
                _dialog_pessoa_grupo_modalidade_musico_component__WEBPACK_IMPORTED_MODULE_2__["DialogPessoaGrupoModalidadeMusicoComponent"]
            ]
        })
    ], DialogPessoaGrupoModalidadeMusicoModule);
    return DialogPessoaGrupoModalidadeMusicoModule;
}());



/***/ }),

/***/ "./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span><i class=\"material-icons\">add</i></span>\r\n      <h1 class=\"mat-headline center-align\">Grupo de Trabalho</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n          <br />\r\n          <form form [formGroup]=\"form\">\r\n            <div class=\"full-width-field\" fxLayoutGap=\"20px\" fxLayout.lt-sm=\"column\"  *ngIf=\"!isEditar\">\r\n              <mat-radio-group  formControlName=\"radio\" (change)=\"changeRadio()\" >\r\n                <mat-radio-button   value=\"1\" >Grupo</mat-radio-button>\r\n                <mat-radio-button   value=\"2\" >Sub Grupo</mat-radio-button>\r\n              </mat-radio-group>\r\n            </div>\r\n            <div>\r\n              <mat-form-field class=\"full-width-field\">\r\n                <input matInput placeholder=\"Nome\" formControlName=\"nome\" id=\"nome\" style=\"text-transform: uppercase;\" required>\r\n                <mat-error *ngIf=\"!form.controls.nome.valid\">Campo Obrigatório</mat-error>\r\n              </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"!subGrupo\">\r\n              <mat-form-field class=\"full-width-field\"  >\r\n                <mat-label>Tipo de Grupos de Trabalho</mat-label>\r\n                <mat-select id=\"tipo\" formControlName=\"tipo\">\r\n                  <mat-option *ngFor=\"let item of tipoGrupo$| async\" [value]=\"item.id\" (onSelectionChange)=\"onSelectionChanged(item.nome)\" >\r\n                    {{item.nome}}\r\n                  </mat-option>\r\n                </mat-select>\r\n                <mat-error *ngIf=\"!form.controls.tipo.valid\">Campo Obrigatório</mat-error>\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"full-width-field\" >\r\n              <mat-form-field>\r\n                <input matInput [matDatepicker]=\"picker\" placeholder=\"Data de Abertura\" formControlName=\"dataAbertura\"\r\n                required readonly>\r\n                <mat-error *ngIf=\"!form.controls.dataAbertura.valid\">Campo Obrigatório</mat-error>\r\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                <mat-datepicker #picker></mat-datepicker>\r\n              </mat-form-field>\r\n            </div>\r\n            <div>\r\n              <mat-form-field class=\"full-width-field\">\r\n                <textarea matInput placeholder=\"Descrição\" formControlName=\"descricao\"></textarea>\r\n                <mat-error *ngIf=\"!form.controls.descricao.valid\">Campo Obrigatório</mat-error>\r\n              </mat-form-field>\r\n            </div>\r\n          </form>\r\n          <app-igrejas></app-igrejas>\r\n          <div *ngIf=\"subGrupo\">\r\n            <mat-form-field class=\"full-width-field\">\r\n              <input type=\"text\" aria-label=\"Number\" placeholder=\"Grupos Trabalho\" matInput [formControl]=\"myControlGrupos\" [matAutocomplete]=\"aut\"\r\n                [(ngModel)]=\"grupoValue\" required>\r\n              <mat-autocomplete #aut=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let option of filteredGrupos | async\" [value]=\"option.nome\"\r\n                  (onSelectionChange)=\"onSelectionChangedGrupos($event,option)\">\r\n                  {{option.nome}}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n            </mat-form-field>\r\n          </div>\r\n      <div>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" class=\"default-font-color\">\r\n          <i class=\"material-icons\">face</i>\r\n          <h1 class=\"mat-subheading-2 center-align\">Membros</h1>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" >\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" aria-label=\"Number\" placeholder=\"Membros\" matInput [formControl]=\"myControlMembro\" [matAutocomplete]=\"auto\"\r\n            [(ngModel)]=\"membroValue\" required>\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredMembro | async\" [value]=\"option.nomeCompleto\"\r\n              (onSelectionChange)=\"onSelectionChangedMembro($event,option)\">\r\n              {{option.nomeCompleto}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n          <mat-label>Selecione...</mat-label>\r\n          <mat-select id=\"comboTipopessoa\" [(ngModel)]=\"tipoPessoa\">\r\n            <mat-option *ngFor=\"let item of comboTipoPessoa\" [value]=\"item\">\r\n              {{item.nome}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"adicionarMembro()\">\r\n          <i class=\"material-icons\">add</i>adicionar</button>\r\n      </div>\r\n      <br />\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" *ngIf=\"membros.length > 0\">\r\n        <div class=\"table-responsive\">\r\n          <table>\r\n            <thead class=\"text-primary\">\r\n              <th></th>\r\n              <th>Nome</th>\r\n              <th></th>\r\n              <th>Remover</th>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of membros;let i= index\">\r\n                <td>{{ i+1}}</td>\r\n                <td>{{ item.nomeCompleto}}</td>\r\n                <td>{{ item.tipo}}</td>\r\n                <td>\r\n                  <span *ngIf=\"isLouvor\" style=\"color: #1d68a5;cursor: pointer\" (click)=\"dialogPessoaGrupoModalidadeMusico(item)\">\r\n                    <i class=\"material-icons\">music_video</i>\r\n                  </span>\r\n                  <span style=\"color: #1d68a5;cursor: pointer\" (click)=\"dialogRemover(i,item)\">\r\n                    <i class=\"material-icons\">delete</i>\r\n                  </span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"salvar()\">\r\n          <i class=\"material-icons\">save</i>Salvar</button>\r\n        <div fxFlex></div>\r\n        <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"voltar()\">\r\n          <i class=\"material-icons\">reply</i>Voltar</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.ts ***!
  \********************************************************************/
/*! exports provided: CadastrarGrupoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastrarGrupoComponent", function() { return CadastrarGrupoComponent; });
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../service/membro.service */ "./src/app/service/membro.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _service_tipo_grupo_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/tipo-grupo.service */ "./src/app/service/tipo-grupo.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_grupo_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/grupo.service */ "./src/app/service/grupo.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dialog_dialog_pessoa_grupo_modalidade_musico_dialog_pessoa_grupo_modalidade_musico_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component */ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.component.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var CadastrarGrupoComponent = /** @class */ (function () {
    function CadastrarGrupoComponent(_tipoGrupoService, _membroService, _notifierService, _emitirEventoService, _serviceGruop, _datePipe, _router, _avRoute, _dateAdapter, _dialog) {
        this._tipoGrupoService = _tipoGrupoService;
        this._membroService = _membroService;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._serviceGruop = _serviceGruop;
        this._datePipe = _datePipe;
        this._router = _router;
        this._avRoute = _avRoute;
        this._dateAdapter = _dateAdapter;
        this._dialog = _dialog;
        this.comboTipoPessoa = [];
        this.pesquisa = false;
        this.subGrupo = false;
        this.membros = [];
        this.myControlMembro = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.comboMembro = [];
        this.myControlGrupos = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.comboGrupos = [];
        this.isLouvor = false;
        this.isEditar = false;
    }
    CadastrarGrupoComponent.prototype.ngOnInit = function () {
        this._dateAdapter.setLocale("br");
        this.preencherComboTipoPessoa();
        this._buildForm();
        this.carregarTiposGruposTrabalho();
        this.getEmiter();
        this.getParams();
    };
    CadastrarGrupoComponent.prototype.preencherComboTipoPessoa = function () {
        this.comboTipoPessoa = [];
        this.comboTipoPessoa.push({ id: 'LIDER', nome: 'Líder' });
        this.comboTipoPessoa.push({ id: 'COLIDER', nome: 'Co-Líder' });
    };
    CadastrarGrupoComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'tipo': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'descricao': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            'radio': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('1'),
            'dataAbertura': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    };
    CadastrarGrupoComponent.prototype.carregarTiposGruposTrabalho = function () {
        this.tipoGrupo$ = this._tipoGrupoService.getList();
    };
    CadastrarGrupoComponent.prototype.carregarMembro = function (id) {
        var _this = this;
        this._membroService.getMembroIgreja(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.comboMembro = item;
            _this.filteredMembro = _this.myControlMembro.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterMembros(value, _this.comboMembro); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    CadastrarGrupoComponent.prototype._filterMembros = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarGrupoComponent.prototype.carregarGrupos = function (id) {
        var _this = this;
        this._serviceGruop.getGruposByIgrejas(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.comboGrupos = item;
            _this.filteredGrupos = _this.myControlGrupos.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterGrupos(value, _this.comboGrupos); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    CadastrarGrupoComponent.prototype._filterGrupos = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarGrupoComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'igreja-comp') {
                _this.igrejaSelecionada = item.data;
                _this.carregarMembro(_this.igrejaSelecionada.id);
                _this.carregarGrupos({ igreja: { id: _this.igrejaSelecionada.id } });
            }
            if (item.type == 'dialog-pessoa-modalidade') {
                _this.membros.forEach(function (element) {
                    if (element.id == item.data.id) {
                        element.modalidades = item.data.modalidades;
                    }
                });
            }
            if (item.type == 'confirm-dialog-pessoa-grupoTrabalho') {
                _this.membros.splice(item.data, 1);
            }
        });
    };
    CadastrarGrupoComponent.prototype.onSelectionChangedMembro = function ($event, option) {
        this.membroSelecionado = option;
    };
    CadastrarGrupoComponent.prototype.adicionarMembro = function () {
        var _this = this;
        if (!this.membroSelecionado) {
            console.log(this.membroSelecionado);
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor escolha uma membro.!");
            return false;
        }
        if (!this.tipoPessoa) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor escola um tipo de pessoa.!");
            return false;
        }
        var membroAdicionado = this.membros.find(function (i) { return i.nome == _this.membroSelecionado.nome; });
        if (membroAdicionado && membroAdicionado.nome == this.membroSelecionado.nome) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Membro já adiocionado.!");
            return false;
        }
        this.membroSelecionado.tipo = this.tipoPessoa.id;
        this.membroSelecionado.tipoNome = this.tipoPessoa.nome;
        this.membros.push(this.membroSelecionado);
    };
    CadastrarGrupoComponent.prototype.salvar = function () {
        if (this.id) {
            this.update();
        }
        else {
            this.save();
        }
    };
    CadastrarGrupoComponent.prototype.save = function () {
        var _this = this;
        // console.log(this.obj());
        if (!this.validField()) {
            return;
        }
        this._serviceGruop.save(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.voltar();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao salvar o grupo de trabalho!");
        });
    };
    CadastrarGrupoComponent.prototype.update = function () {
        var _this = this;
        console.log(this.obj());
        if (!this.validField()) {
            return;
        }
        this._serviceGruop.update(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.voltar();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Success, item.value);
        }, function (error) {
            console.log(error);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.error.errors);
        });
    };
    CadastrarGrupoComponent.prototype.obj = function () {
        var obj = {};
        obj.nome = this.form.controls['nome'].value;
        obj.descricao = this.form.controls['descricao'].value;
        obj.tipo = this.getTipoSelecionado();
        obj.grupo = this.getGrupoSelecionado();
        obj.dataAbertura = this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy');
        if (this.membros.length > 0) {
            obj.membros = this.membros;
        }
        if (this.igrejaSelecionada) {
            obj.igreja = { id: this.igrejaSelecionada.id, visaoCelular: this.igrejaSelecionada.visaoCelular };
        }
        if (this.id) {
            obj.id = this.id;
        }
        return obj;
    };
    CadastrarGrupoComponent.prototype.getTipoSelecionado = function () {
        if (!this.form.controls['tipo'].value) {
            return null;
        }
        else {
            return { id: this.form.controls['tipo'].value };
        }
    };
    CadastrarGrupoComponent.prototype.getGrupoSelecionado = function () {
        if (!this.grupoSelecionado) {
            return null;
        }
        else {
            return { id: this.grupoSelecionado.id };
        }
    };
    CadastrarGrupoComponent.prototype.validField = function () {
        if (!this.form.controls['nome'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor preencha o campo Nome");
            return false;
        }
        if (this.membros.length == 0) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor adicione pelo menos um Membro");
            return false;
        }
        if (!this.igrejaSelecionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor selecione uma igreja!");
            return false;
        }
        if (!this.form.controls['tipo'].value && !this.subGrupo) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor escolha um Tipo de grupo de Trabalho!");
            return false;
        }
        if (!this.form.controls['dataAbertura'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor digita a Data de Abertura!");
            return false;
        }
        if (!this.grupoSelecionado && this.subGrupo) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor selecione um grupo de trabalho!");
            return false;
        }
        return true;
    };
    CadastrarGrupoComponent.prototype.voltar = function () {
        this._router.navigate(['/auth/grupo/pesquisar'], {
            queryParams: {
                pesquisar: this.pesquisa
            },
            skipLocationChange: true
        });
    };
    CadastrarGrupoComponent.prototype.onSelectionChangedGrupos = function ($event, option) {
        this.grupoSelecionado = option;
        if (this.grupoSelecionado.tipo && this.grupoSelecionado.tipo.nome == 'Louvor') {
            this.isLouvor = true;
        }
        else {
            this.isLouvor = false;
        }
    };
    CadastrarGrupoComponent.prototype.getParams = function () {
        console.log('teste');
        if (this._avRoute.snapshot.queryParamMap.get("id")) {
            this.id = this._avRoute.snapshot.queryParamMap.get("id");
            this.pesquisa = true;
            this.isEditar = true;
            this.getGrupo(this.id);
        }
        if (this._avRoute.snapshot.queryParamMap.get("isSubGrupo")) {
            var isSubGrupo = this._avRoute.snapshot.queryParamMap.get("isSubGrupo");
            if (isSubGrupo == "true") {
                this.subGrupo = true;
                this.comboTipoPessoa.push({ id: 'MEMBRO', nome: 'Membro' });
            }
        }
    };
    CadastrarGrupoComponent.prototype.getGrupo = function (id) {
        var _this = this;
        this._serviceGruop.getGrupo(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            console.log(item);
            _this.form.controls['nome'].patchValue(item.nome);
            _this.form.controls['descricao'].patchValue(item.descricao);
            _this.form.controls['dataAbertura'].patchValue(new Date(item.dataAberturaToDate));
            if (item.tipo) {
                _this.form.controls['tipo'].patchValue(item.tipo.id);
                if (item.tipo.nome === 'Louvor') {
                    _this.isLouvor = true;
                }
            }
            if (item.membros) {
                _this.membros = item.membros;
            }
            if (item.isSubGrupo) {
                _this.form.controls['radio'].patchValue('2');
                _this.subGrupo = true;
                _this.grupoSelecionado = item.grupo;
                _this.grupoValue = item.grupo.nome;
            }
            else {
                _this.form.controls['radio'].patchValue('1');
                _this.subGrupo = false;
            }
            if (item.igreja) {
                _this.igrejaSelecionada = item.igreja;
                _this.setEmiterIgreja();
            }
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.errors.message);
        });
    };
    CadastrarGrupoComponent.prototype.setEmiterIgreja = function () {
        this._emitirEventoService.emitir("edit-igreja", this.igrejaSelecionada);
    };
    CadastrarGrupoComponent.prototype.changeRadio = function () {
        // console.log(this.form.controls['radio'].value);
        if (this.form.controls['radio'].value == '2') {
            this.subGrupo = true;
            this.comboTipoPessoa.push({ id: 'MEMBRO', nome: 'Membro' });
        }
        else {
            this.subGrupo = false;
        }
    };
    CadastrarGrupoComponent.prototype.dialogPessoaGrupoModalidadeMusico = function (item) {
        console.log(item);
        var dialogRef = this._dialog.open(_dialog_dialog_pessoa_grupo_modalidade_musico_dialog_pessoa_grupo_modalidade_musico_component__WEBPACK_IMPORTED_MODULE_12__["DialogPessoaGrupoModalidadeMusicoComponent"], {
            width: '600px',
            data: {
                id: item.id,
                grupoId: Number.parseInt(this.id),
                modalidades: this._serviceGruop.getModalidade(),
                modalidadesPessoa: item.modalidades
            }
        });
    };
    CadastrarGrupoComponent.prototype.onSelectionChanged = function (nome) {
        if (nome == 'Louvor') {
            this.isLouvor = true;
        }
        else {
            this.isLouvor = false;
        }
    };
    CadastrarGrupoComponent.prototype.dialogRemover = function (i, item) {
        var dialogRef = this._dialog.open(_dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_13__["DialogConfirmPessoaComponent"], {
            width: '600px',
            data: {
                id: Number.parseInt(this.id),
                idPessoa: item.id,
                controller: "grupoTrabalho",
                item: i
            }
        });
    };
    CadastrarGrupoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cadastrar-grupo',
            template: __webpack_require__(/*! ./cadastrar-grupo.component.html */ "./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.html"),
            styles: [__webpack_require__(/*! ./cadastrar-grupo.component.scss */ "./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_tipo_grupo_service__WEBPACK_IMPORTED_MODULE_3__["TipoGrupoService"],
            _service_membro_service__WEBPACK_IMPORTED_MODULE_0__["MembroService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__["EmitirEventoService"],
            _service_grupo_service__WEBPACK_IMPORTED_MODULE_9__["GrupoService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_11__["DatePipe"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"],
            _angular_material__WEBPACK_IMPORTED_MODULE_8__["DateAdapter"],
            _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialog"]])
    ], CadastrarGrupoComponent);
    return CadastrarGrupoComponent;
}());



/***/ }),

/***/ "./src/app/pages/grupo/grupo.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/grupo/grupo.module.ts ***!
  \*********************************************/
/*! exports provided: GrupoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrupoModule", function() { return GrupoModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pesquisar_pesquisar_grupo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pesquisar/pesquisar-grupo.component */ "./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.ts");
/* harmony import */ var _cadastrar_cadastrar_grupo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cadastrar/cadastrar-grupo.component */ "./src/app/pages/grupo/cadastrar/cadastrar-grupo.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../componentes/igrejas/igreja-compenent.module */ "./src/app/pages/componentes/igrejas/igreja-compenent.module.ts");
/* harmony import */ var _componentes_membro_membro_component_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../componentes/membro/membro-component.module */ "./src/app/pages/componentes/membro/membro-component.module.ts");
/* harmony import */ var _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../pipes/pipe.module */ "./src/app/pipes/pipe.module.ts");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.module.ts");
/* harmony import */ var _dialog_dialog_pessoa_grupo_modalidade_musico_dialog_pessoa_grupo_modalidade_musico_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.module */ "./src/app/pages/dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.module.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var routes = [
    { path: 'cadastrar', component: _cadastrar_cadastrar_grupo_component__WEBPACK_IMPORTED_MODULE_3__["CadastrarGrupoComponent"], data: { animation: 'buttons' } },
    { path: 'pesquisar', component: _pesquisar_pesquisar_grupo_component__WEBPACK_IMPORTED_MODULE_2__["PesquisarGrupoComponent"], data: { animation: 'buttons' } }
];
var GrupoModule = /** @class */ (function () {
    function GrupoModule() {
    }
    GrupoModule = __decorate([
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
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatOptionModule"],
                _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_8__["IgrejasComponentModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
                _componentes_membro_membro_component_module__WEBPACK_IMPORTED_MODULE_9__["MembroComponentModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_10__["PipeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSlideToggleModule"],
                _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_11__["DialogAtivarInativarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                _dialog_dialog_pessoa_grupo_modalidade_musico_dialog_pessoa_grupo_modalidade_musico_module__WEBPACK_IMPORTED_MODULE_12__["DialogPessoaGrupoModalidadeMusicoModule"],
                _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_13__["DialogConfirmPessoaModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _pesquisar_pesquisar_grupo_component__WEBPACK_IMPORTED_MODULE_2__["PesquisarGrupoComponent"],
                _cadastrar_cadastrar_grupo_component__WEBPACK_IMPORTED_MODULE_3__["CadastrarGrupoComponent"]
            ]
        })
    ], GrupoModule);
    return GrupoModule;
}());



/***/ }),

/***/ "./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span><i class=\"material-icons\">search</i></span>\r\n      <h1 class=\"mat-headline center-align\">Grupo de Trabalho</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"100px\">\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"cadastrar()\">\r\n          <i class=\"material-icons\">add</i>Novo</button>\r\n      </div>\r\n      <br/>\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\" style=\"width: 100%;\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (onSelectionChange)=\"onSelectionChange($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        </div >\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Status</mat-label>\r\n          <mat-select [(ngModel)]=\"statusValue\" id=\"status\">\r\n            <mat-option *ngFor=\"let item of comboStatus\" [value]=\"item.codigo\" (click)=\"onSelection()\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <div [hidden]=\"grupos.length == 0\">\r\n        <form form [formGroup]=\"form\">\r\n          <div [hidden]=\"check\">\r\n            <label style=\"color:#1d68a5\">Agrupar por Grupo?</label>\r\n            <mat-slide-toggle id=\"agrupar\" formControlName=\"group\" (change)=\"changeAgrupar(agrupar.checked)\" #agrupar>\r\n              {{agrupar.checked | boolean : ['Sim', 'Não']}}</mat-slide-toggle>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <br />\r\n      <div *ngIf=\"grupos.length > 0\" >\r\n      <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n        <input placeholder=\"Filtrar\" aria-label=\"Number\" matInput [formControl]=\"myControl\">\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"table-responsive\" *ngIf=\"agrupar.checked\" style=\"overflow: auto; height: 300px;\">\r\n      <table>\r\n        <thead class=\"text-primary\">\r\n          <th>Sub Grupo</th>\r\n          <th>Nome</th>\r\n          <th>Líder</th>\r\n          <th>Tipo de grupo</th>\r\n          <th></th>\r\n        </thead>\r\n        <tbody *ngFor=\"let g of filteredGrupos | async\">\r\n          <tr style=\"background-color: #5C6BC0;color: white;\">\r\n            <td>{{g.isSubGrupo | boolean : ['Sim', 'Não']}}</td>\r\n            <td>{{g.nome}}</td>\r\n            <td>{{g.lider}}</td>\r\n            <td>{{g.tipo?.nome}}</td>\r\n            <td><span matTooltip=\"Editar\" style=\"cursor: pointer;color:white\" (click)=\"editar(g.id,g.isSubGrupo)\"><i\r\n                  class=\"material-icons\">create</i></span>\r\n              <span matTooltip=\"Inativar\" style=\"cursor: pointer;color:white\" (click)=\"dialogStatus(g.id)\"><i\r\n                  class=\"material-icons\">settings</i></span>\r\n            </td>\r\n          </tr>\r\n\r\n          <tr *ngFor=\"let s of g.subGrupos\">\r\n            <td>{{s.isSubGrupo | boolean : ['Sim', 'Não']}}</td>\r\n            <td>{{s.nome}}</td>\r\n            <td>{{s.lider}}</td>\r\n            <td>{{g.tipo?.nome}}</td>\r\n            <td><span matTooltip=\"Editar\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"editar(s.id,s.isSubGrupo)\"><i\r\n                  class=\"material-icons\">create</i></span>\r\n              <span matTooltip=\"Excluir\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"dialogStatus(s.id)\"><i\r\n                  class=\"material-icons\">settings</i></span>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <div class=\"table-responsive\" *ngIf=\"!agrupar.checked && grupos.length > 0\"  style=\"overflow: auto; height: 300px;\">\r\n      <table>\r\n        <thead class=\"text-primary\">\r\n          <th>Sub Grupo</th>\r\n          <th>Nome</th>\r\n          <th>Líder</th>\r\n          <th>Tipo de grupo</th>\r\n          <th></th>\r\n        </thead>\r\n        <tbody *ngFor=\"let item of filteredGrupos | async\">\r\n          <tr>\r\n            <td>{{item.isSubGrupo | boolean : ['Sim', 'Não']}}</td>\r\n            <td>{{item.nome}}</td>\r\n            <td>{{item.lider}}</td>\r\n            <td>{{item.tipo?.nome}}</td>\r\n            <td><span matTooltip=\"Editar\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"editar(item.id,item.isSubGrupo)\"><i\r\n                  class=\"material-icons\">create</i></span>\r\n              <span matTooltip=\"Excluir\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"dialogStatus(item.id)\"><i\r\n                  class=\"material-icons\">settings</i></span>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <br />\r\n      <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\" *ngIf=\"!agrupar.checked\"><i\r\n        class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n    </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.ts ***!
  \********************************************************************/
/*! exports provided: PesquisarGrupoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PesquisarGrupoComponent", function() { return PesquisarGrupoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _service_grupo_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/grupo.service */ "./src/app/service/grupo.service.ts");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.component.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _helper_helper_church__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../helper/helper.church */ "./src/app/helper/helper.church.ts");
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
];
var PesquisarGrupoComponent = /** @class */ (function () {
    function PesquisarGrupoComponent(_notifierService, _router, _dialog, _emitirEventoService, _avRoute, _excelService, _serviceGruop, _igrejaService) {
        this._notifierService = _notifierService;
        this._router = _router;
        this._dialog = _dialog;
        this._emitirEventoService = _emitirEventoService;
        this._avRoute = _avRoute;
        this._excelService = _excelService;
        this._serviceGruop = _serviceGruop;
        this._igrejaService = _igrejaService;
        this.comboStatus = ELEMENT_DATA;
        this.check = false;
        this.grupos = [];
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
    }
    PesquisarGrupoComponent.prototype.ngOnInit = function () {
        this.carregarIgrejas();
        this._buildForm();
        this.getEmiter();
        this.getParams();
    };
    PesquisarGrupoComponent.prototype.cadastrar = function () {
        // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
        this._router.navigate(['/auth/grupo/cadastrar']);
    };
    PesquisarGrupoComponent.prototype.carregarIgrejas = function () {
        var _this = this;
        this._igrejaService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejas = item;
            // console.log(item);
            _this.filteredIgreja = _this.myControlIgreja.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (value) { return _this._filterIgreja(value, _this.comboIgrejas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro ao carregar igrejas sede!");
        });
    };
    PesquisarGrupoComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    PesquisarGrupoComponent.prototype.onSelectionChange = function ($event, option) {
        this.igrejaSelecionada = option;
        this.carregarLista();
    };
    PesquisarGrupoComponent.prototype.carregarLista = function () {
        this.setObj();
        if (this.form.controls['group'].value) {
            this.carregarGruposGroupBy();
        }
        else {
            this.carregarGrupos();
        }
    };
    PesquisarGrupoComponent.prototype.carregarGrupos = function () {
        var _this = this;
        this._serviceGruop.getGruposByIgrejas(this.setObj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.grupos = item;
            _this.filteredGrupos = _this.myControl.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (value) { return _this._filter(value); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro ao carregar os grupos!");
        });
    };
    PesquisarGrupoComponent.prototype.carregarGruposGroupBy = function () {
        var _this = this;
        this._serviceGruop.findGruposTrabalhoESubByIgreja(this.setObj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.grupos = item;
            _this.filteredGrupos = _this.myControl.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (value) { return _this._filter(value); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro ao carregar os grupos!");
        });
    };
    PesquisarGrupoComponent.prototype.setObj = function () {
        return {
            status: _helper_helper_church__WEBPACK_IMPORTED_MODULE_12__["HelperChurch"].isNull(this.statusSelecionado),
            igreja: this.getIgrejaSelecionada()
        };
    };
    PesquisarGrupoComponent.prototype.getIgrejaSelecionada = function () {
        if (!this.igrejaSelecionada) {
            return null;
        }
        else {
            return { id: this.igrejaSelecionada.id };
        }
    };
    PesquisarGrupoComponent.prototype._filter = function (value) {
        // console.log(value)
        var filterValue = value.toLowerCase();
        return this.grupos.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    PesquisarGrupoComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            'group': new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](false),
        });
    };
    PesquisarGrupoComponent.prototype.changeAgrupar = function (agrupar) {
        this.setObj();
        if (this.igrejaSelecionada && agrupar) {
            this.carregarGruposGroupBy();
        }
        else {
            this.carregarGrupos();
        }
    };
    PesquisarGrupoComponent.prototype.exportAsXLSX = function () {
        var dados = [];
        this.grupos.forEach(function (i) {
            dados.push({
                "Sub Grupo": i.isSubGrupo ? "Sim" : "Não",
                "Nome": i.nome,
                "Líder": i.lider,
                "Tipo de Grupo": i.tipo.nome,
            });
        });
        this._excelService.exportAsExcelFile(dados, "pesquisa");
    };
    PesquisarGrupoComponent.prototype.getListForStatus = function (status) {
        var _this = this;
        this._serviceGruop.getListForStatus(status).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.grupos = item;
            _this.filteredGrupos = _this.myControl.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(function (value) { return _this._filter(value); }));
        }, function (error) {
            console.log(error);
            // this._notifierService.notify(AlertType.Error, error.errors.message);
        });
    };
    PesquisarGrupoComponent.prototype.onSelection = function () {
        if (this.statusSelecionado == 'I') {
            this.form.controls['group'].patchValue(false);
            this.check = true;
            this.getListForStatus(this.statusSelecionado);
        }
        else {
            this.check = false;
            this.getListForStatus(this.statusSelecionado);
        }
    };
    PesquisarGrupoComponent.prototype.dialogStatus = function (id) {
        var dialogRef = this._dialog.open(_dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_10__["DialogAtivarInativarComponent"], {
            width: '600px',
            data: {
                id: id,
                controller: "grupoTrabalho"
            }
        });
    };
    PesquisarGrupoComponent.prototype.editar = function (id, isSubGrupo) {
        var obj = {
            status: this.statusSelecionado,
            igreja: this.igrejaSelecionada
        };
        localStorage.setItem("pesquisar", JSON.stringify(obj));
        this._router.navigate(['/auth/grupo/cadastrar'], {
            queryParams: {
                id: id,
                isSubGrupo: isSubGrupo
            },
            skipLocationChange: true
        });
    };
    PesquisarGrupoComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (obj) {
            if (obj.data == 'status') {
                _this.carregarLista();
            }
        });
    };
    PesquisarGrupoComponent.prototype.getParams = function () {
        // console.log(this._avRoute.snapshot.queryParamMap);
        if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
            var obj = JSON.parse(localStorage.getItem("pesquisar"));
            this.igrejaSelecionada = obj.igreja;
            this.statusSelecionado = obj.status;
            if (obj && obj.igreja) {
                if (this.igrejaSelecionada) {
                    this.igrejaValue = this.igrejaSelecionada.nome;
                }
            }
            if (obj && obj.status) {
                if (this.statusSelecionado) {
                    this.statusValue = this.statusSelecionado.codigo;
                }
            }
            localStorage.removeItem("pesquisar");
            this.carregarLista();
        }
    };
    PesquisarGrupoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pesquisar-grupo',
            template: __webpack_require__(/*! ./pesquisar-grupo.component.html */ "./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.html"),
            styles: [__webpack_require__(/*! ./pesquisar-grupo.component.scss */ "./src/app/pages/grupo/pesquisar/pesquisar-grupo.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_3__["NotifierService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_4__["EmitirEventoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_5__["ExcelService"],
            _service_grupo_service__WEBPACK_IMPORTED_MODULE_7__["GrupoService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_11__["IgrejaService"]])
    ], PesquisarGrupoComponent);
    return PesquisarGrupoComponent;
}());



/***/ }),

/***/ "./src/app/service/tipo-grupo.service.ts":
/*!***********************************************!*\
  !*** ./src/app/service/tipo-grupo.service.ts ***!
  \***********************************************/
/*! exports provided: TipoGrupoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoGrupoService", function() { return TipoGrupoService; });
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




var TipoGrupoService = /** @class */ (function () {
    function TipoGrupoService(http) {
        this.http = http;
        this._url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "tipoGrupoTrabalho/";
    }
    TipoGrupoService.prototype.getList = function () {
        return this.http.get(this._url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    TipoGrupoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TipoGrupoService);
    return TipoGrupoService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-grupo-grupo-module.js.map