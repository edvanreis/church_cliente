import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { CelulaService } from '../../../service/celula.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { RedeService } from '../../../service/rede.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';
import { TipoLiderancaService } from '../../../service/tipo-lideranca.service';

@Component({
  selector: 'app-cadastrar-celula',
  templateUrl: './cadastrar-celula.component.html',
  styleUrls: ['./cadastrar-celula.component.scss']
})
export class CadastrarCelulaComponent implements OnInit {

  public form: FormGroup;
  public redeSelecionada: any;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public comboSemana = [];
  public comboTurno = [];
  public comboTipoCelula = [];
  public observacao: string;
  public endereco: any;
  public membro: any;
  public membros: any = [];
  public comboTipoPessoa = [];
  public label: string = "Membro";
  public tipoPessoa: any;
  public sizeLimitOne: boolean = true;
  public id: any;





  constructor(private _service: CelulaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _datePipe: DatePipe,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _redeService: RedeService,
    private _dateAdapter: DateAdapter<Date>,
    private _dialog: MatDialog,
    private _tipoLiderancaService:TipoLiderancaService) { }

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
      if (item.type == 'rede-comp') {
        this.redeSelecionada = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }
      if (item.type == 'membro-comp') {
        this.membro = item.data;
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
      enderecos: this.endereco,
      observacao: this.observacao,
      pessoas: this.membros
    }
  }

  transformDate(hora) {
    return this._datePipe.transform(new Date(), 'dd/MM/yyyy ' + hora);
  }

  adicionar() {
    this.getEmiter();
    if (!this.membro) {
      this._notifierService.notify(AlertType.Error, "Erro:campo membro em branco!");
      return false;
    }
    if (!this.tipoPessoa) {
      this._notifierService.notify(AlertType.Error, "Erro: escolha um tipo membro da célula!");
      return false;
    }

    this.membro.tipo = this.tipoPessoa.nome;
    this.tipoPessoa = null;

    this.membros.push(this.membro);
  }

  clear() {
    this.form.reset();
    this._emitirEventoService.emitir("clear", "");
    this.membros = [];
    this.observacao = null;

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
      this.observacao = item.observacao;
      this.getRede(item.rede.id)
      this.emitirEnderecos(item.enderecos);
      this.carregarPessoas(item.pessoas);
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
    this.endereco = item;
    this._emitirEventoService.emitir('edit-endereco', item);
  }


  save() {
    console.log(this.obj());
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.clear();
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

}
