(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-rede-rede-module"],{

/***/ "./src/app/pages/rede/cadastrar/cadastrar-rede.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/rede/cadastrar/cadastrar-rede.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder button-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <span><i class=\"material-icons\">add</i></span>\r\n      <h1 class=\"mat-headline center-align\">Rede</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <form form [formGroup]=\"form\">\r\n        <div fxLayout=\"row\"  fxLayoutGap=\"20px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <input matInput class=\"input-upper\" placeholder=\"Nome\" formControlName=\"nome\" id=\"nome\" required>\r\n            <mat-error *ngIf=\"!form.controls.nome.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n          <mat-form-field>\r\n            <mat-label>Selecione...</mat-label>\r\n            <mat-select formControlName=\"redes\" id=\"comboRede\" >\r\n              <mat-option *ngFor=\"let item of comboRede\" [value]=\"item.rede\">\r\n                {{item.descRede}}\r\n              </mat-option>\r\n            </mat-select>\r\n            <mat-error *ngIf=\"!form.controls.redes.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n          <mat-form-field>\r\n            <input matInput [matDatepicker]=\"picker\"  placeholder=\"Data de abertura\" formControlName=\"dataAbertura\" readonly>\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker></mat-datepicker>\r\n            <mat-error *ngIf=\"!form.controls.dataAbertura.valid\">Campo Obrigatório</mat-error>\r\n          </mat-form-field>\r\n        </div>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"100px\">\r\n          <mat-form-field class=\"full-width-field\">\r\n            <textarea matInput placeholder=\"Descrição\" formControlName=\"descricao\"></textarea>\r\n          </mat-form-field>\r\n        </div>\r\n      </form>\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"au\" style=\"width: 100%;\"  [(ngModel)]=\"igrejaValue\">\r\n          <mat-autocomplete #au=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionIgrejaClick($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" aria-label=\"Number\" matInput [formControl]=\"myControlMembro\" [matAutocomplete]=\"auto\" placeholder=\"Lideres\"\r\n            [(ngModel)]=\"membroValue\" required>\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredMembro | async\" [value]=\"option.nomeCompleto\"\r\n              (onSelectionChange)=\"onSelectionChangedMembro($event,option)\">\r\n              {{option.nomeCompleto}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"adicionar()\">\r\n          <i class=\"material-icons\">add</i>adicionar</button>\r\n      </div>\r\n      <br/>\r\n      <div class=\"table-responsive\" *ngIf=\"membros.length > 0\">\r\n        <br/>\r\n        <br/>\r\n      <mat-divider></mat-divider>\r\n        <br/>\r\n        <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\" class=\"default-font-color\">\r\n          <i class=\"material-icons\">face</i>\r\n          <h1 class=\"mat-subheading-2 center-align\">Lideres</h1>\r\n        </div>\r\n        <br/>\r\n        <table>\r\n          <thead class=\"text-primary\">\r\n            <th></th>\r\n            <th>Nome</th>\r\n            <th>Célula</th>\r\n            <th>Igreja</th>\r\n            <th>Remover</th>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let m of membros ;let i= index\">\r\n              <td>{{ i+1}}</td>\r\n              <td>{{ m.nomeCompleto}}</td>\r\n              <td>{{ m.celula?.nome}}</td>\r\n              <td>{{ m.igreja?.nome}}</td>\r\n              <td><span style=\"color: #1d68a5;cursor: pointer\" (click)=\"dialogRemover(i,m)\"><i\r\n                    class=\"material-icons\">delete</i></span></td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <br/>\r\n      <br/>\r\n      <div>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"salvar()\">\r\n          <i class=\"material-icons\">save</i>Salvar</button>\r\n        <div fxFlex></div>\r\n        <button mat-raised-button color=\"warn\" type=\"submit\" (click)=\"voltar()\">\r\n          <i class=\"material-icons\">reply</i>Voltar</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/rede/cadastrar/cadastrar-rede.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/rede/cadastrar/cadastrar-rede.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/rede/cadastrar/cadastrar-rede.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/rede/cadastrar/cadastrar-rede.component.ts ***!
  \******************************************************************/
/*! exports provided: CadastrarRedeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CadastrarRedeComponent", function() { return CadastrarRedeComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _service_membro_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../service/membro.service */ "./src/app/service/membro.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var CadastrarRedeComponent = /** @class */ (function () {
    function CadastrarRedeComponent(_service, _notifierService, _emitirEventoService, _datePipe, _avRoute, _router, _dateAdapter, _dialog, _membroService, _igrejaService) {
        this._service = _service;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._datePipe = _datePipe;
        this._avRoute = _avRoute;
        this._router = _router;
        this._dateAdapter = _dateAdapter;
        this._dialog = _dialog;
        this._membroService = _membroService;
        this._igrejaService = _igrejaService;
        this.comboRede = [];
        this.myControlMembro = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.comboMembro = [];
        this.membros = [];
        this.rede = {};
        this.label = "Lideres";
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
    }
    CadastrarRedeComponent.prototype.ngOnInit = function () {
        this._dateAdapter.setLocale("br");
        this._buildForm();
        this.getComboRedes();
        this.getEmiter();
        this.getParams();
        this.carregarIgrejas();
    };
    CadastrarRedeComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'nome': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'dataAbertura': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            'descricao': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
            'redes': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
        });
    };
    CadastrarRedeComponent.prototype.getComboRedes = function () {
        var _this = this;
        this._service.tiposDeRedes().subscribe(function (item) {
            _this.comboRede = item;
            // console.log(item);
        });
    };
    CadastrarRedeComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'confirm-dialog-pessoa-rede') {
                _this.membros.splice(item.data, 1);
            }
        });
    };
    CadastrarRedeComponent.prototype.adicionar = function () {
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
    };
    CadastrarRedeComponent.prototype.save = function () {
        var _this = this;
        // console.log(this.obj());
        this._service.save(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["take"])(1)).subscribe(function (item) {
            _this.voltar();
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.message);
        });
    };
    CadastrarRedeComponent.prototype.obj = function () {
        return {
            nome: this.form.controls['nome'].value,
            igreja: this.igrejaSelecionada,
            membros: this.membros,
            dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
            rede: this.form.controls['redes'].value,
            descricao: this.form.controls['descricao'].value
        };
    };
    CadastrarRedeComponent.prototype.setEmiter = function () {
        this._emitirEventoService.emitir("clear", "");
    };
    // clean() {
    //   this.form.controls['nome'].patchValue('');
    //   this.form.controls['redes'].patchValue('');
    //   this.form.controls['descricao'].patchValue('');
    //   this.form.controls['dataAbertura'].patchValue('');
    //   this.igrejaSelecionada = "";
    //   this.membros = [];
    //   this.setEmiter();
    // }
    CadastrarRedeComponent.prototype.getParams = function () {
        if (this._avRoute.snapshot.queryParamMap.get("id")) {
            this.id = this._avRoute.snapshot.queryParamMap.get("id");
            this.getRede(this.id);
        }
    };
    CadastrarRedeComponent.prototype.getRede = function (id) {
        var _this = this;
        this._service.getRede(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["take"])(1)).subscribe(function (item) {
            //  console.log(item)
            _this.form.controls['nome'].patchValue(item.nome);
            _this.form.controls['descricao'].patchValue(item.descricao);
            _this.form.controls['redes'].patchValue(item.rede);
            _this.form.controls['dataAbertura'].patchValue(new Date(item.dataAbertutaToDate));
            if (item.igreja) {
                _this.getIgreja(item.igreja);
            }
            _this.carregarPessoas(item.membros);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.errors.message);
        });
    };
    CadastrarRedeComponent.prototype.carregarPessoas = function (item) {
        if (item) {
            for (var i = 0; i < item.length; i++) {
                var pessoa = {};
                pessoa.id = item[i].id;
                pessoa.nomeCompleto = item[i].nomeCompleto;
                pessoa.celula = item[i].celula;
                pessoa.igreja = item[i].igreja;
                pessoa.cpf = item[i].cpf;
                this.membros.push(pessoa);
            }
        }
    };
    CadastrarRedeComponent.prototype.getIgreja = function (igreja) {
        console.log(igreja);
        this.igrejaSelecionada = igreja;
        this.igrejaValue = igreja.nome;
    };
    CadastrarRedeComponent.prototype.voltar = function () {
        this._router.navigate(['/auth/rede/pesquisar'], {
            queryParams: {
                pesquisar: 'pesquisar',
            },
            skipLocationChange: true
        });
    };
    CadastrarRedeComponent.prototype.salvar = function () {
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
    CadastrarRedeComponent.prototype.update = function () {
        var _this = this;
        var obj = {};
        obj = this.obj();
        obj.id = Number.parseInt(this.id);
        this._service.update(obj).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["take"])(1)).subscribe(function (item) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Success, item.value);
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.message);
        });
    };
    CadastrarRedeComponent.prototype.dialogRemover = function (i, item) {
        var dialogRef = this._dialog.open(_dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_component__WEBPACK_IMPORTED_MODULE_10__["DialogConfirmPessoaComponent"], {
            width: '600px',
            data: {
                id: Number.parseInt(this.id),
                idPessoa: item.id,
                controller: "rede",
                item: i
            }
        });
    };
    CadastrarRedeComponent.prototype.carregarMembro = function (id) {
        var _this = this;
        this._membroService.getMembroIgreja(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.comboMembro = item;
            _this.filteredMembro = _this.myControlMembro.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["map"])(function (value) { return _this._filterMembros(value, _this.comboMembro); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar os membros!");
        });
    };
    CadastrarRedeComponent.prototype._filterMembros = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarRedeComponent.prototype.onSelectionChangedMembro = function ($event, option) {
        this.membroSelecionado = option;
    };
    CadastrarRedeComponent.prototype.validFields = function () {
        if (!this.form.controls['nome'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Informe o nome da Rede!");
            return false;
        }
        if (!this.form.controls['dataAbertura'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Informe a Data de Abertura!");
            return false;
        }
        if (!this.form.controls['redes'].value) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Informe uma tipo de rede!");
            return false;
        }
        if (!this.igrejaSelecionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por favor Informe uma Igreja!");
            return false;
        }
        if (this.membros.length == 0) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por adicione os lideres!");
            return false;
        }
        return true;
    };
    CadastrarRedeComponent.prototype.onSelectionIgrejaClick = function ($event, option) {
        this.igrejaSelecionada = option;
        this.carregarMembro(this.igrejaSelecionada.id);
    };
    CadastrarRedeComponent.prototype.carregarIgrejas = function () {
        var _this = this;
        this._igrejaService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejas = item;
            // console.log(item);
            _this.filteredIgreja = _this.myControlIgreja.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["map"])(function (value) { return _this._filterIgreja(value, _this.comboIgrejas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Erro ao carregar igrejas!");
        });
    };
    CadastrarRedeComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    CadastrarRedeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cadastrar-rede',
            template: __webpack_require__(/*! ./cadastrar-rede.component.html */ "./src/app/pages/rede/cadastrar/cadastrar-rede.component.html"),
            styles: [__webpack_require__(/*! ./cadastrar-rede.component.scss */ "./src/app/pages/rede/cadastrar/cadastrar-rede.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_rede_service__WEBPACK_IMPORTED_MODULE_9__["RedeService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__["EmitirEventoService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _service_membro_service__WEBPACK_IMPORTED_MODULE_12__["MembroService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_8__["IgrejaService"]])
    ], CadastrarRedeComponent);
    return CadastrarRedeComponent;
}());



/***/ }),

/***/ "./src/app/pages/rede/pesquisar/pesquisar-rede.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/rede/pesquisar/pesquisar-rede.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">search</i>\r\n      <h1 class=\"mat-headline center-align\">Rede</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"100px\">\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" (click)=\"cadastrar()\">\r\n          <i class=\"material-icons\">add</i>Novo</button>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\" style=\"width: 100%;\" (blur)=\"onBlurIgreja($event)\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionIgrejaClick(option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        </div >\r\n      <div>\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Status</mat-label>\r\n          <mat-select  [(ngModel)]=\"statusSelecionado\" id=\"status\">\r\n            <mat-option *ngFor=\"let item of comboStatus\" [value]=\"item.codigo\"\r\n             (click)=\"onSelection()\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <br />\r\n      <br />\r\n      <div [hidden]=\"redes.length == 0 \">\r\n        <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filtrar\">\r\n        </mat-form-field>\r\n      </div>\r\n      <mat-table #table [dataSource]=\"dados\" matSort style=\"margin-top: 20px;\" [hidden]=\"redes.length == 0\">\r\n        <ng-container matColumnDef=\"{{ column.id }}\" *ngFor=\"let column of columnNames\">\r\n          <mat-header-cell *matHeaderCellDef mat-sort-header> {{column.value}} </mat-header-cell>\r\n          <mat-cell *matCellDef=\"let element\">\r\n            <span *ngIf=\"column.id!='id'\" matTooltip=\"{{element[column.id]}}\">\r\n              {{(element[column.id].length > 20) ? ((element[column.id]).slice(0, 20) + '...') : element[column.id]}}\r\n            </span>\r\n            <span *ngIf=\"column.id=='id'\" style=\"cursor: pointer;color:#1d68a5\" matTooltip=\"Editar\" (click)=\"editar(element.id)\"><i\r\n                class=\"material-icons\">create</i></span>\r\n            <span *ngIf=\"column.id=='id'\" style=\"cursor: pointer;color:#1d68a5\" matTooltip=\"Status\" (click)=\"status(element.id)\"><i\r\n                class=\"material-icons\">settings</i></span>\r\n          </mat-cell>\r\n        </ng-container>\r\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n      </mat-table>\r\n      <mat-paginator #paginator [length]=\"dados.length\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n        showFirstLastButtons></mat-paginator>\r\n        <div *ngIf=\"redes.lenght > 0 \">\r\n          <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\"><i\r\n            class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n        </div>\r\n      </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./src/app/pages/rede/pesquisar/pesquisar-rede.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/rede/pesquisar/pesquisar-rede.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/rede/pesquisar/pesquisar-rede.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/rede/pesquisar/pesquisar-rede.component.ts ***!
  \******************************************************************/
/*! exports provided: PesquisarRedeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PesquisarRedeComponent", function() { return PesquisarRedeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.component.ts");
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
var PesquisarRedeComponent = /** @class */ (function () {
    function PesquisarRedeComponent(_router, _redeService, _notifierService, _dialog, _emitirEventoService, _excelService, _avRoute, _igrejaService) {
        this._router = _router;
        this._redeService = _redeService;
        this._notifierService = _notifierService;
        this._dialog = _dialog;
        this._emitirEventoService = _emitirEventoService;
        this._excelService = _excelService;
        this._avRoute = _avRoute;
        this._igrejaService = _igrejaService;
        this.displayedColumns = [];
        this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.pageIndex = 0;
        this.redes = new Array();
        this.statusSelecionado = 'ATIVO';
        this.comboStatus = ELEMENT_DATA;
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.loading = false;
    }
    PesquisarRedeComponent.prototype.ngOnInit = function () {
        this.columns();
        this.getList();
        this.carregarIgrejas();
        this.getEmiter();
        this.getParams();
    };
    PesquisarRedeComponent.prototype.applyFilter = function (value) {
        this.dados.filter = value.trim().toLowerCase();
    };
    PesquisarRedeComponent.prototype.paginatorEvent = function (event) {
        this.pageIndex = event.pageIndex;
    };
    PesquisarRedeComponent.prototype.columns = function () {
        this.columnNames = [
            { id: 'nome', value: 'Nome' },
            { id: 'dataAbertura', value: 'Data Abertura' },
            { id: 'idade', value: 'Idade' },
            { id: 'nomeIgreja', value: 'Igreja' },
            { id: 'descricao', value: 'Descrição' },
            { id: 'id', value: 'Ação' }
        ];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
    };
    PesquisarRedeComponent.prototype.cadastrar = function () {
        localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
        this._router.navigate(['/auth/rede/cadastrar'], {
            queryParams: {
                janela: 'Nova',
            },
            skipLocationChange: true
        });
    };
    PesquisarRedeComponent.prototype.editar = function (id) {
        var obj = {};
        if (this.igrejaSelecionada) {
            obj.igreja = {
                id: this.igrejaSelecionada.id,
                nome: this.igrejaSelecionada.nome
            };
        }
        obj.status = this.statusSelecionado;
        localStorage.setItem("pesquisar", JSON.stringify(obj));
        this._router.navigate(['/auth/rede/cadastrar'], {
            queryParams: {
                janela: 'Editar',
                id: id
            },
            skipLocationChange: true
        });
    };
    PesquisarRedeComponent.prototype.getList = function () {
        var _this = this;
        this.loading = true;
        this._redeService.getList().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            _this.redes = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](item);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            _this.redes = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.redes);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.errors.message);
        });
    };
    PesquisarRedeComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (obj) {
            if (obj.data == 'status') {
                _this.obterListaRedes();
            }
        });
    };
    PesquisarRedeComponent.prototype.exportAsXLSX = function () {
        var dados = [];
        this.redes.forEach(function (i) {
            dados.push({
                "Nome": i.nome,
                "Data Abertura": i.dataAbertura,
                "Igreja": i.nomeIgreja,
                "Descrição": i.descricao,
            });
        });
        this._excelService.exportAsExcelFile(dados, "pesquisa");
    };
    PesquisarRedeComponent.prototype.obterListaRedes = function () {
        var _this = this;
        if (!this.validFields()) {
            return;
        }
        this._redeService.obterListaRedes(this.obj()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1)).subscribe(function (item) {
            // console.log(item)
            _this.redes = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](item);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
        }, function (error) {
            console.log(error);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, error.errors.message);
        });
    };
    PesquisarRedeComponent.prototype.validFields = function () {
        if (!this.igrejaSelecionada) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por Favor Selecione uma Igreja!");
            return false;
        }
        if (!this.statusSelecionado) {
            this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_6__["AlertType"].Error, "Por Favor Selecione um status!");
            return false;
        }
        return true;
    };
    PesquisarRedeComponent.prototype.obj = function () {
        return {
            igreja: { id: this.igrejaSelecionada.id },
            status: this.statusSelecionado
        };
    };
    PesquisarRedeComponent.prototype.status = function (id) {
        var dialogRef = this._dialog.open(_dialog_dialog_ativar_inativar_dialog_ativar_inativar_component__WEBPACK_IMPORTED_MODULE_11__["DialogAtivarInativarComponent"], {
            width: '600px',
            data: {
                id: id,
                controller: 'rede'
            }
        });
    };
    PesquisarRedeComponent.prototype.getParams = function () {
        // console.log(this._avRoute.snapshot.queryParamMap);
        if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
            var obj = JSON.parse(localStorage.getItem("pesquisar"));
            if (obj.igreja) {
                this.igrejaSelecionada = obj.igreja;
                this.igrejaValue = obj.igreja.nome;
                this.obterListaRedes();
            }
        }
        localStorage.removeItem("pesquisar");
        // this.getListForStatus(this.statusSelecionado);
    };
    PesquisarRedeComponent.prototype.onSelectionIgrejaClick = function (value) {
        this.igrejaSelecionada = value;
        this.obterListaRedes();
    };
    PesquisarRedeComponent.prototype.carregarIgrejas = function () {
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
    PesquisarRedeComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], PesquisarRedeComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('paginator'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], PesquisarRedeComponent.prototype, "paginator", void 0);
    PesquisarRedeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pesquisar-rede',
            template: __webpack_require__(/*! ./pesquisar-rede.component.html */ "./src/app/pages/rede/pesquisar/pesquisar-rede.component.html"),
            styles: [__webpack_require__(/*! ./pesquisar-rede.component.scss */ "./src/app/pages/rede/pesquisar/pesquisar-rede.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _service_rede_service__WEBPACK_IMPORTED_MODULE_10__["RedeService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_4__["NotifierService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_7__["EmitirEventoService"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_8__["ExcelService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_9__["IgrejaService"]])
    ], PesquisarRedeComponent);
    return PesquisarRedeComponent;
}());



/***/ }),

/***/ "./src/app/pages/rede/pessoas/rede-pessoas.component.html":
/*!****************************************************************!*\
  !*** ./src/app/pages/rede/pessoas/rede-pessoas.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" class=\"components-container-gt-xs\" [ngClass.xs]=\"'components-container-xs'\" fxLayoutGap=\"20px\">\r\n  <div fxFlex class=\"cdk-component-holder mat-elevation-z4\">\r\n    <mat-toolbar class=\"cdk-header\">\r\n      <i class=\"material-icons\">supervisor_account</i>\r\n      <h1 class=\"mat-headline center-align\">Pessoas</h1>\r\n    </mat-toolbar>\r\n    <div class=\"cdk-container\">\r\n      <div *hasPermission=\"['combo_igreja_pessoa']\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Igreja\" aria-label=\"Number\" matInput [formControl]=\"myControlIgreja\"\r\n            [matAutocomplete]=\"auto\" [(ngModel)]=\"igrejaValue\" style=\"width: 100%;\" (blur)=\"onBlurIgreja($event)\">\r\n          <mat-autocomplete #auto=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredIgreja | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionIgrejaClick(option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n        </div>\r\n      <div *hasPermission=\"['combo_rede_pessoa']\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <input type=\"text\" placeholder=\"Rede\" aria-label=\"Number\" matInput [formControl]=\"myControlRede\"\r\n            [matAutocomplete]=\"a\" [(ngModel)]=\"redeValue\" (blur)=\"onBlurRede($event)\">\r\n          <mat-autocomplete #a=\"matAutocomplete\">\r\n            <mat-option *ngFor=\"let option of filteredRede | async\" [value]=\"option.nome\"\r\n              (click)=\"onSelectionRedeClick($event,option)\">\r\n              {{option.nome}}\r\n            </mat-option>\r\n          </mat-autocomplete>\r\n        </mat-form-field>\r\n      </div>\r\n      <form form [formGroup]=\"form\">\r\n        <mat-form-field class=\"full-width-field\">\r\n          <mat-label>Pessoa</mat-label>\r\n          <mat-select  id=\"pessoa\" formControlName=\"tipo\" >\r\n            <mat-option *ngFor=\"let item of tipoPessoas\" [value]=\"item.key\" (click)=\"onSelectionClick(item.key)\">\r\n              {{item.value}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n       </form>\r\n       <div [hidden]=\"!loading\" align=\"center\" style=\"width: 100%\">\r\n        <h4>Buscando...</h4>\r\n        <mat-spinner [diameter]=\"40\"></mat-spinner>\r\n      </div>\r\n      <div [hidden]=\"pessoas.length == 0\">\r\n       <div>\r\n        <mat-form-field floatPlaceholder=\"never\" style=\"color: black; width: 100%;\">\r\n          <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filtrar\">\r\n        </mat-form-field>\r\n      </div>\r\n        <mat-table #table [dataSource]=\"dados\" matSort style=\"margin-top: 20px;\" >\r\n          <ng-container matColumnDef=\"{{ column.id }}\" *ngFor=\"let column of columnNames\">\r\n            <mat-header-cell *matHeaderCellDef mat-sort-header> {{column.value}} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\">\r\n              <span *ngIf=\"column.id!='id'\" matTooltip=\"{{element[column.id]}}\">\r\n                {{(element[column.id].length > 20) ? ((element[column.id]).slice(0, 20) + '...') : element[column.id]}}\r\n              </span>\r\n              <span matTooltip=\"Transferir\" *ngIf=\"column.id=='id' && hasPermission('combo_rede_pessoa')\" class=\"default-botoes\" (click)=\"transferir(element.id)\">\r\n                <i class=\"material-icons\">swap_horiz</i>\r\n              </span>\r\n            </mat-cell>\r\n          </ng-container>\r\n          <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n          <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n        </mat-table>\r\n        <mat-paginator #paginator [length]=\"dados.length\" [pageSize]=\"5\" [pageSizeOptions]=\"[5, 10, 20]\"\r\n          showFirstLastButtons></mat-paginator>\r\n          <div>\r\n            <button mat-raised-button color=\"success\" (click)=\"exportAsXLSX()\" *ngIf=\"pessoas.length > 0\"><i\r\n                class=\"material-icons\">vertical_align_bottom</i>Exportar XLSX</button>\r\n          </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/rede/pessoas/rede-pessoas.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/pages/rede/pessoas/rede-pessoas.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/rede/pessoas/rede-pessoas.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/pages/rede/pessoas/rede-pessoas.component.ts ***!
  \**************************************************************/
/*! exports provided: RedePessoasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedePessoasComponent", function() { return RedePessoasComponent; });
/* harmony import */ var _service_rede_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../service/rede.service */ "./src/app/service/rede.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _model_alert_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../model/alert-type */ "./src/app/model/alert-type.ts");
/* harmony import */ var _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/emitir-evento.service */ "./src/app/service/emitir-evento.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.component.ts");
/* harmony import */ var _service_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../service/user.service */ "./src/app/service/user.service.ts");
/* harmony import */ var _service_igreja_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../service/igreja.service */ "./src/app/service/igreja.service.ts");
/* harmony import */ var _service_excel_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../service/excel.service */ "./src/app/service/excel.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var RedePessoasComponent = /** @class */ (function () {
    function RedePessoasComponent(_service, _notifierService, _emitirEventoService, _dialog, _userService, _igrejaService, _excelService) {
        this._service = _service;
        this._notifierService = _notifierService;
        this._emitirEventoService = _emitirEventoService;
        this._dialog = _dialog;
        this._userService = _userService;
        this._igrejaService = _igrejaService;
        this._excelService = _excelService;
        this.myControlRede = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
        this.comboRede = [];
        this.pessoas = new Array();
        this.displayedColumns = [];
        this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"]();
        this.pageIndex = 0;
        this.loading = false;
        this.tipoPessoas = [
            { key: 'M', value: 'Membro' },
            { key: 'V', value: 'Visitante' }
        ];
        this.comboIgrejas = [];
        this.myControlIgreja = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]();
    }
    RedePessoasComponent.prototype.ngOnInit = function () {
        this.getEmiter();
        this.columns();
        this._buildForm();
        this.carregarIgrejas();
    };
    RedePessoasComponent.prototype.getEmiter = function () {
        var _this = this;
        this._emitirEventoService.mensagem.subscribe(function (item) {
            if (item.type == 'transferido') {
                _this.onSelectionClick(item.data);
            }
        });
    };
    RedePessoasComponent.prototype.columns = function () {
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
    RedePessoasComponent.prototype.carregarRede = function (id) {
        var _this = this;
        this._service.getRedeIgreja(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            _this.comboRede = item;
            // console.log(item);
            _this.filteredRede = _this.myControlRede.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return _this._filterRede(value, _this.comboRede); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, "Erro ao carregar as redes!");
        });
    };
    RedePessoasComponent.prototype._filterRede = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    RedePessoasComponent.prototype.onSelectionRedeClick = function ($event, option) {
        this.redeSelecionada = option;
    };
    RedePessoasComponent.prototype.onSelectionClick = function (key) {
        // console.log(key)
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
                    this.getMembros(this.redeSelecionada.id);
                    break;
                case 'V':
                    this.tipoPessoaSelecionado = 'V';
                    this.getVisitantes(this.redeSelecionada.id);
                    break;
            }
        }
    };
    RedePessoasComponent.prototype.getMembros = function (id) {
        var _this = this;
        this._service.getMembros(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.pessoas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.pessoas);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            // console.log(error);
            _this.pessoas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.pessoas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, error.error.message);
        });
    };
    RedePessoasComponent.prototype.getVisitantes = function (id) {
        var _this = this;
        this._service.getVisitantes(id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            // console.log(item);
            _this.pessoas = item;
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.pessoas);
            _this.dados.sort = _this.sort;
            _this.dados.paginator = _this.paginator;
            _this.loading = false;
        }, function (error) {
            // console.log(error);
            _this.pessoas = [];
            _this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](_this.pessoas);
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, error.error.message);
        });
    };
    RedePessoasComponent.prototype.transferir = function (id) {
        var metodo;
        switch (this.tipoPessoaSelecionado) {
            case 'M':
                metodo = 'transferirIgrejaMembro';
                break;
            case 'V':
                metodo = 'transferirIgrejaVisitante';
                break;
        }
        var dialogRef = this._dialog.open(_dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_component__WEBPACK_IMPORTED_MODULE_8__["DialogTransferirPessoaComponent"], {
            width: '600px',
            data: {
                pessoaId: id,
                metodo: metodo,
                controller: 'rede',
                tipoPessoa: this.tipoPessoaSelecionado,
                igrejaId: this.igrejaSelecionada.id
            }
        });
    };
    RedePessoasComponent.prototype.applyFilter = function (value) {
        this.dados.filter = value.trim().toLowerCase();
    };
    RedePessoasComponent.prototype.onSelectionIgrejaClick = function (value) {
        this.igrejaSelecionada = value;
        this.carregarRede(this.igrejaSelecionada.id);
    };
    RedePessoasComponent.prototype.carregarIgrejas = function () {
        var _this = this;
        this._igrejaService.getListIdAndName().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function (item) {
            _this.comboIgrejas = item;
            // console.log(item);
            _this.filteredIgreja = _this.myControlIgreja.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (value) { return _this._filterIgreja(value, _this.comboIgrejas); }));
        }, function (error) {
            _this._notifierService.notify(_model_alert_type__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Error, "Erro ao carregar igrejas!");
        });
    };
    RedePessoasComponent.prototype._filterIgreja = function (value, lista) {
        var filterValue = value.toLowerCase();
        return lista.filter(function (option) { return option.nome.toLowerCase().includes(filterValue); });
    };
    RedePessoasComponent.prototype._buildForm = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            'tipo': new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false),
        });
    };
    RedePessoasComponent.prototype.onBlurIgreja = function (event) {
        if (!event.target.value) {
            this.pessoas = [];
            this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](this.pessoas);
            this.form.reset();
            this.redeSelecionada = null;
            this.redeValue = '';
        }
    };
    RedePessoasComponent.prototype.onBlurRede = function (event) {
        if (!event.target.value) {
            this.pessoas = [];
            this.dados = new _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"](this.pessoas);
            this.form.reset();
        }
    };
    RedePessoasComponent.prototype.exportAsXLSX = function () {
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
    RedePessoasComponent.prototype.hasPermission = function (param) {
        return this._userService.hasPermission(param);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSort"])
    ], RedePessoasComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('paginator'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"])
    ], RedePessoasComponent.prototype, "paginator", void 0);
    RedePessoasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rede-pessoas',
            template: __webpack_require__(/*! ./rede-pessoas.component.html */ "./src/app/pages/rede/pessoas/rede-pessoas.component.html"),
            styles: [__webpack_require__(/*! ./rede-pessoas.component.scss */ "./src/app/pages/rede/pessoas/rede-pessoas.component.scss")]
        }),
        __metadata("design:paramtypes", [_service_rede_service__WEBPACK_IMPORTED_MODULE_0__["RedeService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_4__["NotifierService"],
            _service_emitir_evento_service__WEBPACK_IMPORTED_MODULE_6__["EmitirEventoService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"],
            _service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            _service_igreja_service__WEBPACK_IMPORTED_MODULE_10__["IgrejaService"],
            _service_excel_service__WEBPACK_IMPORTED_MODULE_11__["ExcelService"]])
    ], RedePessoasComponent);
    return RedePessoasComponent;
}());



/***/ }),

/***/ "./src/app/pages/rede/rede.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/rede/rede.module.ts ***!
  \*******************************************/
/*! exports provided: RedeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedeModule", function() { return RedeModule; });
/* harmony import */ var _diretives_diretives_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../diretives/diretives.module */ "./src/app/diretives/diretives.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _service_interceptor_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../service/interceptor.service */ "./src/app/service/interceptor.service.ts");
/* harmony import */ var _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../componentes/igrejas/igreja-compenent.module */ "./src/app/pages/componentes/igrejas/igreja-compenent.module.ts");
/* harmony import */ var _componentes_membro_membro_component_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../componentes/membro/membro-component.module */ "./src/app/pages/componentes/membro/membro-component.module.ts");
/* harmony import */ var _componentes_redes_redes_componente_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../componentes/redes/redes-componente.module */ "./src/app/pages/componentes/redes/redes-componente.module.ts");
/* harmony import */ var _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module */ "./src/app/pages/dialog/dialog-ativar-inativar/dialog-ativar-inativar.module.ts");
/* harmony import */ var _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module */ "./src/app/pages/dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module.ts");
/* harmony import */ var _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module */ "./src/app/pages/dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module.ts");
/* harmony import */ var _cadastrar_cadastrar_rede_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cadastrar/cadastrar-rede.component */ "./src/app/pages/rede/cadastrar/cadastrar-rede.component.ts");
/* harmony import */ var _pesquisar_pesquisar_rede_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pesquisar/pesquisar-rede.component */ "./src/app/pages/rede/pesquisar/pesquisar-rede.component.ts");
/* harmony import */ var _pessoas_rede_pessoas_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pessoas/rede-pessoas.component */ "./src/app/pages/rede/pessoas/rede-pessoas.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var routes = [
    { path: 'pesquisar', component: _pesquisar_pesquisar_rede_component__WEBPACK_IMPORTED_MODULE_16__["PesquisarRedeComponent"], data: { animation: 'buttons' } },
    { path: 'cadastrar', component: _cadastrar_cadastrar_rede_component__WEBPACK_IMPORTED_MODULE_15__["CadastrarRedeComponent"], data: { animation: 'buttons' } },
    { path: 'pessoas', component: _pessoas_rede_pessoas_component__WEBPACK_IMPORTED_MODULE_17__["RedePessoasComponent"], data: { animation: 'buttons' } },
];
var RedeModule = /** @class */ (function () {
    function RedeModule() {
    }
    RedeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteModule"],
                _componentes_membro_membro_component_module__WEBPACK_IMPORTED_MODULE_10__["MembroComponentModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
                _dialog_dialog_ativar_inativar_dialog_ativar_inativar_module__WEBPACK_IMPORTED_MODULE_12__["DialogAtivarInativarModule"],
                _dialog_dialog_confirm_pessoa_dialog_confirm_pessoa_module__WEBPACK_IMPORTED_MODULE_13__["DialogConfirmPessoaModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
                _componentes_igrejas_igreja_compenent_module__WEBPACK_IMPORTED_MODULE_9__["IgrejasComponentModule"],
                _componentes_redes_redes_componente_module__WEBPACK_IMPORTED_MODULE_11__["RedesComponenteModule"],
                _dialog_dialog_transferir_pessoa_dialog_transferir_pessoa_module__WEBPACK_IMPORTED_MODULE_14__["DialogTransferirPessoaModule"],
                _diretives_diretives_module__WEBPACK_IMPORTED_MODULE_0__["DiretivesModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDividerModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _cadastrar_cadastrar_rede_component__WEBPACK_IMPORTED_MODULE_15__["CadastrarRedeComponent"],
                _pesquisar_pesquisar_rede_component__WEBPACK_IMPORTED_MODULE_16__["PesquisarRedeComponent"],
                _pessoas_rede_pessoas_component__WEBPACK_IMPORTED_MODULE_17__["RedePessoasComponent"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"], useClass: _service_interceptor_service__WEBPACK_IMPORTED_MODULE_8__["InterceptorService"], multi: true }
            ]
        })
    ], RedeModule);
    return RedeModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-rede-rede-module.js.map