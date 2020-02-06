import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ContatoService } from '../../../service/contato.service';
import { Observable } from 'rxjs';
import { Contatos } from '../../../model/contatos';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { HelperChurch } from '../../../helper/helper.church';

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
  public contatosGrid = [];
  public contatos = [];
  public comboTipoContatos = [];


  constructor(private _contatoService: ContatoService, private _notifierService: NotifierService, private _emitirEventoService: EmitirEventoService) { }

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
    this._contatoService.carregarTiposContatos().subscribe(item => {
      this.comboTipoContatos = item;
      // console.log(item);
    });
  }

  tipo(event) {
    // console.log(event.value);
    if (event.value == 'CELULAR' || event.value == 'CELULAR_TRABALHO') {
      this.isCelular = true;
      this.isTelefone = false;
      this.isContato = false;
      this.isEmail = false;
      this.isFacebook = false;
    } else if (event.value == 'TELEFONE' || event.value == 'TELEFONE_TRABALHO') {
      this.isTelefone = true;
      this.isCelular = false;
      this.isContato = false;
      this.isEmail = false;
      this.isFacebook = false;
      this.form.controls['whatsapp'].patchValue(false);
    } else if (event.value == 'FACEBOOK') {
      this.isFacebook = true
      this.isContato = true;
      this.isCelular = false;
      this.isTelefone = false;
      this.isEmail = false
      this.form.controls['whatsapp'].patchValue(false);
    } else if (event.value == 'EMAIL') {
      this.isEmail = true
      this.isContato = false;
      this.isFacebook = false;
      this.isCelular = false;
      this.isTelefone = false;
      this.form.controls['whatsapp'].patchValue(false);
    } else {
      this.isCelular = false;
      this.isTelefone = false;
      this.isContato = true;
    }
  }

  adicionar() {
    let contato: string;
    let email: string;
    contato = this.preecherContato();
    email = this.form.controls['email'].value;
    let pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

    if (this.isContato && !contato) {
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

    let tipo: string;
    let tipoSelected: string = this.form.controls['contatos'].value;

    this.comboTipoContatos.forEach(item => {
      // console.log(item);
      if (tipoSelected == item.tipo) {
        tipo = item.descTipoContato;
      }
    });
    let possuiEmailPrincipal: boolean = false;
    this.contatosGrid.forEach(element => {
      console.log(element);
      console.log(this.form.controls['emailPrincipal'].value);
      if (element.emailPrincipal) {
        if (element.emailPrincipal == this.form.controls['emailPrincipal'].value) {
          possuiEmailPrincipal = true;
        }
      }

    });
    if (possuiEmailPrincipal) {
      this._notifierService.notify(AlertType.Error, 'Você já possuí um email principal!');
      return false;
    }

    this.contatosGrid.push({
      tipo: tipo,
      contato: contato,
      whatsapp: HelperChurch.isBoolean(this.form.controls['whatsapp'].value),
      facebook: this.isFacebook,
      email: this.isEmail,
      telefone: this.isTelefone,
      celular: this.isCelular,
      emailPrincipal: HelperChurch.isBoolean(this.form.controls['emailPrincipal'].value),
    });
    // console.log(tipo);
    let obj = new Contatos();
    obj.tipo = tipoSelected;
    obj.contato = contato;
    obj.whatsapp =  HelperChurch.isBoolean(this.form.controls['whatsapp'].value);
    obj.emailPrincipal = HelperChurch.isBoolean(this.form.controls['emailPrincipal'].value);
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
        this.contatosGrid = [];
      }
      if (item.type == 'edit-contatos') {
        this.contatos = item.data;
        this.carregarContatoGrid(this.contatos);
      }

    });
  }

  carregarContatoGrid(contatos){
    contatos.forEach(element => {
      this.contatosGrid.push({
        tipo: element.tipo,
        contato: element.contato,
        whatsapp: element.whatsapp,
        facebook: null,
        email:null,
        telefone: null,
        celular: null,
        emailPrincipal: element.emailPrincipal
      });
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("contatos", this.contatos);
  }

  //  remove uma linha da grid
  remover(index): void {
    this.contatos.splice(index, 1);
    this.contatosGrid.splice(index, 1);
    this.setEmiter();
  }


}
