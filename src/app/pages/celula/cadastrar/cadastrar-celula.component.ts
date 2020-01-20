import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { CelulaService } from '../../../service/celula.service';
import { DatePipe } from '@angular/common';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-celula',
  templateUrl: './cadastrar-celula.component.html',
  styleUrls: ['./cadastrar-celula.component.scss']
})
export class CadastrarCelulaComponent implements OnInit {

  public form: FormGroup;
  public lider: string = "Lider";
  public anfitriao: string = "Anfitrião";
  public supervisor: string = "Supervisor";
  public coLider: string = "Co-Lider";
  public igrejaSelecionada: any;
  public redeSelecionada: any;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public comboSemana = [];
  public comboTurno = [];
  public comboTipoCelula = [];
  public pastor: string;
  public observacao: string;
  public endereco:any;
  public liderSelecionado: any;
  public anfitriaoSelecionado: any;
  public supervisorSelecionado: any;
  public coLiderSelecionado: any;
  public supervisores = [];


  constructor(private _service: CelulaService, 
              private _notifierService: NotifierService, 
              private _emitirEventoService: EmitirEventoService,
              private _datePipe: DatePipe) { }

  ngOnInit() {
    this._buildForm();
    this.getComboSemana();
    this.getComboTurno();
    this.carregarTipoCelula();
    this.getEmiter();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.data);
      if (item.type == 'membro-comp-lider') {
        this.liderSelecionado = item.data;
        console.log(this.liderSelecionado);
      }
      if (item.type == 'membro-comp-supervisor') {
        this.supervisorSelecionado = item.data;
        console.log(this.supervisorSelecionado);
      }
      if (item.type == 'membro-comp-anfitriao') {
        this.anfitriaoSelecionado = item.data;
        console.log(this.anfitriaoSelecionado);
      }
      if (item.type == 'membro-comp-coLider') {
        this.coLiderSelecionado = item.data;
        console.log(this.coLiderSelecionado);
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.pastor = this.igrejaSelecionada.pastor.nomeCompleto;
      }
      if (item.type == 'rede-comp') {
        this.redeSelecionada = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
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
      'horario': new FormControl('')
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

  salvar() {
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.setEmiter(true);
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  obj() {
    return {
      nome: this.form.controls['nome'].value,
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
      horario: this.form.controls['horario'].value,
      diaSemana: this.form.controls['diaSemana'].value,
      turno: this.form.controls['turno'].value,
      tipo: this.form.controls['tipo'].value,
      igreja:this.igrejaSelecionada,
      rede:this.redeSelecionada,
      endereo:this.endereco,
      observacao:this.observacao,
      supervisores:this.supervisores,
      lider:this.liderSelecionado,
      anfitriao:this.anfitriaoSelecionado,
      coLider:this.coLiderSelecionado
    }
  }

  adicionar() {
    if (!this.supervisorSelecionado) {
      this._notifierService.notify(AlertType.Error, "Erro:campo membro em branco!");
      return false;
    }
    this.supervisores.push(this.supervisorSelecionado);
    this.setEmiter(false);
  }


  remover(index): void {
    this.supervisores.splice(index, 1);
  }
  setEmiter(save): void {
    if (save) {
      this._emitirEventoService.emitir("save-ok", "");
    } else {
      this._emitirEventoService.emitir("add", "");
    }
  }

}
