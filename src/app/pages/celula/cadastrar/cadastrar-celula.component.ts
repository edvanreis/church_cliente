import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { CelulaService } from '../../../service/celula.service';
import { DatePipe } from '@angular/common';
import { AlertType } from '../../../model/alert-type';
import { take, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MembroService } from '../../../service/membro.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
  public endereco:any;
  public membro: any;
  public membros: any = [];
  public comboTipoPessoa = [];
  public label: string = "Membro";
  public tipoPessoa:any;
  public sizeLimitOne:boolean = true;



  constructor(private _service: CelulaService, 
              private _notifierService: NotifierService, 
              private _emitirEventoService: EmitirEventoService,
              private _datePipe: DatePipe,
              private _avRoute: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    this._buildForm();
    this.getComboSemana();
    this.getComboTurno();
    this.carregarTipoCelula();
    this.carregarTipoPessoaCelula();
    this.getEmiter();
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

  
  carregarTipoPessoaCelula() {
    this._service.getTipoPessoaCelula().subscribe(item => {
      this.comboTipoPessoa = item;
      // console.log(item);
    });
  }

  salvar() {
    console.log(this.obj());
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.clear();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  obj() {
    return {
      nome: this.form.controls['nome'].value,
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
      horario:this.form.controls['horario'].value,
      dia: this.form.controls['diaSemana'].value,
      turno: this.form.controls['turno'].value,
      tipoCelula: this.form.controls['tipo'].value,
      idRede:this.redeSelecionada.id,
      enderecos:this.endereco,
      observacao:this.observacao,
      pessoas:this.membros
    }
  }

  transformDate(hora) {
    return this._datePipe.transform(new Date(), 'dd/MM/yyyy '+hora);
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
    this.membro.tipo = this.tipoPessoa.tipoPessoa;
    this.membro.decTipoPesspa = this.tipoPessoa.decTipoPesspa;
    this.tipoPessoa = null;  
    this.membros.push(this.membro);
  }


  remover(index): void {
    this.membros.splice(index, 1);
  }

  clear(){
    this.form.reset();
    this._emitirEventoService.emitir("clear", "");
    this.membros = [];
    this.observacao = null;

  }

  voltar() {
    this._router.navigate(['/auth/celula/pesquisar']);
  }

}
