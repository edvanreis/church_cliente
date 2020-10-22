import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AgendamentoService } from '../../../service/agendamento.service';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { AgendamentoPessoaService } from '../../../service/agendamento-pessoa.service';
import { HelperChurch } from '../../../helper/helper.church';

@Component({
  selector: 'app-cadastrar-agendamento-pessoa',
  templateUrl: './cadastrar-agendamento-pessoa.component.html',
  styleUrls: ['./cadastrar-agendamento-pessoa.component.scss']
})
export class CadastrarAgendamentoPessoaComponent implements OnInit {

  public form: FormGroup;
  public maskCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  public igrejaSelecionada:any;
  public agendamentoSelecionado:any;

  public comboAgendamento = [];
  public myControlAgendamento = new FormControl();
  public filteredAgendamento: Observable<string[]>;

  public agendamentoValue:any;


  constructor(private _service:AgendamentoPessoaService,
    private _serviceAgendamento:AgendamentoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit(){
    this._buildForm();
    this.getEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('',Validators.required),
      'sobreNome': new FormControl('',Validators.required),
      'email': new FormControl('',Validators.required),
      'celular': new FormControl(''),
      'cpf': new FormControl(''),
      'dataNascimento': new FormControl('')
    });
  }

  obterAgendamentos(id){
    this._serviceAgendamento.getAgendamentoAtualIgreja(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.comboAgendamento = item;
      this.filteredAgendamento = this.myControlAgendamento.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterAgendamento(value, this.comboAgendamento))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os agendamentos!");
    });
  }

  private _filterAgendamento(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.obterAgendamentos(this.igrejaSelecionada.id);
      }
    });
  }

  onSelectionChange($event: MatAutocompleteSelectedEvent, option) {
    this.agendamentoSelecionado = option;
  }

  salvar(){
    if(!this.validField()){
        return;
    }

    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.clear();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });

  }

  clear(){
    this.form.reset();
    this.setEmiterClear();
    this.agendamentoValue = '';
    this.agendamentoSelecionado = '';
  }

  validField(){
    if(!this.form.controls['nome'].value){
      this._notifierService.notify(AlertType.Error, "Por favor digite o Nome!");
      return false;
    }

    if(!this.form.controls['sobreNome'].value){
      this._notifierService.notify(AlertType.Error, "Por favor digite o Sobre Nome!");
      return false;
    }

    if(!this.form.controls['email'].value){
      this._notifierService.notify(AlertType.Error, "Por favor digite o Email!");
      return false;
    }
    return true;
  }

  obj(){
    let agendamento = {} as any;
    agendamento.nome =  this.form.controls['nome'].value;
    agendamento.sobreNome =  this.form.controls['sobreNome'].value;
    agendamento.email =  this.form.controls['email'].value;
    agendamento.celular =  this.form.controls['celular'].value;
    agendamento.cpf =  HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    agendamento.dataNascimento =  this.form.controls['dataNascimento'].value;

    if(this.agendamentoSelecionado){
      agendamento.agendamento = {id:this.agendamentoSelecionado.id};
    }
    return agendamento;
  }

  setEmiterClear(): void {
    this._emitirEventoService.emitir("clear", '');
  }

}
