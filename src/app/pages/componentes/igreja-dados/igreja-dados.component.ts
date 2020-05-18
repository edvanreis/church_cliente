import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { HelperChurch } from '../../../helper/helper.church';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { PessoaService } from '../../../service/pessoa.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';




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
  @Input('filial') filial: boolean = false;
  @Input('idAssociado') idAssociado;
  @Input('tipoIgreja') tipoIgreja;

  constructor(private _pessoaService: PessoaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _dialog: MatDialog) { }

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
    // console.log(this.carregarObjeto());
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
      if (item.type == 'edit-dadosIgreja') {
        if (item.data.pessoas) {
          // console.log(item.data)
          for (let i = 0; i < item.data.pessoas.length; i++) {
            let pessoa = {} as any;
            pessoa.codigo = i + 1;
            pessoa.idIgreja = item.data.id;
            pessoa.idPessoa = item.data.pessoas[i].id;
            pessoa.nomeCompleto = item.data.pessoas[i].nomeCompleto;
            pessoa.cpf = item.data.pessoas[i].cpf;
            this.membros.push(pessoa);
          }
        }
        this.form.controls['nome'].patchValue(item.data.nome);
        this.form.controls['cnpj'].patchValue(item.data.cnpj);
        this.form.controls['visaoCelular'].patchValue(item.data.visaoCelular);
      }
      if (item.type == 'confirm-dialog-pessoa') {
        this.membros.splice(item.data, 1);
        this.setEmiter();
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
      console.log(this.membro);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i => i.nome == this.membro.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membro.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    if (this.membros.length != 0) {
      this.membro.codigo = this.membros[this.membros.length - 1].codigo + 1;
    } else {
      this.membro.codigo = 1;
    }
    this.membros.push(this.membro);
    this.setEmiter();
  }


  dialogRemover(item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmPessoaComponent, {
      width: '600px',
      data: {
        id: item.idIgreja,
        idPessoa: item.idPessoa,
        controller: this.tipoIgreja
      }
    });
  }

}
