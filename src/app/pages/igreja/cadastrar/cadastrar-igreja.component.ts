import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, DateAdapter, MatDialog } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { IgrejaService } from '../../../service/igreja.service';
import { take, startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperChurch } from '../../../helper/helper.church';
import { MembroService } from '../../../service/membro.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';

@Component({
  selector: 'app-cadastrar-igreja',
  templateUrl: './cadastrar-igreja.component.html',
  styleUrls: ['./cadastrar-igreja.component.scss']
})
export class CadastrarIgrejaComponent implements OnInit {


  public form: FormGroup;
  public maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  public filteredIgreja: Observable<string[]>;
  public igrejaSelecionada: any;
  public igrejaValue: any;
  public dadosIgreja: any;
  public enderecos = [];
  public contatos: any;
  // public myControlIgreja = new FormControl();
  public comboIgrejaSede = [];
  public filteredIgrejaSede: Observable<string[]>;
  public myControlIgrejaSede = new FormControl();
  public nomePastorValue: string;
  public id: any;
  public igreja = {} as any;
  public tipoIgreja: any;
  public sizeLimitOne: boolean = true;
  public filial: boolean = false;
  public pesquisa: boolean = false;


  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public membroValue;
  public membroSelecionado:any;
  public membros = new Array();

  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: IgrejaService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _membroService: MembroService,
    private _datePipe: DatePipe,
    private _dateAdapter: DateAdapter<Date>,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this.getEmiter();
    this.carregarComboIgrejaSede();
    this.getParams();
    this.getEmiter();
    this._buildForm();
    this.carregarComboMembro();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'cnpj': new FormControl('', Validators.required),
      'visaoCelular': new FormControl(false),
      'radio': new FormControl('1'),
      'dataAbertura': new FormControl('',Validators.required),
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.data);
      // if (item.type == 'dadosIgreja') {
      //   this.dados = item.data;
      // }
      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }
      if (item.type == 'contatos') {
        this.contatos = item.data;
      }
      if (item.type == 'dadosIgrejaRadio') {
        this.filial = item.data;
      }

      if(item.type == 'confirm-dialog-pessoa-igreja'){
        if(this.membros.length > 0){
          this.membros.splice(item.data, 1);
        }
      }
    });
  }

  setEmiter(save: boolean): void {
    if (save) {
      this._emitirEventoService.emitir("clear", "");
    }
    if (this.enderecos && !save) {
      this._emitirEventoService.emitir("edit-endereco", this.enderecos);
    }
    if (this.contatos && !save) {
      this._emitirEventoService.emitir("edit-contatos", this.contatos);
    }
  }

  getDadosIgreja() {

    this.igreja = {} as any;
    this.igreja.nome = this.form.controls['nome'].value;
    this.igreja.cnpj = HelperChurch.retirarFormatacaoCNPJ(this.form.controls['cnpj'].value);
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
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.pesquisa = true;
      this.getIgreja(this.id);
    }
  }

  salvar() {
    this.getDadosIgreja();
    if (!this.validFields()) {
      return;
    }
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  save() {
    // console.log(this.igreja);
    this._service.save(this.igreja).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }



  carregarComboIgrejaSede() {

    this._service.getList().pipe(take(1)).subscribe(item => {
      this.comboIgrejaSede = item;
      // console.log(item);
      this.filteredIgrejaSede = this.myControlIgrejaSede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboIgrejaSede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChangedIgreja($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
  }

  voltar() {
    this._router.navigate(['/auth/igreja/pesquisar'], {
      queryParams: {
        pesquisa: this.pesquisa
      },
      skipLocationChange: true
    });
  }


  getIgreja(id) {
    this._service.getSede(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.carregarDados(item);
      this.setEmiter(false);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }



  carregarDados(item) {
    this.form.controls['nome'].patchValue(item.nome);
    this.form.controls['cnpj'].patchValue(item.cnpj);
    this.form.controls['visaoCelular'].patchValue(item.visaoCelular);
    this.form.controls['dataAbertura'].patchValue(new Date(item.dataAberturaToDate));

    if(item.membros){
      this.membros = item.membros;
    }

    if(item.sede){
      this.form.controls['radio'].patchValue('2');
      this.filial = true;
    }else{
      this.form.controls['radio'].patchValue('1');
      this.filial = false;
    }
    this.enderecos = item.enderecos;
    this.contatos = item.contatos;

    if (item.sede) {
      this.igrejaValue = item.sede.nome;
      this.igrejaSelecionada = item.sede;
      this.igrejaSelecionada = {id:item.sede.id};
      this.filial = true;
    }
  }

  update() {
    // console.log(this.igreja);
    this._service.update(this.igreja).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  validFields(): boolean {
    if (!this.igreja.nome) {
      this._notifierService.notify(AlertType.Error, "Digite o nome da Igreja!");
      return false;
    }
    if (!this.igreja.cnpj) {
      this._notifierService.notify(AlertType.Error, "Digite o CNPJ Igreja!");
      return false;
    }
    if (this.igreja.membros.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione os Líderes");
      return false;
    }
    if (this.igreja.enderecos.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione os Endereço");
      return false;
    }
    if (this.igreja.contatos.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione os Contatos");
      return false;
    }
    if (!this.igreja.dataAbertura) {
      this._notifierService.notify(AlertType.Error, "Por favor Adicione a Data de abertura");
      return false;
    }
    if (!this.igrejaSelecionada && this.filial) {
      this._notifierService.notify(AlertType.Error, "Por favor Selecione uma igreja!");
      return false;
    }

    return true;
  }

  changeRadio(){
    console.log(this.form.controls['radio'].value);
    if(this.form.controls['radio'].value=='2'){
      this.filial = true;
    }else{
      this.filial = false;
    }
  }

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    console.log(option)
    this.membroSelecionado = option;
  }

  carregarComboMembro() {
    this._membroService.getListMembros().pipe(take(1)).subscribe(item => {
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembro(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembro(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  adicionar() {
    if (!this.membroSelecionado) {
      console.log(this.membroSelecionado);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i => i.nome == this.membroSelecionado.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membroSelecionado.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membros.push(this.membroSelecionado);
    this.membroValue = '';
  }

  dialogRemover(i,item) {
    const dialogRef = this._dialog.open(DialogConfirmPessoaComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        controller: "igreja",
        item:i
      }
    });
  }


}
