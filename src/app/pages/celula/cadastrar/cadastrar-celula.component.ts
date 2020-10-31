import { MembroService } from '../../../service/membro.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take, startWith, map } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { CelulaService } from '../../../service/celula.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { RedeService } from '../../../service/rede.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';
import { TipoLiderancaService } from '../../../service/tipo-lideranca.service';
import { Observable } from 'rxjs';
import { HelperChurch } from '../../../helper/helper.church';


@Component({
  selector: 'app-cadastrar-celula',
  templateUrl: './cadastrar-celula.component.html',
  styleUrls: ['./cadastrar-celula.component.scss']
})
export class CadastrarCelulaComponent implements OnInit {

  public form: FormGroup;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public comboSemana = [];
  public comboTurno = [];
  public comboTipoCelula = [];
  public observacao: string;
  public enderecos = [];
  public membros: any = [];
  public comboTipoPessoa = [];
  public label: string = "Membro";
  public tipoPessoa: any;
  public sizeLimitOne: boolean = true;
  public id: any;
  public igrejaSelecionada:any;

  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public membroSelecionado: any;
  public membroValue:any;

  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;





  constructor(private _service: CelulaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _datePipe: DatePipe,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _redeService: RedeService,
    private _dateAdapter: DateAdapter<Date>,
    private _dialog: MatDialog,
    private _tipoLiderancaService:TipoLiderancaService,
    private _membroService:MembroService,
    private _serviceRede: RedeService) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getComboSemana();
    this.getComboTurno();
    this.carregarTipoCelula();
    this.carregarTipoLiderencaCelula();
    this.getEmiter();
    this.getParams();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.data);

      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.carregarRede(this.igrejaSelecionada.id);
      }

      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }

      if(item.type == 'confirm-dialog-pessoa-celula'){
        if(this.membros.length > 0){
          this.membros.splice(item.data, 1);
        }
      }
    });
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'diaSemana': new FormControl(''),
      'turno': new FormControl(''),
      'dataAbertura': new FormControl(''),
      'tipo': new FormControl(''),
      'perfil': new FormControl(''),
      'horario': new FormControl(''),
      'digital': new FormControl(''),
    });
  }

  getComboSemana() {
    this._service.carregarSemana().subscribe(item => {
      this.comboSemana = item;
      // console.log(item);
    });
  }

  getComboTurno() {
    this._service.carregarTurno().subscribe(item => {
      this.comboTurno = item;
      // console.log(item);
    });
  }

  carregarTipoCelula() {
    this._service.carregarTipoCelula().subscribe(item => {
      this.comboTipoCelula = item;
      // console.log(item);
    });
  }


  carregarTipoLiderencaCelula() {
    this._tipoLiderancaService.getList().subscribe(item => {
      this.comboTipoPessoa = item;
      // console.log(item);
    });
  }

  salvar() {
    if(!this.validFields()){
      return;
    }
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  obj() {
    return {
      nome: this.form.controls['nome'].value,
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
      horario: this.form.controls['horario'].value,
      dia: this.form.controls['diaSemana'].value,
      turno: this.form.controls['turno'].value,
      tipoCelula: this.form.controls['tipo'].value,
      rede: {id:this.redeSelecionada.id},
      enderecos: this.enderecos,
      observacao: this.observacao,
      membros: this.membros,
      digital: HelperChurch.isBoolean(this.form.controls['digital'].value)
    }
  }

  transformDate(hora) {
    return this._datePipe.transform(new Date(), 'dd/MM/yyyy ' + hora);
  }

  adicionar() {
    this.getEmiter();
    if (!this.membroSelecionado) {
      this._notifierService.notify(AlertType.Error, "Erro:campo membro em branco!");
      return false;
    }
    if (!this.tipoPessoa) {
      this._notifierService.notify(AlertType.Error, "Erro: escolha um tipo membro da célula!");
      return false;
    }

    this.membroSelecionado.tipo = this.tipoPessoa.nome;
    this.tipoPessoa = null;

    this.membros.push(this.membroSelecionado);
    this.membroValue = '';
  }


  voltar() {
    this._router.navigate(['/auth/celula/pesquisar'], {
      queryParams: {
        pesquisar: 'pesquisar',
      },
      skipLocationChange: true
    });
  }


  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getCelula(this.id);
    }
  }

  getCelula(id) {
    this._service.getCelula(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['horario'].patchValue(item.horario);
      this.form.controls['diaSemana'].patchValue(item.diasEnum);
      this.form.controls['turno'].patchValue(item.turnoEnum);
      this.form.controls['tipo'].patchValue(item.tipoCelulaEnum);
      this.form.controls['dataAbertura'].patchValue(new Date(item.dataAbertutaToDate));
      this.form.controls['digital'].patchValue(item.digital);
      this.observacao = item.observacao;
      this.getRede(item.rede.id)
      this.emitirEnderecos(item.enderecos);
      this.carregarPessoas(item.membros);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  carregarPessoas(item){
    if(item){
      for (let i = 0; i < item.length; i++) {
        let pessoa = {} as any;
        pessoa.id = item[i].id;
        pessoa.nomeCompleto = item[i].nomeCompleto;
        pessoa.cpf = item[i].cpf;
        pessoa.tipo = item[i].tipo;
        this.membros.push(pessoa);
      }
    }
  }

  getRede(id) {
    this._redeService.getRede(id).pipe(take(1)).subscribe(item => {
      this.redeSelecionada = item;
      this.emitirRede(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  emitirRede(item): void {
    this._emitirEventoService.emitir('edit-rede', item);
  }

  emitirEnderecos(item): void {
    this.enderecos = item;
    this._emitirEventoService.emitir('edit-endereco', item);
  }


  save() {
    console.log(this.obj());
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


  update() {
    let obj = {} as any;
    obj = this.obj();
    obj.id = Number.parseInt(this.id);
    this._service.update(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  dialogRemover(i,item) {
    const dialogRef = this._dialog.open(DialogConfirmPessoaComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        controller: "celula",
        item:i
      }
    });
  }

  carregarMembro(id) {
    this._membroService.getMembroIgrejaByRede(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembros(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembros(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    this.membroSelecionado = option;
  }

  validFields():boolean{
    if(!this.form.controls['nome'].value){
      this._notifierService.notify(AlertType.Error, "Por favor digite o nome da célula!");
      return false;
    }
    if(!this.form.controls['dataAbertura'].value){
      this._notifierService.notify(AlertType.Error, "Por favor selecione a Data de Abertura!");
      return false;
    }
    if(!this.form.controls['diaSemana'].value){
      this._notifierService.notify(AlertType.Error, "Por favor selecione o Dia da semana!");
      return false;
    }
    if(!this.form.controls['turno'].value){
      this._notifierService.notify(AlertType.Error, "Por favor selecione um turno!");
      return false;
    }
    if(!this.form.controls['tipo'].value){
      this._notifierService.notify(AlertType.Error, "Por favor selecione um Tipo de Célula!");
      return false;
    }

    if(!this.redeSelecionada){
      this._notifierService.notify(AlertType.Error, "Por favor selecione uma Rede!");
      return false;
    }
    if(this.enderecos && this.enderecos.length == 0 && !this.form.controls['digital'].value){
      this._notifierService.notify(AlertType.Error, "Por favor Adicione um endereço!");
      return false;
    }
    if(this.membros.length == 0 ){
      this._notifierService.notify(AlertType.Error, "Por favor Adicione a liderença da célula!");
      return false;
    }
    return true;
  }

  carregarRede(id) {

    this._serviceRede.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as redes!");
    });
  }


  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    this.carregarMembro(this.redeSelecionada.id);
  }


}
