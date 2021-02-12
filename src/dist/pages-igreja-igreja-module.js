(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-igreja-igreja-module"],{

/***/ "./src/app/pages/componentes/igreja-dados/igreja-dados.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/pages/componentes/igreja-dados/igreja-dados.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form form [formGroup]=\"form\">\r\n    <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n      <mat-form-field class=\"full-width-field\" >\r\n        <input matInput class=\"input-upper\" placeholder=\"Nome\" formControlName=\"nome\" id=\"nome\"  (change)=\"change()\"  required>\r\n        <mat-error *ngIf=\"!form.controls.nome.valid\">Campo Obrigatório</mat-error>\r\n      </mat-form-field>\r\n      <mat-form-field class=\"full-width-field\">\r\n        <input matInput placeholder=\"CNPJ\" [textMask]=\"{mask: maskCNPJ}\" formControlName=\"cnpj\" id=\"cnpj\" (change)=\"change()\" required>\r\n        <mat-error *ngIf=\"!form.controls.cnpj.valid\">Campo Obrigatório</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"full-width-field\" fxLayoutGap=\"20px\" fxLayout.lt-sm=\"column\"  >\r\n      <mat-radio-group  formControlName=\"radio\" (change)=\"changeRadio()\" >\r\n        <mat-radio-button   value=\"1\" >Sede</mat-radio-button>\r\n        <mat-radio-button   value=\"2\" >Filial</mat-radio-button>\r\n      </mat-radio-group>\r\n      <label style=\"color:#1d68a5\"  *ngIf=\"!filial\">Visão Célular?</label>\r\n      <mat-slide-toggle *ngIf=\"!filial\" formControlName=\"visaoCelular\" id=\"visaoCelular\"  (change)=\"change()\" #visaoCelular>{{visaoCelular.checked | boolean : ['Sim', 'Não']}}</mat-slide-toggle>\r\n    </div>\r\n    <br />\r\n    <div class=\"full-width-field\" >\r\n      <mat-form-field>\r\n        <input matInput [matDatepicker]=\"picker\" placeholder=\"Data de Abertura\" formControlName=\"dataAbertura\"\r\n        (dateChange)=\"change()\"  required readonly>\r\n        <mat-error *ngIf=\"!form.controls.dataAbertura.valid\">Campo Obrigatório</mat-error>\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <br/>\r\n    <br/>\r\n    <mat-divider></mat-divider>\r\n    <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" style=\"color:#1d68a5\">\r\n      <i class=\"material-icons\">face</i>\r\n      <h1 class=\"mat-subheading-2 center-align\">Lideres</h1>\r\n    </div>\r\n    <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Membros\" aria-label=\"Number\" matInput [formControl]=\"myControlMembro\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"nomeValue\" required>\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredMembro | async\" [value]=\"option.nomeCompleto\"\r\n              (onSelectionChange)=\"onSelectionChangedMembro($event,option)\">\r\n              {{option.nomeCompleto}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"adicionar()\">\r\n          <i class=\"material-icons\">add</i>adicionar</button>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" *ngIf=\"membros.length > 0\">\r\n        <div class=\"table-responsive\">\r\n          <table>\r\n            <thead class=\"text-primary\">\r\n              <th></th>\r\n              <th>Nome</th>\r\n              <th>Cpf</th>\r\n              <th>Remover</th>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let m of membros;let i= index\">\r\n                <td>{{ i+1}}</td>\r\n                <td>{{ m.nomeCompleto}}</td>\r\n                <td>{{ m.cpf}}</td>\r\n                <td><span style=\"color: #1d68a5;cursor: pointer\" (click)=\"dialogRemover(i,m)\"><i\r\n                      class=\"material-icons\">delete</i></span></td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n  </form>\r\n"

/***/ }),

/***/ "./src/app/pages/componentes/igreja-dados/igreja-dados.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/pages/componentes/igreja-dados/igreja-dados.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/componentes/igreja-dados/igreja-dados.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/pages/componentes/igreja-dados/igreja-dados.component.ts ***!
  \**************************************************************************/
/*! exports provided: IgrejaDadosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IgrejaDadosComponent", function() { return IgrejaDadosComponent; });
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/membro.service */ "./src/app/service/membro.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _helper_helper_church__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helper/helper.church */ "./src/app/helper/helper.church.ts");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var IgrejaDadosComponent = /** @class */ (function () {
    function IgrejaDadosComponent(_membroService, _notifierService, _emitirEventoService, _dialog, _dateAdapter, _datePipe) {
        this._membroService = _membroService;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._dialog = _dialog;
        this._dateAdapter = _dateAdapter;
        this._datePipe = _datePipe;
        this.maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
        this.maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,];
        this.myControlMembro = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.comboMembro = [];
        this.membros = [];
        this.filial = false;
    }
    IgrejaDadosComponent.prototype.ngOnInit = function () {
        this._dateAdapter.setLocale("br");
        this._buildForm();
        this.carregarComboMembro();
        this.getEmiter();
    };
    IgrejaDadosComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'cnpj': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'visaoCelular': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false),
            'radio': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('1'),
            'dataAbertura': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    };
    IgrejaDadosComponent.prototype.carregarComboMembro = function () {
        var _this = this;
        this._membroService.getListMembros().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            _this.comboMembro = item;
            _this.filteredMembro = _this.myControlMembro.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return _this._filter(value, _this.comboMembro); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    IgrejaDadosComponent.prototype._filter = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    IgrejaDadosComponent.prototype.onSelectionChangedMembro = function ($event, option) {
        console.log(option);
        this.membro = option;
    };
    IgrejaDadosComponent.prototype.setEmiter = function () {
        // console.log(this.carregarObjeto());
        this._emitirEventoService.emitir("dadosIgreja", this.carregarObjeto());
    };
    IgrejaDadosComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            // console.log(item);
            if (item.type == 'clear') {
                _this.form.reset();
                _this.nomeValue = "";
                _this.membros = [];
            }
            if (item.type == 'edit-dadosIgreja') {
                if (item.data) {
                    console.log(item.data);
                    for (var i = 0; i < item.data.pessoas.length; i++) {
                        var pessoa = {};
                        pessoa.idIgreja = item.data.id;
                        pessoa.id = item.data.pessoas[i].id;
                        pessoa.nomeCompleto = item.data.pessoas[i].nomeCompleto;
                        pessoa.cpf = item.data.pessoas[i].cpf;
                        _this.membros.push(pessoa);
                    }
                }
                _this.form.controls['nome'].patchValue(item.data.nome);
                _this.form.controls['cnpj'].patchValue(item.data.cnpj);
                _this.form.controls['visaoCelular'].patchValue(item.data.visaoCelular);
                _this.form.controls['dataAbertura'].patchValue(new Date(item.data.dataAberturaToDate));
                if (item.data.sede) {
                    _this.form.controls['radio'].patchValue('2');
                    _this.filial = true;
                }
                else {
                    _this.form.controls['radio'].patchValue('1');
                    _this.filial = false;
                }
            }
            if (item.type == 'confirm-dialog-pessoa-sede' || item.type == 'confirm-dialog-pessoa-filial') {
                _this.membros.splice(item.data, 1);
                _this.setEmiter();
            }
        });
    };
    IgrejaDadosComponent.prototype.carregarObjeto = function () {
        var igreja = {};
        igreja.nome = this.form.controls['nome'].value;
        igreja.cnpj = _helper_helper_church__WEBPACK_IMPORTED_MODULE_6__["HelperChurch"].retirarFormatacaoCNPJ(this.form.controls['cnpj'].value);
        igreja.membros = this.membros;
        igreja.visaoCelular = this.form.controls['visaoCelular'].value;
        igreja.dataAbertura = this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy');
        return igreja;
    };
    IgrejaDadosComponent.prototype.change = function () {
        // console.log('teste');
        this.setEmiter();
    };
    IgrejaDadosComponent.prototype.adicionar = function () {
        var _this = this;
        if (!this.membro) {
            console.log(this.membro);
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, "Por favor escolha uma membro.!");
            return false;
        }
        var membroAdicionado = this.membros.find(function (i) { return i.nome == _this.membro.nome; });
        if (membroAdicionado && membroAdicionado.nome == this.membro.nome) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, "Membro já adiocionado.!");
            return false;
        }
        this.membros.push(this.membro);
        this.setEmiter();
    };
    IgrejaDadosComponent.prototype.dialogRemover = function (i, item) {
        console.log(item);
        var dialogRef = this._dialog.open(_dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_9__["DialogConfirmPessoaComponent"], {
            width: '600px',
            data: {
                id: Number.parseInt(this.id),
                idPessoa: item.id,
                controller: this.tipoIgreja,
                item: i
            }
        });
    };
    IgrejaDadosComponent.prototype.changeRadio = function () {
        console.log(this.form.controls['radio'].value);
        if (this.form.controls['radio'].value == '2') {
            this.filial = true;
        }
        else {
            this.filial = false;
        }
        this.setEmiterRadio(this.filial);
    };
    IgrejaDadosComponent.prototype.setEmiterRadio = function (filial) {
        this._emitirEventoService.emitir("dadosIgrejaRadio", filial);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], IgrejaDadosComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Object)
    ], IgrejaDadosComponent.prototype, "tipoIgreja", void 0);
    IgrejaDadosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-igreja-dados',
            template: __webpack_require__(/*! ./igreja-dados.component.html */ "./src/app/pages/componentes/igreja-dados/igreja-dados.component.html"),
            styles: [__webpack_require__(/*! ./igreja-dados.component.scss */ "./src/app/pages/componentes/igreja-dados/igreja-dados.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_membro_service__WEBPACK_IMPORTED_MODULE_0__["MembroService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_4__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_8__["EmitirEventoService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"],
            _angular_common__WEBPACK_IMPORTED_MODULE_10__["DatePipe"]])
    ], IgrejaDadosComponent);
    return IgrejaDadosComponent;
}());



/***/ }),

/***/ "./src/app/pages/componentes/igreja-dados/igreja-dados.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/componentes/igreja-dados/igreja-dados.module.ts ***!
  \***********************************************************************/
/*! exports provided: IgrejaDadosModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IgrejaDadosModule", function() { return IgrejaDadosModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _igreja_dados_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./igreja-dados.component */ "./src/app/pages/componentes/igreja-dados/igreja-dados.component.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module.ts");
/* harmony import */ var _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../pipes/pipe.module */ "./src/app/pipes/pipe.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var IgrejaDadosModule = /** @class */ (function () {
    function IgrejaDadosModule() {
    }
    IgrejaDadosModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                angular2_text_mask__WEBPACK_IMPORTED_MODULE_5__["TextMaskModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_7__["DialogConfirmPessoaModule"],
                _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_8__["PipeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
            ],
            declarations: [
                _igreja_dados_component__WEBPACK_IMPORTED_MODULE_6__["IgrejaDadosComponent"]
            ],
            exports: [
                _igreja_dados_component__WEBPACK_IMPORTED_MODULE_6__["IgrejaDadosComponent"]
            ]
        })
    ], IgrejaDadosModule);
    return IgrejaDadosModule;
}());



/***/ }),

/***/ "./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.html":
/*!************************************************************************!*\
  !*** ./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span><i class=\"material-icons\">add</i></span>\r\n      <h1 class=\"mat-headline center-align\">Igreja</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <br />\r\n      <form form [formGroup]=\"form\">\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput class=\"input-upper\" placeholder=\"Nome\" formControlName=\"nome\" id=\"nome\" required>\r\n            <mat-error *ngIf=\"!form.controls.nome.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput placeholder=\"CNPJ\" [textMask]=\"{mask: maskCNPJ}\" formControlName=\"cnpj\" id=\"cnpj\" required>\r\n            <mat-error *ngIf=\"!form.controls.cnpj.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput [matDatepicker]=\"picker\" placeholder=\"Data de Abertura\" formControlName=\"dataAbertura\"\r\n              required readonly>\r\n            <mat-error *ngIf=\"!form.controls.dataAbertura.valid\">Campo Obrigatório</mat-error>\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker></mat-datepicker>\r\n          </mat-form-field>\r\n        </div>\r\n        <div class=\"full-width-field\" fxLayoutGap=\"20px\" fxLayout.lt-sm=\"column\"  >\r\n          <mat-radio-group  formControlName=\"radio\" (change)=\"changeRadio()\" >\r\n            <mat-radio-button   value=\"1\" >Sede</mat-radio-button>\r\n            <mat-radio-button   value=\"2\" >Filial</mat-radio-button>\r\n          </mat-radio-group>\r\n        </div>\r\n        <br />\r\n        <div class=\"full-width-field\" fxLayoutGap=\"20px\" fxLayout.lt-sm=\"column\"  >\r\n          <label style=\"color:#1d68a5\"  *ngIf=\"!filial\">Visão Célular?</label>\r\n          <mat-slide-toggle *ngIf=\"!filial\" formControlName=\"visaoCelular\" id=\"visaoCelular\"  #visaoCelular>{{visaoCelular.checked | boolean : ['Sim', 'Não']}}</mat-slide-toggle>\r\n        </div>\r\n      </form>\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\" *ngIf=\"filial\">\r\n          <input type=\"text\" placeholder=\"Igreja Sede\" aria-label=\"Number\" matInput [formControl]=\"myControlIgrejaSede\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgrejaSede | async\" [value]=\"option.nome\"\r\n              (onSelectionChange)=\"onSelectionChangedIgreja($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <br/>\r\n      <br/>\r\n      <mat-divider></mat-divider>\r\n      <br />\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" style=\"color:#1d68a5\">\r\n        <i class=\"material-icons\">face</i>\r\n        <h1 class=\"mat-subheading-2 center-align\">Lideres</h1>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Membros\" aria-label=\"Number\" matInput [formControl]=\"myControlMembro\"\r\n            [matAutocomplete]=\"aut\" [(ngModel)]=\"membroValue\">\r\n          <mat-autocomplete #aut=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredMembro | async\" [value]=\"option.nomeCompleto\"\r\n              (onSelectionChange)=\"onSelectionChangedMembro($event,option)\">\r\n              {{option.nomeCompleto}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"adicionar()\">\r\n          <i class=\"material-icons\">add</i>adicionar</button>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" *ngIf=\"membros.length > 0\">\r\n        <div class=\"table-responsive\">\r\n          <table>\r\n            <thead class=\"text-primary\">\r\n              <th></th>\r\n              <th>Nome</th>\r\n              <th>Cpf</th>\r\n              <th>Remover</th>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let m of membros;let i= index\">\r\n                <td>{{ i+1}}</td>\r\n                <td>{{ m.nomeCompleto}}</td>\r\n                <td>{{ m.cpf}}</td>\r\n                <td><span style=\"color: #1d68a5;cursor: pointer\" (click)=\"dialogRemover(i,m)\"><i\r\n                      class=\"material-icons\">delete</i></span></td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <mat-divider></mat-divider>\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" class=\"default-font-color\">\r\n        <i class=\"material-icons\">store_mall_directory</i>\r\n        <h1 class=\"mat-subheading-2 center-align\">Endereço</h1>\r\n      </div>\r\n      <app-endereco [tipoEndereco]=\"false\" [sizeLimitOne]=\"sizeLimitOne\" [associadoId]=\"id\"></app-endereco>\r\n      <br />\r\n      <br />\r\n      <mat-divider></mat-divider>\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" class=\"default-font-color\">\r\n        <i class=\"material-icons\">headset_mic</i>\r\n        <h1 class=\"mat-subheading-2 center-align\">Contatos</h1>\r\n      </div>\r\n      <app-contatos></app-contatos>\r\n      <br /><br />\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"salvar()\">\r\n          <i class=\"material-icons\">save</i>Salvar</button>\r\n        <div fxFlex></div>\r\n        <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"voltar()\">\r\n          <i class=\"material-icons\">reply</i>Voltar</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.ts ***!
  \**********************************************************************/
/*! exports provided: CadastrarIgrejaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastrarIgrejaComponent", function() { return CadastrarIgrejaComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _helper_helper_church__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../helper/helper.church */ "./src/app/helper/helper.church.ts");
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/membro.service */ "./src/app/service/membro.service.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var CadastrarIgrejaComponent = /** @class */ (function () {
    function CadastrarIgrejaComponent(_emitirEventoService, _service, _notifierService, _router, _avRoute, _membroService, _datePipe, _dateAdapter, _dialog) {
        this._emitirEventoService = _emitirEventoService;
        this._service = _service;
        this._notifierService = _notifierService;
        this._router = _router;
        this._avRoute = _avRoute;
        this._membroService = _membroService;
        this._datePipe = _datePipe;
        this._dateAdapter = _dateAdapter;
        this._dialog = _dialog;
        this.maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
        this.enderecos = [];
        // public myControlIgreja = new FormControl();
        this.comboIgrejaSede = [];
        this.myControlIgrejaSede = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.igreja = {};
        this.sizeLimitOne = true;
        this.filial = false;
        this.pesquisa = false;
        this.myControlMembro = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.comboMembro = [];
        this.membros = new Array();
    }
    CadastrarIgrejaComponent.prototype.ngOnInit = function () {
        this._dateAdapter.setLocale("br");
        this.getEmiter();
        this.carregarComboIgrejaSede();
        this.getParams();
        this.getEmiter();
        this._buildForm();
        this.carregarComboMembro();
    };
    CadastrarIgrejaComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'cnpj': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'visaoCelular': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false),
            'radio': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('1'),
            'dataAbertura': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    };
    CadastrarIgrejaComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            // console.log(item.data);
            // if (item.type == 'dadosIgreja') {
            //   this.dados = item.data;
            // }
            if (item.type == 'endereco') {
                _this.enderecos = item.data;
            }
            if (item.type == 'contatos') {
                _this.contatos = item.data;
            }
            if (item.type == 'dadosIgrejaRadio') {
                _this.filial = item.data;
            }
            if (item.type == 'confirm-dialog-pessoa-igreja') {
                if (_this.membros.length > 0) {
                    _this.membros.splice(item.data, 1);
                }
            }
        });
    };
    CadastrarIgrejaComponent.prototype.setEmiter = function (save) {
        if (save) {
            this._emitirEventoService.emitir("clear", "");
        }
        if (this.enderecos && !save) {
            this._emitirEventoService.emitir("edit-endereco", this.enderecos);
        }
        if (this.contatos && !save) {
            this._emitirEventoService.emitir("edit-contatos", this.contatos);
        }
    };
    CadastrarIgrejaComponent.prototype.getDadosIgreja = function () {
        this.igreja = {};
        this.igreja.nome = this.form.controls['nome'].value;
        this.igreja.cnpj = _helper_helper_church__WEBPACK_IMPORTED_MODULE_10__["HelperChurch"].retirarFormatacaoCNPJ(this.form.controls['cnpj'].value);
        this.igreja.membros = this.membros;
        this.igreja.visaoCelular = this.form.controls['visaoCelular'].value;
        this.igreja.dataAbertura = this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy');
        this.igreja.enderecos = this.enderecos;
        this.igreja.contatos = this.contatos;
        if (this.id) {
            this.igreja.id = this.id;
        }
        if (this.igrejaSelecionada) {
            this.igreja.sede = this.igrejaSelecionada;
        }
        console.log(this.igreja);
    };
    CadastrarIgrejaComponent.prototype.getParams = function () {
        if (this._avRoute.snapshot.queryParamMap.get("id")) {
            this.id = this._avRoute.snapshot.queryParamMap.get("id");
            this.pesquisa = true;
            this.getIgreja(this.id);
        }
    };
    CadastrarIgrejaComponent.prototype.salvar = function () {
        this.getDadosIgreja();
        if (!this.validFields()) {
            return;
        }
        if (this.id) {
            this.update();
        }
        else {
            this.save();
        }
    };
    CadastrarIgrejaComponent.prototype.save = function () {
        var _this = this;
        // console.log(this.igreja);
        this._service.save(this.igreja).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(function (item) {
            _this.voltar();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.message);
        });
    };
    CadastrarIgrejaComponent.prototype.carregarComboIgrejaSede = function () {
        var _this = this;
        this._service.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejaSede = item;
            // console.log(item);
            _this.filteredIgrejaSede = _this.myControlIgrejaSede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (value) { return _this._filter(value, _this.comboIgrejaSede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar igrejas sede!");
        });
    };
    CadastrarIgrejaComponent.prototype._filter = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarIgrejaComponent.prototype.onSelectionChangedIgreja = function ($event, option) {
        this.igrejaSelecionada = option;
    };
    CadastrarIgrejaComponent.prototype.voltar = function () {
        this._router.navigate(['/auth/igreja/pesquisar'], {
            queryParams: {
                pesquisa: this.pesquisa
            },
            skipLocationChange: true
        });
    };
    CadastrarIgrejaComponent.prototype.getIgreja = function (id) {
        var _this = this;
        this._service.getSede(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.carregarDados(item);
            _this.setEmiter(false);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.errors.message);
        });
    };
    CadastrarIgrejaComponent.prototype.carregarDados = function (item) {
        this.form.controls['nome'].patchValue(item.nome);
        this.form.controls['cnpj'].patchValue(item.cnpj);
        this.form.controls['visaoCelular'].patchValue(item.visaoCelular);
        this.form.controls['dataAbertura'].patchValue(new Date(item.dataAberturaToDate));
        if (item.membros) {
            this.membros = item.membros;
        }
        if (item.sede) {
            this.form.controls['radio'].patchValue('2');
            this.filial = true;
        }
        else {
            this.form.controls['radio'].patchValue('1');
            this.filial = false;
        }
        this.enderecos = item.enderecos;
        this.contatos = item.contatos;
        if (item.sede) {
            this.igrejaValue = item.sede.nome;
            this.igrejaSelecionada = item.sede;
            this.igrejaSelecionada = { id: item.sede.id };
            this.filial = true;
        }
    };
    CadastrarIgrejaComponent.prototype.update = function () {
        var _this = this;
        // console.log(this.igreja);
        this._service.update(this.igreja).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(function (item) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.message);
        });
    };
    CadastrarIgrejaComponent.prototype.validFields = function () {
        if (!this.igreja.nome) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Digite o nome da Igreja!");
            return false;
        }
        if (!this.igreja.cnpj) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Digite o CNPJ Igreja!");
            return false;
        }
        if (this.igreja.membros.length == 0) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Adicione os Líderes");
            return false;
        }
        if (this.igreja.enderecos.length == 0) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Adicione os Endereço");
            return false;
        }
        if (this.igreja.contatos.length == 0) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Adicione os Contatos");
            return false;
        }
        if (!this.igreja.dataAbertura) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Adicione a Data de abertura");
            return false;
        }
        if (!this.igrejaSelecionada && this.filial) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Selecione uma igreja!");
            return false;
        }
        return true;
    };
    CadastrarIgrejaComponent.prototype.changeRadio = function () {
        console.log(this.form.controls['radio'].value);
        if (this.form.controls['radio'].value == '2') {
            this.filial = true;
        }
        else {
            this.filial = false;
        }
    };
    CadastrarIgrejaComponent.prototype.onSelectionChangedMembro = function ($event, option) {
        console.log(option);
        this.membroSelecionado = option;
    };
    CadastrarIgrejaComponent.prototype.carregarComboMembro = function () {
        var _this = this;
        this._membroService.getListMembros().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["take"])(1)).subscribe(function (item) {
            _this.comboMembro = item;
            _this.filteredMembro = _this.myControlMembro.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (value) { return _this._filterMembro(value, _this.comboMembro); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    CadastrarIgrejaComponent.prototype._filterMembro = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarIgrejaComponent.prototype.adicionar = function () {
        var _this = this;
        if (!this.membroSelecionado) {
            console.log(this.membroSelecionado);
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor escolha uma membro.!");
            return false;
        }
        var membroAdicionado = this.membros.find(function (i) { return i.nome == _this.membroSelecionado.nome; });
        if (membroAdicionado && membroAdicionado.nome == this.membroSelecionado.nome) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Membro já adiocionado.!");
            return false;
        }
        this.membros.push(this.membroSelecionado);
        this.membroValue = '';
    };
    CadastrarIgrejaComponent.prototype.dialogRemover = function (i, item) {
        var dialogRef = this._dialog.open(_dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_12__["DialogConfirmPessoaComponent"], {
            width: '600px',
            data: {
                id: Number.parseInt(this.id),
                idPessoa: item.id,
                controller: "igreja",
                item: i
            }
        });
    };
    CadastrarIgrejaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cadastrar-igreja',
            template: __webpack_require__(/*! ./cadastrar-igreja.component.html */ "./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.html"),
            styles: [__webpack_require__(/*! ./cadastrar-igreja.component.scss */ "./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_4__["EmitirEventoService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_7__["IgrejaService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"],
            _service_membro_service__WEBPACK_IMPORTED_MODULE_11__["MembroService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], CadastrarIgrejaComponent);
    return CadastrarIgrejaComponent;
}());



/***/ }),

/***/ "./src/app/pages/igreja/igreja.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/igreja/igreja.module.ts ***!
  \***********************************************/
/*! exports provided: IgrejaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IgrejaModule", function() { return IgrejaModule; });
/* harmony import */ var _diretives_diretives_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../diretives/diretives.module */ "./src/app/diretives/diretives.module.ts");
/* harmony import */ var _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../pipes/pipe.module */ "./src/app/pipes/pipe.module.ts");
/* harmony import */ var _service_interceptor_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../service/interceptor.service */ "./src/app/service/interceptor.service.ts");
/* harmony import */ var _componentes_contatos_contatos_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../componentes/contatos/contatos.module */ "./src/app/pages/componentes/contatos/contatos.module.ts");
/* harmony import */ var _componentes_endereco_endereco_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../componentes/endereco/endereco.module */ "./src/app/pages/componentes/endereco/endereco.module.ts");
/* harmony import */ var _componentes_igreja_dados_igreja_dados_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../componentes/igreja-dados/igreja-dados.module */ "./src/app/pages/componentes/igreja-dados/igreja-dados.module.ts");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.module.ts");
/* harmony import */ var _cadastrar_cadastrar_igreja_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cadastrar/cadastrar-igreja.component */ "./src/app/pages/igreja/cadastrar/cadastrar-igreja.component.ts");
/* harmony import */ var _pesquisar_pesquisar_igreja_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pesquisar/pesquisar-igreja.component */ "./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.ts");
/* harmony import */ var _pessoas_igreja_pessoas_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pessoas/igreja-pessoas.component */ "./src/app/pages/igreja/pessoas/igreja-pessoas.component.ts");
/* harmony import */ var _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../componentes/igrejas/igreja-compenent.module */ "./src/app/pages/componentes/igrejas/igreja-compenent.module.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var routes = [
    { path: 'cadastrar', component: _cadastrar_cadastrar_igreja_component__WEBPACK_IMPORTED_MODULE_16__["CadastrarIgrejaComponent"], data: { animation: 'buttons' } },
    { path: 'pesquisar', component: _pesquisar_pesquisar_igreja_component__WEBPACK_IMPORTED_MODULE_17__["PesquisarIgrejaComponent"], data: { animation: 'buttons' } },
    { path: 'pessoas', component: _pessoas_igreja_pessoas_component__WEBPACK_IMPORTED_MODULE_18__["IgrejaPessoasComponent"], data: { animation: 'buttons' } },
];
var IgrejaModule = /** @class */ (function () {
    function IgrejaModule() {
    }
    IgrejaModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _componentes_endereco_endereco_module__WEBPACK_IMPORTED_MODULE_13__["EnderecoModule"],
                angular2_text_mask__WEBPACK_IMPORTED_MODULE_9__["TextMaskModule"],
                _componentes_contatos_contatos_module__WEBPACK_IMPORTED_MODULE_12__["ContatosModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSlideToggleModule"],
                _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_15__["DialogAtivarInativarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"],
                _componentes_igreja_dados_igreja_dados_module__WEBPACK_IMPORTED_MODULE_14__["IgrejaDadosModule"],
                _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_10__["PipeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_19__["IgrejasComponentModule"],
                _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_module__WEBPACK_IMPORTED_MODULE_1__["DialogTransferirPessoaModule"],
                _diretives_diretives_module__WEBPACK_IMPORTED_MODULE_0__["DiretivesModule"],
                _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_20__["DialogConfirmPessoaModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _cadastrar_cadastrar_igreja_component__WEBPACK_IMPORTED_MODULE_16__["CadastrarIgrejaComponent"],
                _pesquisar_pesquisar_igreja_component__WEBPACK_IMPORTED_MODULE_17__["PesquisarIgrejaComponent"],
                _pessoas_igreja_pessoas_component__WEBPACK_IMPORTED_MODULE_18__["IgrejaPessoasComponent"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _service_interceptor_service__WEBPACK_IMPORTED_MODULE_11__["InterceptorService"], multi: true }
            ]
        })
    ], IgrejaModule);
    return IgrejaModule;
}());



/***/ }),

/***/ "./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.html":
/*!************************************************************************!*\
  !*** ./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span><i class=\"material-icons\">search</i></span>\r\n      <h1 class=\"mat-headline center-align\">Igreja</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"100px\">\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"cadastrar()\">\r\n          <i class=\"material-icons\">add</i>Novo</button>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Status</mat-label>\r\n          <mat-select [(ngModel)]=\"statusSelecionado\" id=\"status\">\r\n            <mat-option *ngFor=\"let item of comboStatus\" [value]=\"item.codigo\" (click)=\"onSelection()\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <form form [formGroup]=\"form\">\r\n          <div [hidden]=\"check || igrejas.length == 0\">\r\n            <label style=\"color:#1d68a5\">Agrupar por Igreja Sede?</label>\r\n            <mat-slide-toggle id=\"agrupar\" formControlName=\"group\" (change)=\"changeAgrupar(agrupar.checked)\" #agrupar>\r\n              {{agrupar.checked | boolean : ['Sim', 'Não']}}</mat-slide-toggle>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div>\r\n        <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n          <input placeholder=\"Filtrar\" aria-label=\"Number\" matInput [formControl]=\"myControl\">\r\n        </mat-form-field>\r\n      </div>\r\n      <br />\r\n      <div class=\"table-responsive\" *ngIf=\"agrupar.checked\" style=\"overflow: auto; height: 300px;\">\r\n        <table>\r\n          <thead class=\"text-primary\">\r\n            <th>SEDE</th>\r\n            <th>Nome</th>\r\n            <th>CNPJ</th>\r\n            <th>Data Abertura</th>\r\n            <th>Idade</th>\r\n            <th>CEP</th>\r\n            <th>Bairro</th>\r\n            <th>logradouro</th>\r\n            <th>Cidade</th>\r\n            <th>estado</th>\r\n            <th>ação</th>\r\n          </thead>\r\n          <tbody *ngFor=\"let i of filteredIgrejas | async\">\r\n            <tr style=\"background-color: #5C6BC0;color: white;\">\r\n              <td>Sim</td>\r\n              <td>{{i.nome}}</td>\r\n              <td>{{i.cnpj | cpfCnpj }}</td>\r\n              <td>{{i.dataAbertura}}</td>\r\n              <td>{{i.idade}}</td>\r\n              <td>{{i.endereco.cep}}</td>\r\n              <td>{{i.endereco.bairro}}</td>\r\n              <td>{{i.endereco.logradouro}}</td>\r\n              <td>{{i.endereco.localidade}}</td>\r\n              <td>{{i.endereco.uf}}</td>\r\n              <td><span title=\"Editar\" style=\"cursor: pointer;color:white\" (click)=\"editar(i.id)\"><i\r\n                    class=\"material-icons\">create</i></span>\r\n                <span title=\"Excluir\" style=\"cursor: pointer;color:white\" (click)=\"dialogStatus(i.id,i.status)\"><i\r\n                    class=\"material-icons\">settings</i></span>\r\n              </td>\r\n            </tr>\r\n\r\n            <tr *ngFor=\"let f of i.filiais\">\r\n              <td>Não</td>\r\n              <td>{{f.nome}}</td>\r\n              <td>{{f.cnpj | cpfCnpj }}</td>\r\n              <td>{{f.dataAbertura}}</td>\r\n              <td>{{f.idade}}</td>\r\n              <td>{{f.endereco.cep}}</td>\r\n              <td>{{f.endereco.bairro}}</td>\r\n              <td>{{f.endereco.logradouro}}</td>\r\n              <td>{{f.endereco.localidade}}</td>\r\n              <td>{{f.endereco.uf}}</td>\r\n              <td><span matTooltip=\"Editar\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"editar(f.id)\"><i\r\n                    class=\"material-icons\">create</i></span>\r\n                <span matTooltip=\"Excluir\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"dialogStatus(f.id,f.status)\"><i\r\n                    class=\"material-icons\">settings</i></span>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <div class=\"table-responsive\" *ngIf=\"!agrupar.checked && igrejas.length > 0\"  style=\"overflow: auto; height: 300px;\">\r\n        <table>\r\n          <thead class=\"text-primary\">\r\n            <th>SEDE</th>\r\n            <th>Nome</th>\r\n            <th>CNPJ</th>\r\n            <th>Data Abertura</th>\r\n            <th>Idade</th>\r\n            <th>CEP</th>\r\n            <th>Bairro</th>\r\n            <th>logradouro</th>\r\n            <th>Cidade</th>\r\n            <th>estado</th>\r\n            <th>ação</th>\r\n          </thead>\r\n          <tbody *ngFor=\"let i of filteredIgrejas | async\">\r\n            <tr>\r\n              <td *ngIf=\"true\">{{!i.isSede?'Sim':'Não'}}</td>\r\n              <td>{{i.nome}}</td>\r\n              <td>{{i.cnpj | cpfCnpj }}</td>\r\n              <td>{{i.dataAbertura}}</td>\r\n              <td>{{i.idade}}</td>\r\n              <td>{{i.endereco.cep}}</td>\r\n              <td>{{i.endereco.bairro}}</td>\r\n              <td>{{i.endereco.logradouro}}</td>\r\n              <td>{{i.endereco.localidade}}</td>\r\n              <td>{{i.endereco.uf}}</td>\r\n              <td><span matTooltip=\"Editar\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"editar(i.id)\"><i\r\n                    class=\"material-icons\">create</i></span>\r\n                <span matTooltip=\"Excluir\" style=\"cursor: pointer;color:#1d68a5\" (click)=\"dialogStatus(i.id,i.status)\"><i\r\n                    class=\"material-icons\">settings</i></span>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <br />\r\n        <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\" *ngIf=\"!agrupar.checked\"><i\r\n          class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.ts ***!
  \**********************************************************************/
/*! exports provided: PesquisarIgrejaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PesquisarIgrejaComponent", function() { return PesquisarIgrejaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.component.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
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
    { codigo: 'ATIVO', value: 'Ativo' },
    { codigo: 'INATIVO', value: 'Inativo' },
];
var PesquisarIgrejaComponent = /** @class */ (function () {
    function PesquisarIgrejaComponent(_igrejaService, _notifierService, _router, _dialog, _emitirEventoService, _avRoute, _excelService) {
        this._igrejaService = _igrejaService;
        this._notifierService = _notifierService;
        this._router = _router;
        this._dialog = _dialog;
        this._emitirEventoService = _emitirEventoService;
        this._avRoute = _avRoute;
        this._excelService = _excelService;
        this.igrejas = [];
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
        this.comboStatus = ELEMENT_DATA;
        this.statusSelecionado = 'A';
        this.check = false;
    }
    PesquisarIgrejaComponent.prototype.ngOnInit = function () {
        this.getList();
        this.getEmiter();
        this.getParams();
        this._buildForm();
    };
    PesquisarIgrejaComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormGroup"]({
            'group': new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](false),
        });
    };
    PesquisarIgrejaComponent.prototype.getListGroup = function () {
        var _this = this;
        this._igrejaService.getListGroup().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            _this.igrejas = item;
            console.log(item);
            _this.filteredIgrejas = _this.myControl.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return _this._filter(value); }));
        }, function (error) {
            console.log(error);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_4__["AlertType"].Error, error.message);
        });
    };
    PesquisarIgrejaComponent.prototype._filter = function (value) {
        // console.log(value)
        var filterValue = value.toLowerCase();
        return this.igrejas.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    PesquisarIgrejaComponent.prototype.cadastrar = function () {
        localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
        this._router.navigate(['/auth/igreja/cadastrar'], {
            queryParams: {
                janela: 'Novo',
            },
            skipLocationChange: true
        });
    };
    PesquisarIgrejaComponent.prototype.editar = function (id, tipo) {
        localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
        this._router.navigate(['/auth/igreja/cadastrar'], {
            queryParams: {
                janela: 'Editar',
                id: id,
                tipo: tipo
            },
            skipLocationChange: true
        });
    };
    PesquisarIgrejaComponent.prototype.dialogStatus = function (id, status) {
        var dialogRef = this._dialog.open(_dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_8__["DialogAtivarInativarComponent"], {
            width: '600px',
            data: {
                id: id,
                status: status,
                controller: "igreja"
            }
        });
    };
    PesquisarIgrejaComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (obj) {
            if (obj.data == 'status') {
                _this.getList();
            }
        });
    };
    PesquisarIgrejaComponent.prototype.onSelection = function () {
        if (this.statusSelecionado == 'I') {
            this.form.controls['group'].patchValue(false);
            this.check = true;
            this.getListForStatus(this.statusSelecionado);
        }
        else {
            this.check = false;
            this.getList();
        }
    };
    PesquisarIgrejaComponent.prototype.getListForStatus = function (status) {
        var _this = this;
        this._igrejaService.getListForStatus(status).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            console.log(item);
            _this.igrejas = item;
            _this.filteredIgrejas = _this.myControl.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return _this._filter(value); }));
        }, function (error) {
            console.log(error);
            // this._notifierService.notify(AlertType.Error, error.errors.message);
        });
    };
    PesquisarIgrejaComponent.prototype.getList = function () {
        var _this = this;
        this._igrejaService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            // console.log(item)
            _this.igrejas = item;
            _this.filteredIgrejas = _this.myControl.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return _this._filter(value); }));
        }, function (error) {
            console.log(error);
            // this._notifierService.notify(AlertType.Error, error.errors.message);
        });
    };
    PesquisarIgrejaComponent.prototype.getParams = function () {
        // console.log(this._avRoute.snapshot.queryParamMap);
        if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
            this.statusSelecionado = JSON.parse(localStorage.getItem("pesquisar"));
            localStorage.removeItem("pesquisar");
            this.getListForStatus(this.statusSelecionado);
        }
    };
    PesquisarIgrejaComponent.prototype.changeAgrupar = function (agrupar) {
        if (agrupar) {
            this.getListGroup();
        }
        else {
            this.getList();
        }
    };
    PesquisarIgrejaComponent.prototype.exportAsXLSX = function () {
        var dados = [];
        this.igrejas.forEach(function (i) {
            dados.push({
                "Nome": i.nome,
                "Cnpj": i.cnpj,
                "Cep": i.endereco.cep,
                "Bairro": i.endereco.bairro,
                "Logradouro": i.endereco.logradouro,
                "Cidade": i.endereco.localidade,
                "Estado": i.endereco.uf,
            });
        });
        this._excelService.exportAsExcelFile(dados, "pesquisa");
    };
    PesquisarIgrejaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pesquisar-igreja',
            template: __webpack_require__(/*! ./pesquisar-igreja.component.html */ "./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.html"),
            styles: [__webpack_require__(/*! ./pesquisar-igreja.component.scss */ "./src/app/pages/igreja/pesquisar/pesquisar-igreja.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_igreja_service__WEBPACK_IMPORTED_MODULE_1__["IgrejaService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_9__["EmitirEventoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_10__["ExcelService"]])
    ], PesquisarIgrejaComponent);
    return PesquisarIgrejaComponent;
}());



/***/ }),

/***/ "./src/app/pages/igreja/pessoas/igreja-pessoas.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/igreja/pessoas/igreja-pessoas.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">supervisor_account</i>\r\n      <h1 class=\"mat-headline center-align\">Pessoas</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div *hasPermission=\"['combo_igreja_pessoa']\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\" style=\"width: 100%;\" (blur)=\"onBlurIgreja($event)\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionIgrejaClick(option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        </div>\r\n      <form form [formGroup]=\"form\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Pessoa</mat-label>\r\n          <mat-select  id=\"pessoa\" formControlName=\"tipo\" >\r\n            <mat-option *ngFor=\"let item of tipoPessoas\" [value]=\"item.key\" (click)=\"onSelectionClick(item.key)\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n       </form>\r\n       <div [hidden]=\"pessoas.length == 0\">\r\n       <div>\r\n        <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filtrar\">\r\n        </mat-form-field>\r\n      </div>\r\n        <mat-table #table [dataSource]=\"dados\" matSort style=\"margin-top: 20px;\" >\r\n          <ng-container matColumnDef=\"{{ column.id }}\" *ngFor=\"let column of columnNames\">\r\n            <mat-header-cell *matHeaderCellDef mat-sort-header> {{column.value}} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\">\r\n              <span *ngIf=\"column.id!='id'\" matTooltip=\"{{element[column.id]}}\">\r\n                {{(element[column.id]?.length > 50) ? ((element[column.id]).slice(0, 50) + '...') : element[column.id]}}\r\n              </span>\r\n              <span matTooltip=\"Transferir\" *ngIf=\"column.id=='id' && hasPermission('combo_igreja_pessoa')\" class=\"default-botoes\" (click)=\"transferir(element.id)\">\r\n                <i class=\"material-icons\">swap_horiz</i>\r\n              </span>\r\n            </mat-cell>\r\n          </ng-container>\r\n          <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n          <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n        <mat-paginator #paginator [length]=\"dados.length\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n          showFirstLastButtons></mat-paginator>\r\n       </div>\r\n       <div>\r\n        <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\" *ngIf=\"pessoas.length > 0\"><i\r\n            class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/igreja/pessoas/igreja-pessoas.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/igreja/pessoas/igreja-pessoas.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/igreja/pessoas/igreja-pessoas.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/igreja/pessoas/igreja-pessoas.component.ts ***!
  \******************************************************************/
/*! exports provided: IgrejaPessoasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IgrejaPessoasComponent", function() { return IgrejaPessoasComponent; });
/* harmony import */ var _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/user.service */ "./src/app/service/user.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var IgrejaPessoasComponent = /** @class */ (function () {
    function IgrejaPessoasComponent(_emitirEventoService, _service, _notifierService, _dialog, _userService, _igrejaService, _excelService) {
        this._emitirEventoService = _emitirEventoService;
        this._service = _service;
        this._notifierService = _notifierService;
        this._dialog = _dialog;
        this._userService = _userService;
        this._igrejaService = _igrejaService;
        this._excelService = _excelService;
        this.tipoPessoas = [
            { key: 'M', value: 'Membro' },
            { key: 'V', value: 'Visitante' }
        ];
        this.pessoas = new Array();
        this.displayedColumns = [];
        this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"]();
        this.pageIndex = 0;
        this.loading = false;
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]();
    }
    IgrejaPessoasComponent.prototype.ngOnInit = function () {
        this.getEmiter();
        this.columns();
        this.carregarIgrejas();
        this._buildForm();
    };
    IgrejaPessoasComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'transferido') {
                console.log('user');
                _this.onSelectionClick(item.data);
            }
        });
    };
    IgrejaPessoasComponent.prototype.onSelectionClick = function (key) {
        if (!this._userService.hasPermission("combo_igreja_pessoa")) {
            var user = this._userService.getMembroLogado();
            if (user.igreja) {
                this.igrejaSelecionada = user.igreja;
            }
        }
        if (this.igrejaSelecionada) {
            switch (key) {
                case 'M':
                    this.tipoPessoaSelecionado = 'M';
                    this.getMembros(this.igrejaSelecionada.id);
                    break;
                case 'V':
                    this.tipoPessoaSelecionado = 'V';
                    this.getVisitantes(this.igrejaSelecionada.id);
                    break;
            }
        }
    };
    IgrejaPessoasComponent.prototype.columns = function () {
        this.columnNames = [
            { id: 'nomeCompleto', value: 'Nome' },
            { id: 'dataNascimento', value: 'Data Nascimento' },
            { id: 'estadoCivil', value: 'Estado Civil' },
            { id: 'id', value: 'Ação' }
        ];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
    };
    IgrejaPessoasComponent.prototype.getMembros = function (id) {
        var _this = this;
        this._service.getMembros(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (item) {
            console.log(item);
            _this.pessoas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](_this.pessoas);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
            console.log(_this.paginator);
        }, function (error) {
            // console.log(error);
            _this.pessoas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](_this.pessoas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, error.error.message);
        });
    };
    IgrejaPessoasComponent.prototype.getVisitantes = function (id) {
        var _this = this;
        this._service.getVisitantes(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.pessoas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](_this.pessoas);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            // console.log(error);
            _this.pessoas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](_this.pessoas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, error.error.message);
        });
    };
    IgrejaPessoasComponent.prototype.applyFilter = function (value) {
        this.dados.filter = value.trim().toLowerCase();
    };
    IgrejaPessoasComponent.prototype.transferir = function (id) {
        var metodo;
        switch (this.tipoPessoaSelecionado) {
            case 'M':
                metodo = 'transferirIgrejaMembro';
                break;
            case 'V':
                metodo = 'transferirIgrejaVisitante';
                break;
        }
        var dialogRef = this._dialog.open(_dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_0__["DialogTransferirPessoaComponent"], {
            width: '600px',
            data: {
                pessoaId: id,
                metodo: metodo,
                controller: 'igreja',
                tipoPessoa: this.tipoPessoaSelecionado
            }
        });
    };
    IgrejaPessoasComponent.prototype.onBlurIgreja = function (event) {
        if (!event.target.value) {
            this.pessoas = [];
            this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](this.pessoas);
            this.form.reset();
        }
    };
    IgrejaPessoasComponent.prototype.onSelectionIgrejaClick = function (value) {
        this.igrejaSelecionada = value;
    };
    IgrejaPessoasComponent.prototype.carregarIgrejas = function () {
        var _this = this;
        this._igrejaService.getListIdAndName().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejas = item;
            // console.log(item);
            _this.filteredIgreja = _this.myControlIgreja.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (value) { return _this._filterIgreja(value, _this.comboIgrejas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Error, "Erro ao carregar igrejas!");
        });
    };
    IgrejaPessoasComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    IgrejaPessoasComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormGroup"]({
            'tipo': new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"](false),
        });
    };
    IgrejaPessoasComponent.prototype.exportAsXLSX = function () {
        var dados = [];
        this.pessoas.forEach(function (i) {
            dados.push({
                "Nome": i.nomeCompleto,
                "Data Nascimento": i.dataNascimento,
                "RG": i.rg,
                "CPF": i.cpf,
                "Estado Civil": i.estadoCivil,
                "Sexo": i.sexo,
                "Tprofissao": i.profissao,
            });
        });
        this._excelService.exportAsExcelFile(dados, "pesquisa");
    };
    IgrejaPessoasComponent.prototype.hasPermission = function (param) {
        return this._userService.hasPermission(param);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
    ], IgrejaPessoasComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('paginator'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"])
    ], IgrejaPessoasComponent.prototype, "paginator", void 0);
    IgrejaPessoasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-igreja-pessoas',
            template: __webpack_require__(/*! ./igreja-pessoas.component.html */ "./src/app/pages/igreja/pessoas/igreja-pessoas.component.html"),
            styles: [__webpack_require__(/*! ./igreja-pessoas.component.scss */ "./src/app/pages/igreja/pessoas/igreja-pessoas.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_3__["EmitirEventoService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_4__["IgrejaService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _service_user_service__WEBPACK_IMPORTED_MODULE_8__["UserService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_4__["IgrejaService"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_10__["ExcelService"]])
    ], IgrejaPessoasComponent);
    return IgrejaPessoasComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-igreja-igreja-module.js.map