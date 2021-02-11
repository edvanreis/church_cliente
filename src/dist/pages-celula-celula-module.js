(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-celula-celula-module"],{

/***/ "./src/app/pages/celula/cadastrar/cadastrar-celula.component.html":
/*!************************************************************************!*\
  !*** ./src/app/pages/celula/cadastrar/cadastrar-celula.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span><i class=\"material-icons\">group_add</i></span>\r\n      <h1 class=\"mat-headline center-align\">Célula</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <form form [formGroup]=\"form\">\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput class=\"input-upper\" placeholder=\"Nome\" formControlName=\"nome\" id=\"nome\" required>\r\n            <mat-error *ngIf=\"!form.controls.nome.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n          <mat-form-field>\r\n            <input matInput [matDatepicker]=\"picker\" placeholder=\"Data de abertura\"\r\n            formControlName=\"dataAbertura\"\r\n              readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker></mat-datepicker>\r\n            <mat-error *ngIf=\"!form.controls.dataAbertura.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput placeholder=\"Hora Inicio\" [textMask]=\"{mask: maskHorario}\" formControlName=\"horaInicio\"\r\n              id=\"horaInicio\" required>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput placeholder=\"Hora Fim\" [textMask]=\"{mask: maskHorario}\" formControlName=\"horaFim\"\r\n              id=\"horaFim\" required>\r\n          </mat-form-field>\r\n          <mat-form-field>\r\n            <mat-label>Turno</mat-label>\r\n            <mat-select formControlName=\"turno\" id=\"turno\" required>\r\n              <mat-option *ngFor=\"let item of comboTurno | keyValue\" [value]=\"item.key\">\r\n                {{item.value}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <mat-label>Dia da semana</mat-label>\r\n            <mat-select formControlName=\"diaSemana\" id=\"diaSemana\" required>\r\n              <mat-option *ngFor=\"let item of comboSemana | keyValue\" [value]=\"item.key\">\r\n                {{item.value}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"full-width-field\">\r\n            <mat-label>Tipo de Célula</mat-label>\r\n            <mat-select formControlName=\"tipo\" id=\"tipo\" required>\r\n              <mat-option *ngFor=\"let item of comboTipoCelula | keyValue\" [value]=\"item.key\">\r\n                {{item.value}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n        </div>\r\n        <div>\r\n          <label style=\"color:#1d68a5\">Digital?</label>\r\n          <mat-slide-toggle formControlName=\"digital\" id=\"digital\" #digital>\r\n            {{digital.checked | boolean : ['Sim', 'Não']}}\r\n          </mat-slide-toggle>\r\n        </div>\r\n      </form>\r\n      <app-igrejas></app-igrejas>\r\n      <div>\r\n        <div>\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input type=\"text\" placeholder=\"Rede\" aria-label=\"Number\" matInput [formControl]=\"myControlRede\"\r\n              [matAutocomplete]=\"a\" [(ngModel)]=\"redeValue\">\r\n            <mat-autocomplete #a=\"matAutocomplete\">\r\n              <mat-option *ngFor=\"let option of filteredRede | async\" [value]=\"option.nome\"\r\n                (onSelectionChange)=\"onSelectionRedeChange($event,option)\">\r\n                {{option.nome}}\r\n              </mat-option>\r\n            </mat-autocomplete>\r\n          </mat-form-field>\r\n        </div>\r\n      </div>\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <textarea matInput placeholder=\"Nota/Observação\" [(ngModel)]=\"observacao\"></textarea>\r\n        </mat-form-field>\r\n      </div>\r\n      <br/><br/>\r\n      <mat-divider></mat-divider>\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" class=\"default-font-color\">\r\n        <i class=\"material-icons\">store_mall_directory</i>\r\n        <h1 class=\"mat-subheading-2 center-align\">Endereço</h1>\r\n      </div>\r\n      <app-endereco [sizeLimitOne]=\"sizeLimitOne\"></app-endereco>\r\n        <br/>\r\n        <br/>\r\n      <mat-divider></mat-divider>\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" class=\"default-font-color\">\r\n        <i class=\"material-icons\">face</i>\r\n        <h1 class=\"mat-subheading-2 center-align\">Lideres</h1>\r\n      </div>\r\n      <div div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" aria-label=\"Number\" matInput [formControl]=\"myControlMembro\" [matAutocomplete]=\"auto\" placeholder=\"Membros\"\r\n            [(ngModel)]=\"membroValue\" required>\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredMembro | async\" [value]=\"option.nomeCompleto\"\r\n              (onSelectionChange)=\"onSelectionChangedMembro($event,option)\">\r\n              {{option.nomeCompleto}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n          <mat-label>Selecione...</mat-label>\r\n          <mat-select  id=\"comboTipopessoa\"  [(ngModel)]=\"tipoPessoa\" >\r\n            <mat-option *ngFor=\"let item of comboTipoPessoa\" [value]=\"item\">\r\n              {{item.nome}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"adicionar()\">\r\n          <i class=\"material-icons\">add</i>adicionar</button>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div class=\"table-responsive\" *ngIf=\"membros.length > 0\">\r\n        <table>\r\n          <thead class=\"text-primary\">\r\n            <th></th>\r\n            <th>Nome</th>\r\n            <th>cpf</th>\r\n            <th>Tipo</th>\r\n            <th>Remover</th>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let m of membros;let i= index\">\r\n              <td>{{ i+1}}</td>\r\n              <td>{{ m.nomeCompleto}}</td>\r\n              <td>{{ m.cpf | cpfCnpj }}</td>\r\n              <td>{{ m.tipo}}</td>\r\n              <td><span style=\"color: #1d68a5;cursor: pointer\" (click)=\"dialogRemover(i,m)\"><i\r\n                    class=\"material-icons\">delete</i></span></td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"salvar()\">\r\n          <i class=\"material-icons\">save</i>Salvar</button>\r\n        <div fxFlex></div>\r\n        <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"voltar()\">\r\n          <i class=\"material-icons\">reply</i>Voltar</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/celula/cadastrar/cadastrar-celula.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/celula/cadastrar/cadastrar-celula.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/celula/cadastrar/cadastrar-celula.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/celula/cadastrar/cadastrar-celula.component.ts ***!
  \**********************************************************************/
/*! exports provided: CadastrarCelulaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastrarCelulaComponent", function() { return CadastrarCelulaComponent; });
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/membro.service */ "./src/app/service/membro.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_celula_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/celula.service */ "./src/app/service/celula.service.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component.ts");
/* harmony import */ var _service_tipo_lideranca_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../service/tipo-lideranca.service */ "./src/app/service/tipo-lideranca.service.ts");
/* harmony import */ var _helper_helper_church__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../helper/helper.church */ "./src/app/helper/helper.church.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var CadastrarCelulaComponent = /** @class */ (function () {
    function CadastrarCelulaComponent(_service, _notifierService, _emitirEventoService, _datePipe, _avRoute, _router, _redeService, _dateAdapter, _dialog, _tipoLiderancaService, _membroService, _serviceRede) {
        this._service = _service;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._datePipe = _datePipe;
        this._avRoute = _avRoute;
        this._router = _router;
        this._redeService = _redeService;
        this._dateAdapter = _dateAdapter;
        this._dialog = _dialog;
        this._tipoLiderancaService = _tipoLiderancaService;
        this._membroService = _membroService;
        this._serviceRede = _serviceRede;
        this.maskHorario = [/\d/, /\d/, ':', /\d/, /\d/];
        this.comboSemana = [];
        this.comboTurno = [];
        this.comboTipoCelula = [];
        this.enderecos = [];
        this.membros = [];
        this.comboTipoPessoa = [];
        this.label = "Membro";
        this.sizeLimitOne = true;
        this.myControlMembro = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
        this.comboMembro = [];
        this.myControlRede = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
        this.comboRede = [];
    }
    CadastrarCelulaComponent.prototype.ngOnInit = function () {
        this._dateAdapter.setLocale("br");
        this.getEmiter();
        this._buildForm();
        this.getComboSemana();
        this.getComboTurno();
        this.carregarTipoCelula();
        this.carregarTipoLiderencaCelula();
        this.getParams();
    };
    CadastrarCelulaComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'igreja-comp') {
                _this.igrejaSelecionada = item.data;
                _this.carregarRede(_this.igrejaSelecionada.id);
            }
            if (item.type == 'endereco') {
                _this.enderecos = item.data;
            }
            if (item.type == 'confirm-dialog-pessoa-celula') {
                if (_this.membros.length > 0) {
                    _this.membros.splice(item.data, 1);
                }
            }
        });
    };
    CadastrarCelulaComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'diaSemana': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'turno': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'dataAbertura': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'tipo': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'perfil': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'horaInicio': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'horaFim': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
            'digital': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
        });
    };
    CadastrarCelulaComponent.prototype.getComboSemana = function () {
        var _this = this;
        this._service.carregarSemana().subscribe(function (item) {
            _this.comboSemana = item;
            // console.log(item);
        });
    };
    CadastrarCelulaComponent.prototype.getComboTurno = function () {
        var _this = this;
        this._service.carregarTurno().subscribe(function (item) {
            _this.comboTurno = item;
            // console.log(item);
        });
    };
    CadastrarCelulaComponent.prototype.carregarTipoCelula = function () {
        var _this = this;
        this._service.carregarTipoCelula().subscribe(function (item) {
            _this.comboTipoCelula = item;
            // console.log(item);
        });
    };
    CadastrarCelulaComponent.prototype.carregarTipoLiderencaCelula = function () {
        var _this = this;
        this._tipoLiderancaService.getList().subscribe(function (item) {
            _this.comboTipoPessoa = item;
            // console.log(item);
        });
    };
    CadastrarCelulaComponent.prototype.salvar = function () {
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
    CadastrarCelulaComponent.prototype.obj = function () {
        return {
            nome: this.form.controls['nome'].value,
            dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
            horaInicio: this.form.controls['horaInicio'].value,
            horaFim: this.form.controls['horaFim'].value,
            dia: this.form.controls['diaSemana'].value,
            turno: this.form.controls['turno'].value,
            tipoCelula: this.form.controls['tipo'].value,
            rede: { id: this.redeSelecionada.id },
            enderecos: this.enderecos,
            observacao: this.observacao,
            membros: this.membros,
            digital: _helper_helper_church__WEBPACK_IMPORTED_MODULE_14__["HelperChurch"].isBoolean(this.form.controls['digital'].value)
        };
    };
    CadastrarCelulaComponent.prototype.transformDate = function (hora) {
        return this._datePipe.transform(new Date(), 'dd/MM/yyyy ' + hora);
    };
    CadastrarCelulaComponent.prototype.adicionar = function () {
        this.getEmiter();
        if (!this.membroSelecionado) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro:campo membro em branco!");
            return false;
        }
        if (!this.tipoPessoa) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro: escolha um tipo membro da célula!");
            return false;
        }
        this.membroSelecionado.tipo = this.tipoPessoa.nome;
        this.tipoPessoa = null;
        this.membros.push(this.membroSelecionado);
        this.membroValue = '';
    };
    CadastrarCelulaComponent.prototype.voltar = function () {
        this._router.navigate(['/auth/celula/pesquisar'], {
            queryParams: {
                pesquisar: 'pesquisar',
            },
            skipLocationChange: true
        });
    };
    CadastrarCelulaComponent.prototype.getParams = function () {
        if (this._avRoute.snapshot.queryParamMap.get("id")) {
            this.id = this._avRoute.snapshot.queryParamMap.get("id");
            this.getCelula(this.id);
        }
    };
    CadastrarCelulaComponent.prototype.getCelula = function (id) {
        var _this = this;
        this._service.getCelula(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function (item) {
            // console.log(item)
            _this.form.controls['nome'].patchValue(item.nome);
            _this.form.controls['horaInicio'].patchValue(item.horaInicio);
            _this.form.controls['horaFim'].patchValue(item.horaFim);
            _this.form.controls['diaSemana'].patchValue(item.diasEnum);
            _this.form.controls['turno'].patchValue(item.turnoEnum);
            _this.form.controls['tipo'].patchValue(item.tipoCelulaEnum);
            _this.form.controls['dataAbertura'].patchValue(new Date(item.dataAbertutaToDate));
            _this.form.controls['digital'].patchValue(item.digital);
            _this.observacao = item.observacao;
            if (item.rede) {
                _this.redeValue = item.rede.nome;
            }
            if (item.enderecos) {
                _this.emitirEnderecos(item.enderecos);
            }
            if (item.membros) {
                _this.carregarPessoas(item.membros);
            }
            if (item.igreja) {
                _this.emitirIgreja(item.igreja);
            }
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, error.errors.message);
        });
    };
    CadastrarCelulaComponent.prototype.carregarPessoas = function (item) {
        if (item) {
            for (var i = 0; i < item.length; i++) {
                var pessoa = {};
                pessoa.id = item[i].id;
                pessoa.nomeCompleto = item[i].nomeCompleto;
                pessoa.cpf = item[i].cpf;
                pessoa.tipo = item[i].tipo;
                this.membros.push(pessoa);
            }
        }
    };
    CadastrarCelulaComponent.prototype.emitirEnderecos = function (item) {
        this.enderecos = item;
        this._emitirEventoService.emitir('edit-endereco', item);
    };
    CadastrarCelulaComponent.prototype.emitirIgreja = function (item) {
        this.igrejaSelecionada = item;
        this._emitirEventoService.emitir('edit-igreja', this.igrejaSelecionada);
    };
    CadastrarCelulaComponent.prototype.save = function () {
        var _this = this;
        console.log(this.obj());
        this._service.save(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function (item) {
            _this.voltar();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, error.message);
        });
    };
    CadastrarCelulaComponent.prototype.update = function () {
        var _this = this;
        var obj = {};
        obj = this.obj();
        obj.id = Number.parseInt(this.id);
        this._service.update(obj).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function (item) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, error.message);
        });
    };
    CadastrarCelulaComponent.prototype.dialogRemover = function (i, item) {
        var dialogRef = this._dialog.open(_dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_12__["DialogConfirmPessoaComponent"], {
            width: '600px',
            data: {
                id: Number.parseInt(this.id),
                idPessoa: item.id,
                controller: "celula",
                item: i
            }
        });
    };
    CadastrarCelulaComponent.prototype.carregarMembro = function (id) {
        var _this = this;
        this._membroService.getMembroIgrejaByRede(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.comboMembro = item;
            _this.filteredMembro = _this.myControlMembro.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (value) { return _this._filterMembros(value, _this.comboMembro); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    CadastrarCelulaComponent.prototype._filterMembros = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarCelulaComponent.prototype.onSelectionChangedMembro = function ($event, option) {
        this.membroSelecionado = option;
    };
    CadastrarCelulaComponent.prototype.validFields = function () {
        if (!this.form.controls['nome'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor digite o nome da célula!");
            return false;
        }
        if (!this.form.controls['dataAbertura'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor selecione a Data de Abertura!");
            return false;
        }
        if (!this.form.controls['diaSemana'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor selecione o Dia da semana!");
            return false;
        }
        if (!this.form.controls['turno'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor selecione um turno!");
            return false;
        }
        if (!this.form.controls['tipo'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor selecione um Tipo de Célula!");
            return false;
        }
        if (!this.form.controls['horaInicio'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor digite a hora Inicio!");
            return false;
        }
        if (!this.form.controls['horaFim'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor digite a hora Fim");
            return false;
        }
        if (!this.redeSelecionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor selecione uma Rede!");
            return false;
        }
        if (this.enderecos && this.enderecos.length == 0 && !this.form.controls['digital'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor Adicione um endereço!");
            return false;
        }
        if (this.membros.length == 0) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Por favor Adicione a liderença da célula!");
            return false;
        }
        return true;
    };
    CadastrarCelulaComponent.prototype.carregarRede = function (id) {
        var _this = this;
        this._serviceRede.getRedeIgreja(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["take"])(1)).subscribe(function (item) {
            _this.comboRede = item;
            // console.log(item);
            _this.filteredRede = _this.myControlRede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (value) { return _this._filterRede(value, _this.comboRede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_8__["AlertType"].Error, "Erro ao carregar as redes!");
        });
    };
    CadastrarCelulaComponent.prototype._filterRede = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarCelulaComponent.prototype.onSelectionRedeChange = function ($event, option) {
        this.redeSelecionada = option;
        this.carregarMembro(this.redeSelecionada.id);
    };
    CadastrarCelulaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-cadastrar-celula',
            template: __webpack_require__(/*! ./cadastrar-celula.component.html */ "./src/app/pages/celula/cadastrar/cadastrar-celula.component.html"),
            styles: [__webpack_require__(/*! ./cadastrar-celula.component.scss */ "./src/app/pages/celula/cadastrar/cadastrar-celula.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_celula_service__WEBPACK_IMPORTED_MODULE_9__["CelulaService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_10__["EmitirEventoService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _service_rede_service__WEBPACK_IMPORTED_MODULE_11__["RedeService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["DateAdapter"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _service_tipo_lideranca_service__WEBPACK_IMPORTED_MODULE_13__["TipoLiderancaService"],
            _service_membro_service__WEBPACK_IMPORTED_MODULE_0__["MembroService"],
            _service_rede_service__WEBPACK_IMPORTED_MODULE_11__["RedeService"]])
    ], CadastrarCelulaComponent);
    return CadastrarCelulaComponent;
}());



/***/ }),

/***/ "./src/app/pages/celula/celula.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/celula/celula.module.ts ***!
  \***********************************************/
/*! exports provided: CelulaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CelulaModule", function() { return CelulaModule; });
/* harmony import */ var _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../componentes/igrejas/igreja-compenent.module */ "./src/app/pages/componentes/igrejas/igreja-compenent.module.ts");
/* harmony import */ var _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _cadastrar_cadastrar_celula_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cadastrar/cadastrar-celula.component */ "./src/app/pages/celula/cadastrar/cadastrar-celula.component.ts");
/* harmony import */ var _pesquisar_pesquisar_celula_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pesquisar/pesquisar-celula.component */ "./src/app/pages/celula/pesquisar/pesquisar-celula.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_interceptor_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../service/interceptor.service */ "./src/app/service/interceptor.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _componentes_endereco_endereco_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../componentes/endereco/endereco.module */ "./src/app/pages/componentes/endereco/endereco.module.ts");
/* harmony import */ var _componentes_membro_membro_component_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../componentes/membro/membro-component.module */ "./src/app/pages/componentes/membro/membro-component.module.ts");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _componentes_redes_redes_componente_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../componentes/redes/redes-componente.module */ "./src/app/pages/componentes/redes/redes-componente.module.ts");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.module.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module.ts");
/* harmony import */ var _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../pipes/pipe.module */ "./src/app/pipes/pipe.module.ts");
/* harmony import */ var _pessoas_celula_pessoas_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pessoas/celula-pessoas.component */ "./src/app/pages/celula/pessoas/celula-pessoas.component.ts");
/* harmony import */ var _diretives_diretives_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../diretives/diretives.module */ "./src/app/diretives/diretives.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var routes = [
    { path: 'cadastrar', component: _cadastrar_cadastrar_celula_component__WEBPACK_IMPORTED_MODULE_4__["CadastrarCelulaComponent"], data: { animation: 'buttons' } },
    { path: 'pesquisar', component: _pesquisar_pesquisar_celula_component__WEBPACK_IMPORTED_MODULE_5__["PesquisarCelulaComponent"], data: { animation: 'buttons' } },
    { path: 'pessoas', component: _pessoas_celula_pessoas_component__WEBPACK_IMPORTED_MODULE_19__["CelulaPessoasComponent"], data: { animation: 'buttons' } },
];
var CelulaModule = /** @class */ (function () {
    function CelulaModule() {
    }
    CelulaModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_10__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"],
                _componentes_endereco_endereco_module__WEBPACK_IMPORTED_MODULE_12__["EnderecoModule"],
                _componentes_membro_membro_component_module__WEBPACK_IMPORTED_MODULE_13__["MembroComponentModule"],
                _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_0__["IgrejasComponentModule"],
                angular2_text_mask__WEBPACK_IMPORTED_MODULE_14__["TextMaskModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatOptionModule"],
                _componentes_redes_redes_componente_module__WEBPACK_IMPORTED_MODULE_15__["RedesComponenteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDividerModule"],
                _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_16__["DialogAtivarInativarModule"],
                _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_17__["DialogConfirmPessoaModule"],
                _pipes_pipe_module__WEBPACK_IMPORTED_MODULE_18__["PipeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSlideToggleModule"],
                _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_module__WEBPACK_IMPORTED_MODULE_1__["DialogTransferirPessoaModule"],
                _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_0__["IgrejasComponentModule"],
                _diretives_diretives_module__WEBPACK_IMPORTED_MODULE_20__["DiretivesModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinnerModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _cadastrar_cadastrar_celula_component__WEBPACK_IMPORTED_MODULE_4__["CadastrarCelulaComponent"],
                _pesquisar_pesquisar_celula_component__WEBPACK_IMPORTED_MODULE_5__["PesquisarCelulaComponent"],
                _pessoas_celula_pessoas_component__WEBPACK_IMPORTED_MODULE_19__["CelulaPessoasComponent"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HTTP_INTERCEPTORS"], useClass: _service_interceptor_service__WEBPACK_IMPORTED_MODULE_7__["InterceptorService"], multi: true }
            ]
        })
    ], CelulaModule);
    return CelulaModule;
}());



/***/ }),

/***/ "./src/app/pages/celula/pesquisar/pesquisar-celula.component.html":
/*!************************************************************************!*\
  !*** ./src/app/pages/celula/pesquisar/pesquisar-celula.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">search</i>\r\n      <h1 class=\"mat-headline center-align\">Célula</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"100px\">\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"cadastrar()\">\r\n          <i class=\"material-icons\">add</i>Novo</button>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\" style=\"width: 100%;\" (blur)=\"onBlurIgreja($event)\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionIgrejaClick(option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        </div>\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Rede\" aria-label=\"Number\" matInput [formControl]=\"myControlRede\"\r\n            [matAutocomplete]=\"a\" [(ngModel)]=\"redeValue\">\r\n          <mat-autocomplete #a=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredRede | async\" [value]=\"option.nome\"\r\n              (onSelectionChange)=\"onSelectionRedeChange($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Status</mat-label>\r\n          <mat-select  [(ngModel)]=\"statusSelecionado\" id=\"status\">\r\n            <mat-option *ngFor=\"let item of comboStatus\" [value]=\"item.codigo\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div [hidden]=\"!loading\" align=\"center\" style=\"width: 100%\">\r\n        <h4>Buscando...</h4>\r\n        <mat-spinner [diameter]=\"40\"></mat-spinner>\r\n    </div>\r\n      <div *ngIf=\"celulas.length > 0\">\r\n        <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filtrar\">\r\n        </mat-form-field>\r\n      </div>\r\n      <mat-table #table [dataSource]=\"dados\" matSort style=\"margin-top: 20px;\" >\r\n        <ng-container matColumnDef=\"{{ column.id }}\" *ngFor=\"let column of columnNames\">\r\n          <mat-header-cell *matHeaderCellDef mat-sort-header> {{column.value}} </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\">\r\n            <span *ngIf=\"column.id!='id'\" matTooltip=\"{{element[column.id]}}\">\r\n              {{(element[column.id]?.length > 10) ? ((element[column.id])?.slice(0, 10) + '...') : element[column.id]}}\r\n            </span>\r\n            <span matTooltip=\"Editar\" *ngIf=\"column.id=='id'\" class=\"default-botoes\" (click)=\"editar(element.id)\"><i\r\n                class=\"material-icons\">create</i></span>\r\n            <span matTooltip=\"Mudar Status da Célula\" *ngIf=\"column.id=='id'\" class=\"default-botoes\" (click)=\"dialogStatus(element.id,element.status)\"><i\r\n                class=\"material-icons\">settings</i></span>\r\n          </mat-cell>\r\n        </ng-container>\r\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n      </mat-table>\r\n      <mat-paginator #paginator [length]=\"dados.length\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n        showFirstLastButtons></mat-paginator>\r\n      <div>\r\n        <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\" *ngIf=\"celulas.length > 0\"><i\r\n            class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./src/app/pages/celula/pesquisar/pesquisar-celula.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/celula/pesquisar/pesquisar-celula.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/celula/pesquisar/pesquisar-celula.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/celula/pesquisar/pesquisar-celula.component.ts ***!
  \**********************************************************************/
/*! exports provided: PesquisarCelulaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PesquisarCelulaComponent", function() { return PesquisarCelulaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_celula_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/celula.service */ "./src/app/service/celula.service.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.component.ts");
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
var PesquisarCelulaComponent = /** @class */ (function () {
    function PesquisarCelulaComponent(_router, _celulaService, _notifierService, _dialog, _emitirEventoService, _excelService, _avRoute, _serviceRede, _igrejaService) {
        this._router = _router;
        this._celulaService = _celulaService;
        this._notifierService = _notifierService;
        this._dialog = _dialog;
        this._emitirEventoService = _emitirEventoService;
        this._excelService = _excelService;
        this._avRoute = _avRoute;
        this._serviceRede = _serviceRede;
        this._igrejaService = _igrejaService;
        this.displayedColumns = [];
        this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.pageIndex = 0;
        this.celulas = new Array();
        this.comboStatus = ELEMENT_DATA;
        this.statusSelecionado = 'ATIVO';
        this.loading = false;
        this.myControlRede = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.comboRede = [];
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
    }
    PesquisarCelulaComponent.prototype.ngOnInit = function () {
        this.columns();
        this.getEmiter();
        this.carregarIgrejas();
        this.getList();
        this.getParams();
    };
    PesquisarCelulaComponent.prototype.applyFilter = function (value) {
        this.dados.filter = value.trim().toLowerCase();
    };
    PesquisarCelulaComponent.prototype.paginatorEvent = function (event) {
        this.pageIndex = event.pageIndex;
    };
    PesquisarCelulaComponent.prototype.columns = function () {
        this.columnNames = [
            { id: 'nome', value: 'Nome' },
            { id: 'dia', value: 'Dia' },
            { id: 'turno', value: 'Turno' },
            { id: 'horaInicio', value: 'Hora Inicio' },
            { id: 'horaFim', value: 'Hora Fim' },
            { id: 'dataAbertura', value: 'Data Abertura' },
            { id: 'idade', value: 'Idade' },
            { id: 'nomeRede', value: 'Rede' },
            { id: 'tipoCelula', value: 'Tipo Pessoas' },
            { id: 'digitalStr', value: 'Digital' },
            { id: 'id', value: 'Ação' }
        ];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
    };
    PesquisarCelulaComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (obj) {
            if (obj.data == 'status') {
                _this.getListForPorStatusAndRede();
            }
        });
    };
    PesquisarCelulaComponent.prototype.getList = function () {
        var _this = this;
        this.loading = true;
        this._celulaService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            console.log(item);
            _this.celulas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](item);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            _this.celulas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.celulas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.error.message);
        });
    };
    PesquisarCelulaComponent.prototype.cadastrar = function () {
        this._router.navigate(['/auth/celula/cadastrar']);
    };
    PesquisarCelulaComponent.prototype.exportAsXLSX = function () {
        var dados = [];
        this.celulas.forEach(function (i) {
            dados.push({
                "Nome": i.nome,
                "dia": i.dia,
                "Turno": i.turno,
                "Hora Inicio": i.horaInicio,
                "Hora Fim": i.horaFim,
                "Data Abertura": i.dataAbertura,
                "Tipo Pessoas": i.tipoCelula,
                "CEP": i.cep,
                "Logradouro": i.logradouro,
                "Número": i.numero,
                "Bairro": i.bairro,
                "Localidade": i.localidade,
                "Estado": i.uf
            });
        });
        this._excelService.exportAsExcelFile(dados, "pesquisa");
    };
    PesquisarCelulaComponent.prototype.editar = function (id) {
        // console.log(id)
        var obj = {};
        if (this.igrejaSelecionada) {
            obj.igreja = {
                id: this.igrejaSelecionada.id,
                nome: this.igrejaSelecionada.nome
            };
        }
        if (this.redeSelecionada) {
            obj.rede = {
                id: this.redeSelecionada.id,
                nome: this.redeSelecionada.nome
            };
        }
        obj.status = this.statusSelecionado;
        localStorage.setItem("pesquisar", JSON.stringify(obj));
        this._router.navigate(['/auth/celula/cadastrar'], {
            queryParams: {
                janela: 'Editar',
                id: id
            },
            skipLocationChange: true
        });
    };
    PesquisarCelulaComponent.prototype.dialogStatus = function (id, status) {
        var dialogRef = this._dialog.open(_dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_12__["DialogAtivarInativarComponent"], {
            width: '600px',
            data: {
                id: id,
                status: status,
                controller: 'celula'
            }
        });
    };
    PesquisarCelulaComponent.prototype.getListForPorStatusAndRede = function () {
        var _this = this;
        if (!this.validFields()) {
            return;
        }
        this._celulaService.getListForPorStatusAndRede(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            // console.log(item)
            _this.celulas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](item);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
        }, function (error) {
            console.log(error);
            // this._notifierService.notify(AlertType.Error, error.errors.message);
        });
    };
    PesquisarCelulaComponent.prototype.obj = function () {
        return {
            status: this.statusSelecionado,
            rede: { id: this.redeSelecionada.id }
        };
    };
    PesquisarCelulaComponent.prototype.validFields = function () {
        if (!this.igrejaSelecionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por Favor Selecione uma Igreja!");
            return false;
        }
        if (!this.redeSelecionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por Favor Selecione uma Rede!");
            return false;
        }
        if (!this.statusSelecionado) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por Favor Selecione um status!");
            return false;
        }
        return true;
    };
    PesquisarCelulaComponent.prototype.getParams = function () {
        //  console.log(this._avRoute.snapshot.queryParamMap);
        if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
            var obj = JSON.parse(localStorage.getItem("pesquisar"));
            if (obj.igreja) {
                this.igrejaSelecionada = obj.igreja;
                this.igrejaValue = obj.igreja.nome;
            }
            if (obj.rede) {
                this.redeSelecionada = obj.rede;
                this.redeValue = obj.rede.nome;
            }
            localStorage.removeItem("pesquisar");
            if (this.igrejaSelecionada && this.igrejaSelecionada) {
                this.getListForPorStatusAndRede();
            }
        }
    };
    PesquisarCelulaComponent.prototype.carregarRede = function (id) {
        var _this = this;
        this._serviceRede.getRedeIgreja(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            _this.comboRede = item;
            // console.log(item);
            _this.filteredRede = _this.myControlRede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return _this._filterRede(value, _this.comboRede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar as redes!");
        });
    };
    PesquisarCelulaComponent.prototype._filterRede = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    PesquisarCelulaComponent.prototype.onSelectionRedeChange = function ($event, option) {
        this.redeSelecionada = option;
        this.getListForPorStatusAndRede();
    };
    PesquisarCelulaComponent.prototype.carregarIgrejas = function () {
        var _this = this;
        this._igrejaService.getListIdAndName().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejas = item;
            // console.log(item);
            _this.filteredIgreja = _this.myControlIgreja.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return _this._filterIgreja(value, _this.comboIgrejas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar igrejas!");
        });
    };
    PesquisarCelulaComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    PesquisarCelulaComponent.prototype.onBlurIgreja = function (event) {
        if (!event.target.value) {
            this.filteredRede = null;
        }
    };
    PesquisarCelulaComponent.prototype.onSelectionIgrejaClick = function (value) {
        this.igrejaSelecionada = value;
        this.carregarRede(this.igrejaSelecionada.id);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], PesquisarCelulaComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paginator'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], PesquisarCelulaComponent.prototype, "paginator", void 0);
    PesquisarCelulaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pesquisar-celula',
            template: __webpack_require__(/*! ./pesquisar-celula.component.html */ "./src/app/pages/celula/pesquisar/pesquisar-celula.component.html"),
            styles: [__webpack_require__(/*! ./pesquisar-celula.component.scss */ "./src/app/pages/celula/pesquisar/pesquisar-celula.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _service_celula_service__WEBPACK_IMPORTED_MODULE_7__["CelulaService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_4__["NotifierService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_8__["EmitirEventoService"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_9__["ExcelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _service_rede_service__WEBPACK_IMPORTED_MODULE_11__["RedeService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_10__["IgrejaService"]])
    ], PesquisarCelulaComponent);
    return PesquisarCelulaComponent;
}());



/***/ }),

/***/ "./src/app/pages/celula/pessoas/celula-pessoas.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/celula/pessoas/celula-pessoas.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">supervisor_account</i>\r\n      <h1 class=\"mat-headline center-align\">Pessoas</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div *hasPermission=\"['combo_igreja_pessoa']\" >\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\" style=\"width: 100%;\" (blur)=\"onBlurIgreja($event)\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionIgrejaClick(option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <div *hasPermission=\"['combo_rede_pessoa']\" >\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Rede\" aria-label=\"Number\" matInput [formControl]=\"myControlRede\"\r\n            [matAutocomplete]=\"a\" [(ngModel)]=\"redeValue\" (blur)=\"onBlurRede($event)\">\r\n          <mat-autocomplete #a=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredRede | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionRedeClick($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <div *hasPermission=\"['combo_celula_pessoa']\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Celula\" aria-label=\"Number\" matInput [formControl]=\"myControlCelula\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"celulaValue\" (blur)=\"onBlurCelula($event)\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredCelula | async\" [value]=\"option.nome\"\r\n              (onSelectionChange)=\"onSelectionCelulaChange($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <form form [formGroup]=\"form\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Pessoa</mat-label>\r\n          <mat-select  id=\"pessoa\" formControlName=\"tipo\" >\r\n            <mat-option *ngFor=\"let item of tipoPessoas\" [value]=\"item.key\" (click)=\"onSelectionClick(item.key)\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n       </form>\r\n       <div [hidden]=\"!loading\" align=\"center\" style=\"width: 100%\">\r\n          <h4>Buscando...</h4>\r\n          <mat-spinner [diameter]=\"40\"></mat-spinner>\r\n      </div>\r\n      <div [hidden]=\"pessoas.length == 0\">\r\n       <div>\r\n        <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filtrar\">\r\n        </mat-form-field>\r\n      </div>\r\n        <mat-table #table [dataSource]=\"dados\" matSort style=\"margin-top: 20px;\" >\r\n          <ng-container matColumnDef=\"{{ column.id }}\" *ngFor=\"let column of columnNames\">\r\n            <mat-header-cell *matHeaderCellDef mat-sort-header> {{column.value}} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\">\r\n              <span *ngIf=\"column.id!='id'\" matTooltip=\"{{element[column.id]}}\">\r\n                {{(element[column.id].length > 20) ? ((element[column.id]).slice(0, 20) + '...') : element[column.id]}}\r\n              </span>\r\n              <span matTooltip=\"Transferir\" *ngIf=\"column.id=='id' && hasPermission('combo_celula_pessoa')\" class=\"default-botoes\" (click)=\"transferir(element.id)\">\r\n                <i class=\"material-icons\">swap_horiz</i>\r\n              </span>\r\n            </mat-cell>\r\n          </ng-container>\r\n          <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n          <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n        <mat-paginator #paginator [length]=\"dados.length\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n          showFirstLastButtons></mat-paginator>\r\n        <div>\r\n            <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\" *ngIf=\"pessoas.length > 0\"><i\r\n                class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n          </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/celula/pessoas/celula-pessoas.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/celula/pessoas/celula-pessoas.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/celula/pessoas/celula-pessoas.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/celula/pessoas/celula-pessoas.component.ts ***!
  \******************************************************************/
/*! exports provided: CelulaPessoasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CelulaPessoasComponent", function() { return CelulaPessoasComponent; });
/* harmony import */ var _service_celula_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../service/celula.service */ "./src/app/service/celula.service.ts");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.ts");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/user.service */ "./src/app/service/user.service.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var CelulaPessoasComponent = /** @class */ (function () {
    function CelulaPessoasComponent(_serviceRede, _notifierService, _emitirEventoService, _dialog, _service, _userService, _igrejaService, _excelService) {
        this._serviceRede = _serviceRede;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._dialog = _dialog;
        this._service = _service;
        this._userService = _userService;
        this._igrejaService = _igrejaService;
        this._excelService = _excelService;
        this.myControlRede = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
        this.comboRede = [];
        this.myControlCelula = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
        this.comboCelulas = [];
        this.pessoas = new Array();
        this.displayedColumns = [];
        this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"]();
        this.pageIndex = 0;
        this.loading = false;
        this.tipoPessoas = [
            { key: 'M', value: 'Membro' },
            { key: 'V', value: 'Visitante' }
        ];
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
    }
    CelulaPessoasComponent.prototype.ngOnInit = function () {
        this.getEmiter();
        this.columns();
        this._buildForm();
        this.carregarIgrejas();
    };
    CelulaPessoasComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'transferido') {
                _this.onSelectionClick(item.data);
            }
        });
    };
    CelulaPessoasComponent.prototype.columns = function () {
        this.columnNames = [
            { id: 'nomeCompleto', value: 'Nome' },
            { id: 'dataNascimento', value: 'Data Nascimento' },
            { id: 'rg', value: 'RG' },
            { id: 'cpf', value: 'CPF' },
            { id: 'estadoCivil', value: 'Estado Civil' },
            { id: 'sexo', value: 'Sexo' },
            { id: 'profissao', value: 'Profissao' },
            { id: 'id', value: 'Ação' }
        ];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
    };
    CelulaPessoasComponent.prototype.carregarRede = function (id) {
        var _this = this;
        this._serviceRede.getRedeIgreja(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.comboRede = item;
            // console.log(item);
            _this.filteredRede = _this.myControlRede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterRede(value, _this.comboRede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar as redes!");
        });
    };
    CelulaPessoasComponent.prototype._filterRede = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CelulaPessoasComponent.prototype.onSelectionRedeClick = function ($event, option) {
        this.redeSelecionada = option;
        this.carregarCelula(this.redeSelecionada.id);
    };
    CelulaPessoasComponent.prototype.onSelectionClick = function (key) {
        if (!this._userService.hasPermission("combo_rede_pessoa")) {
            var user = this._userService.getMembroLogado();
            // console.log(user)
            if (user.rede) {
                this.celulaSelecionada = user.celula;
            }
        }
        if (this.celulaSelecionada) {
            switch (key) {
                case 'M':
                    this.tipoPessoaSelecionado = 'M';
                    this.getMembros(this.celulaSelecionada.id);
                    break;
                case 'V':
                    this.tipoPessoaSelecionado = 'V';
                    this.getVisitantes(this.celulaSelecionada.id);
                    break;
            }
        }
    };
    CelulaPessoasComponent.prototype.getMembros = function (id) {
        var _this = this;
        this.loading = true;
        this._service.getMembros(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            console.log(item);
            _this.pessoas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](_this.pessoas);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
            console.log(_this.paginator);
        }, function (error) {
            // console.log(error);
            _this.pessoas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](_this.pessoas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.error.message);
        });
    };
    CelulaPessoasComponent.prototype.getVisitantes = function (id) {
        var _this = this;
        this._service.getVisitantes(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.pessoas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](_this.pessoas);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            // console.log(error);
            _this.pessoas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](_this.pessoas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.error.message);
        });
    };
    CelulaPessoasComponent.prototype.transferir = function (id) {
        var metodo;
        switch (this.tipoPessoaSelecionado) {
            case 'M':
                metodo = 'transferirIgrejaMembro';
                break;
            case 'V':
                metodo = 'transferirIgrejaVisitante';
                break;
        }
        var dialogRef = this._dialog.open(_dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_9__["DialogTransferirPessoaComponent"], {
            width: '600px',
            data: {
                pessoaId: id,
                metodo: metodo,
                controller: 'celula',
                tipoPessoa: this.tipoPessoaSelecionado,
                redeId: this.redeSelecionada.id
            }
        });
    };
    CelulaPessoasComponent.prototype.carregarCelula = function (id) {
        var _this = this;
        this._service.getCelulaRede(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.comboCelulas = item;
            // console.log(item);
            _this.filteredCelula = _this.myControlCelula.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterCelula(value, _this.comboCelulas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar as células!");
        });
    };
    CelulaPessoasComponent.prototype._filterCelula = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CelulaPessoasComponent.prototype.onSelectionCelulaChange = function ($event, option) {
        this.celulaSelecionada = option;
    };
    CelulaPessoasComponent.prototype.applyFilter = function (value) {
        this.dados.filter = value.trim().toLowerCase();
    };
    CelulaPessoasComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            'tipo': new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](false),
        });
    };
    CelulaPessoasComponent.prototype.onBlurIgreja = function (event) {
        if (!event.target.value) {
            this.pessoas = [];
            this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](this.pessoas);
            this.form.reset();
            this.redeSelecionada = null;
            this.redeValue = '';
        }
    };
    CelulaPessoasComponent.prototype.onBlurRede = function (event) {
        if (!event.target.value) {
            this.pessoas = [];
            this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](this.pessoas);
            this.form.reset();
        }
    };
    CelulaPessoasComponent.prototype.onBlurCelula = function (event) {
        if (!event.target.value) {
            this.pessoas = [];
            this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](this.pessoas);
            this.form.reset();
        }
    };
    CelulaPessoasComponent.prototype.carregarIgrejas = function () {
        var _this = this;
        this._igrejaService.getListIdAndName().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejas = item;
            // console.log(item);
            _this.filteredIgreja = _this.myControlIgreja.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (value) { return _this._filterIgreja(value, _this.comboIgrejas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar igrejas!");
        });
    };
    CelulaPessoasComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CelulaPessoasComponent.prototype.onSelectionIgrejaClick = function (value) {
        this.igrejaSelecionada = value;
        this.carregarRede(this.igrejaSelecionada.id);
    };
    CelulaPessoasComponent.prototype.exportAsXLSX = function () {
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
    CelulaPessoasComponent.prototype.hasPermission = function (param) {
        return this._userService.hasPermission(param);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"])
    ], CelulaPessoasComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])('paginator'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"])
    ], CelulaPessoasComponent.prototype, "paginator", void 0);
    CelulaPessoasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-celula-pessoas',
            template: __webpack_require__(/*! ./celula-pessoas.component.html */ "./src/app/pages/celula/pessoas/celula-pessoas.component.html"),
            styles: [__webpack_require__(/*! ./celula-pessoas.component.scss */ "./src/app/pages/celula/pessoas/celula-pessoas.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_rede_service__WEBPACK_IMPORTED_MODULE_1__["RedeService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__["EmitirEventoService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialog"],
            _service_celula_service__WEBPACK_IMPORTED_MODULE_0__["CelulaService"],
            _service_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_11__["IgrejaService"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_12__["ExcelService"]])
    ], CelulaPessoasComponent);
    return CelulaPessoasComponent;
}());



/***/ }),

/***/ "./src/app/service/tipo-lideranca.service.ts":
/*!***************************************************!*\
  !*** ./src/app/service/tipo-lideranca.service.ts ***!
  \***************************************************/
/*! exports provided: TipoLiderancaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoLiderancaService", function() { return TipoLiderancaService; });
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




var TipoLiderancaService = /** @class */ (function () {
    function TipoLiderancaService(http) {
        this.http = http;
        this._url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].url + "tipoLiderancaCelula/";
    }
    TipoLiderancaService.prototype.getList = function () {
        return this.http.get(this._url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) { return response; }));
    };
    TipoLiderancaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TipoLiderancaService);
    return TipoLiderancaService;
}());



/***/ })

}]);
//# sourceMappingURL=pages-celula-celula-module.js.map