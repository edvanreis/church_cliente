import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { ContatoService } from '../../../service/contato.service';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertType } from '../../../model/alert-type';
import { HelperChurch } from '../../../helper/helper.church';

@Component({
  selector: 'app-dialog-atualizar-contato',
  templateUrl: './dialog-atualizar-contato.component.html',
  styleUrls: ['./dialog-atualizar-contato.component.scss']
})
export class DialogAtualizarContatoComponent implements OnInit {

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
  public contato;
  public isTipoAlterado:boolean = false;


  constructor(public dialogRef: MatDialogRef<DialogAtualizarContatoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: ContatoService) { }


  ngOnInit() {
    console.log(this.data)
    this.comboTipoContatos = this.data.comboTipos;
    this._buildForm();
    this.getContato();
  }



  private _buildForm(): void {
    this.form = new FormGroup({
      'tipos': new FormControl(''),
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

  close(): void {
    this.dialogRef.close();
  }


  getContato() {
    this.form.controls['whatsapp'].patchValue(this.data.item.whatsapp);
    this.form.controls['emailPrincipal'].patchValue(this.data.item.login);
    let tipo = this.comboTipoContatos.find(e => e.id == this.data.item.tipo.id)
    this.form.controls['tipos'].patchValue(tipo);
    this.tipo(tipo, false)
  }

  tipo(value, change: boolean) {
    if (change) {
      this.form.controls['whatsapp'].patchValue(false);
      this.form.controls['emailPrincipal'].patchValue(false);
      this.isTipoAlterado = true;
    }
    // console.log(value);
    if (value) {
      if (value.nome == 'CELULAR' || value.nome == 'CELULAR DO TRABALHO') {
        this.isCelular = true;
        this.isTelefone = false;
        this.isContato = false;
        this.isEmail = false;
        this.isFacebook = false;
        this.form.controls['contatoCelular'].patchValue(this.data.item.descricao)
      } else if (value.nome == 'TELEFONE' || value.nome == 'TELEFONE DO TRABALHO') {
        this.isTelefone = true;
        this.isCelular = false;
        this.isContato = false;
        this.isEmail = false;
        this.isFacebook = false;
        this.form.controls['contatoTelefone'].patchValue(this.data.item.descricao);

      } else if (value.nome == 'FACEBOOK') {
        this.isFacebook = true
        this.isContato = true;
        this.isCelular = false;
        this.isTelefone = false;
        this.isEmail = false
        this.form.controls['contato'].patchValue(this.data.item.descricao);
      } else if (value.nome == 'E-MAIL') {
        this.isEmail = true
        this.isContato = false;
        this.isFacebook = false;
        this.isCelular = false;
        this.isTelefone = false;
        this.form.controls['email'].patchValue(this.data.item.descricao);
      } else {
        this.isCelular = false;
        this.isTelefone = false;
        this.isContato = true;
        this.isFacebook = false;
        this.form.controls['contato'].patchValue(this.data.item.descricao)
      }
    }
  }

  salvar() {
    let descricao: string = this.preecherContato();

    let obj = {} as any;

    obj.tipo = this.form.controls['tipos'].value;
    obj.descricao = descricao;
    obj.whatsapp = HelperChurch.isBoolean(this.form.controls['whatsapp'].value);
    obj.login = HelperChurch.isBoolean(this.form.controls['emailPrincipal'].value);
    
    if (this.data.item.id) {
      obj.id = this.data.item.id;
      obj.isTipoAlterado = this.isTipoAlterado;
    }
    if (this.data.item.idPessoa) {
      obj.idPessoa = this.data.item.idPessoa;
    }
    console.log(obj)
    if (obj.id) {
      this.save(obj);
    }
    obj.codigo = this.data.item.codigo;
    this.contato = obj;
    this.setEmiter();
    this.close();
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
  }


  setEmiter(): void {
    this._emitirEventoService.emitir('contato-dialog', this.contato);
  }

  save(obj) {
    this._service.update(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

}
