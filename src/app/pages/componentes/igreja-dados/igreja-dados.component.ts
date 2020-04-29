import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, startWith, map } from 'rxjs/operators';
import { MembroService } from '../../../service/membro.service';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { HelperChurch } from '../../../helper/helper.church';
import { PessoaService } from '../../../service/pessoa.service';


@Component({
  selector: 'app-igreja-dados',
  templateUrl: './igreja-dados.component.html',
  styleUrls: ['./igreja-dados.component.scss']
})
export class IgrejaDadosComponent implements OnInit {

  public maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,];

  public form: FormGroup;
  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public nomeValue;
  public membro: any;
  public membros = [];
  @Input('filial')filial:boolean = false;

  constructor(private _pessoaService: PessoaService, private _notifierService: NotifierService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.carregarComboMembro();
    this.getEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'cnpj': new FormControl('', Validators.required),
      'visaoCelular': new FormControl(false),
    });
  }
  carregarComboMembro() {
    this._pessoaService.getListMembros().pipe(take(1)).subscribe(item => {
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

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    console.log(option)
    this.membro = option;
  }



  setEmiter(): void {
    console.log(this.carregarObjeto());
    this._emitirEventoService.emitir("dadosIgreja", this.carregarObjeto());
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item);
      if (item.type == 'clear') {
        this.form.reset();
        this.nomeValue = "";
        this.membros = [];
      }
      if (item.type == 'dadosIgreja') {
        if(item.data.pessoas){
          this.membros = item.data.pessoas;
        }
        this.form.controls['nome'].patchValue(item.data.nome);
        this.form.controls['cnpj'].patchValue(item.data.cnpj);
        this.form.controls['visaoCelular'].patchValue(item.data.visaoCelular);
      }
    });
  }

  carregarObjeto() {
    let igreja = {} as any;
    igreja.nome = this.form.controls['nome'].value;
    igreja.cnpj = HelperChurch.retirarFormatacaoCNPJ(this.form.controls['cnpj'].value);
    igreja.pessoas = this.membros;
    igreja.visaoCelular = this.form.controls['visaoCelular'].value;
    return igreja;
  }

  change() {
    // console.log('teste');
    this.setEmiter();
  }

  adicionar() {
    if (!this.membro) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i=>i.nome==this.membro.nome);
    if(membroAdicionado &&  membroAdicionado.nome == this.membro.nome){
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membros.push(this.membro);
    this.setEmiter();
  }

  
  remover(index): void {
    this.membros.splice(index, 1);
  }

}
