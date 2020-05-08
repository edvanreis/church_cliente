import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ContatoService } from '../../../service/contato.service';
import { Observable } from 'rxjs';
import { Contatos } from '../../../model/contatos';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { HelperChurch } from '../../../helper/helper.church';
import { TipoContatoService } from '../../../service/tipo-contato.service';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogAtualizarContatoComponent } from '../../dialog/dialog-atualizar-contato/dialog-atualizar-contato.component';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {


  public form: FormGroup;
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]
  public maskCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public isContato: boolean = true;
  public isCelular: boolean = false;
  public isTelefone: boolean = false;
  public isFacebook: boolean = false;
  public isEmail: boolean = false;
  public contatos = [];
  public comboTipoContatos = [];
  public tipoSelected: any;
  @Input('idPessoa') idPessoa;


  constructor(private _contatoService: ContatoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _tipoContatoService: TipoContatoService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this._buildForm();
    this.getComboContatos();
    this.getEmiter();
    
  }

  public contatos$: Observable<any[]>;

  private _buildForm(): void {
    this.form = new FormGroup({
      'contatos': new FormControl(''),
      'contato': new FormControl(''),
      'contatoTelefone': new FormControl(''),
      'contatoCelular': new FormControl(''),
      'whatsapp': new FormControl(''),
      'escolaridade': new FormControl(''),
      'curso': new FormControl(''),
      'email': new FormControl(''),
      'etapa': new FormControl(''),
      'emailPrincipal': new FormControl('')
    });
  }


  getComboContatos() {
    this._tipoContatoService.getList().subscribe(item => {
      this.comboTipoContatos = item;
      // console.log(item);
    });
  }

  tipo(event) {
    console.log(event.value);
    this.tipoSelected = event.value;
    if (event.value.nome == 'CELULAR' || event.value.nome == 'CELULAR DO TRABALHO') {
      this.isCelular = true;
      this.isTelefone = false;
      this.isContato = false;
      this.isEmail = false;
      this.isFacebook = false;
    } else if (event.value.nome == 'TELEFONE' || event.value.nome == 'TELEFONE DO TRABALHO') {
      this.isTelefone = true;
      this.isCelular = false;
      this.isContato = false;
      this.isEmail = false;
      this.isFacebook = false;
    } else if (event.value.nome == 'FACEBOOK') {
      this.isFacebook = true
      this.isContato = true;
      this.isCelular = false;
      this.isTelefone = false;
      this.isEmail = false
    } else if (event.value.nome == 'E-MAIL') {
      this.isEmail = true
      this.isContato = false;
      this.isFacebook = false;
      this.isCelular = false;
      this.isTelefone = false;
    } else {
      this.isCelular = false;
      this.isTelefone = false;
      this.isContato = true;
    }
  }

  adicionar() {
    let descricao: string = this.preecherContato();

    if (!this.validarCampos(descricao)) {
      return;
    }

    let obj = {} as any;

    obj.tipo = this.tipoSelected;
    obj.descricao = descricao;
    obj.whatsapp = HelperChurch.isBoolean(this.form.controls['whatsapp'].value);
    obj.login = HelperChurch.isBoolean(this.form.controls['emailPrincipal'].value);
    if (this.contatos.length!=0) {
      obj.codigo = this.contatos[this.contatos.length - 1].codigo + 1;
    }else{
      obj.codigo = 1;
    }
    // console.log(obj)
    this.contatos.push(obj);
    this.clearInputContato();
    this.setEmiter();
  }

  preecherContato() {
    let contato: string;
    if (this.form.controls['contato'].value) {
      contato = this.form.controls['contato'].value;
    } else if (this.form.controls['contatoTelefone'].value) {
      contato = this.form.controls['contatoTelefone'].value;
    } else if (this.form.controls['contatoCelular'].value) {
      contato = this.form.controls['contatoCelular'].value;
    } else if (this.form.controls['email'].value) {
      contato = this.form.controls['email'].value;
    }
    return contato;
  }

  validarCampos(descricao): boolean {
    let email = this.form.controls['email'].value;
    let pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

    if (!descricao) {
      this._notifierService.notify(AlertType.Error, 'Por favor preencha um contato!');
      return false;
    }

    if (this.isContato && !descricao) {
      this._notifierService.notify(AlertType.Error, 'Por favor preencha o campo contato!');
      return false;
    }
    if (this.isEmail && !email) {
      this._notifierService.notify(AlertType.Error, 'Por favor preencha o campo email!');
      return false;
    }
    if (this.isEmail && !pattern.test(email)) {
      this._notifierService.notify(AlertType.Error, 'O email possui formato invalido!');
      return false;
    }

    let possuiEmailPrincipal: boolean = false;
    this.contatos.forEach(element => {
      // console.log(element);
      console.log(this.form.controls['emailPrincipal'].value);
      if (element.login) {
        if (element.login == this.form.controls['emailPrincipal'].value) {
          possuiEmailPrincipal = true;
        }
      }

    });
    if (possuiEmailPrincipal) {
      this._notifierService.notify(AlertType.Error, 'Você já possuí um email principal!');
      return false;
    }
    return true;
  }

  clearInputContato() {
    this.form.controls['contato'].patchValue('');
    this.form.controls['contatoTelefone'].patchValue('');
    this.form.controls['contatoCelular'].patchValue('');
    this.form.controls['whatsapp'].patchValue('');
    this.form.controls['emailPrincipal'].patchValue(false);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.form.reset();
        this.contatos = [];
      }
      if (item.type == 'edit-contatos') {
        // this.contatos = item.data;
        for (let i = 0; i < item.data.length; i++) {
          let contato = {} as any;
          contato.codigo = i + 1;
          contato.id = item.data[i].id;
          contato.tipo = item.data[i].tipo;
          contato.descricao = item.data[i].descricao
          contato.whatsapp = item.data[i].whatsapp
          contato.login = item.data[i].login
          contato.idPessoa = this.idPessoa;
          this.contatos.push(contato)
        }
        console.log(this.contatos)
        // this.carregarContatoGrid(this.contatos);
        this.setEmiter();
      }

      if (item.type == 'contato-dialog') {
        for (let i = 0; i < this.contatos.length; i++) {
          if (this.contatos[i].codigo == item.data.codigo) {
            this.contatos[i] = item.data;
          }
        }
        this.setEmiter();
      }
      if (item.type == 'confirm-dialog') {
        this.contatos.splice(item.data, 1);
        this.setEmiter();
      }

    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("contatos", this.contatos);
  }

  //  remove uma linha da grid
  remover(index): void {
    console.log(index)
    this.contatos.splice(index, 1);
    if (index.id) {
      this._contatoService.remove(index.id).pipe(take(1)).subscribe(item => {
        this._notifierService.notify(AlertType.Success, item.value);
      }, error => {
        console.log(error)
        // this._notifierService.notify(AlertType.Success, item.value);
      });
    }
    this.setEmiter();
  }


   dialogAtualizar(item) {
    // console.log(item)
    const dialogRef = this._dialog.open(DialogAtualizarContatoComponent, {
      width: '600px',
      data: {
        item: item,
        comboTipos: this.comboTipoContatos
      }
    });
  }

  dialogRemover(item) {
    // console.log(item)
    let obj = {
      id:item.id,
      idPessoa:this.idPessoa,
      tipo : item.tipo

    }
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '500px',
      data: {
        obj: obj,
        controller:'contato',
        item:item
      }
    });
  }


}
