import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, startWith, map } from 'rxjs/operators';
import { MembroService } from '../../../service/membro.service';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-igreja-dados',
  templateUrl: './igreja-dados.component.html',
  styleUrls: ['./igreja-dados.component.scss']
})
export class IgrejaDadosComponent implements OnInit {
  
  public maskCNPJ = [/\d/, /\d/, '.',/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,];

  public form: FormGroup;
  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public nomeValue;
  public membro:any;
  
  constructor(private _membroService: MembroService,private _notifierService: NotifierService,private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.carregarComboMembro();
    this.getEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('',Validators.required),
      'cnpj': new FormControl('',Validators.required),
      'telefone': new FormControl('',Validators.required),
      'cpf': new FormControl({value:'', disabled: true}),
    });
  }
  carregarComboMembro() {
    this._membroService.getList().pipe(take(1)).subscribe(item => {
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChangedMembroNome($event: MatAutocompleteSelectedEvent,option) {
    this.membro = option;
    this.form.controls['cpf'].patchValue(option.cpf);
  }


  
  setEmiter(): void {
    console.log(this.carregarObjeto());
    this._emitirEventoService.emitir("dadosIgreja", this.carregarObjeto());
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'save-ok') {
        console.log('entrou');
        this.form.reset();
      }
    });
  }

  carregarObjeto() {
    let igreja = {} as any;
    igreja.nome = this.form.controls['nome'].value;
    igreja.telefone = this.form.controls['telefone'].value;
    igreja.cnpj = this.form.controls['cnpj'].value;
    igreja.membro = this.membro;
    return igreja;
  }

  change() {
    console.log('teste');
    this.setEmiter();
  }
}
