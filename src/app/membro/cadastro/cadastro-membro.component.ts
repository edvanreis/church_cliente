import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MembroService } from '../../service/membro.service';
import { HelperChurch } from '../../helper/helper-church';
import { AlertType } from '../../model/alert-type';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.scss']
})
export class CadastroMembroComponent implements OnInit {

  public carregarSexo$: Observable<any[]>;
  public carregarEstadoCivil$: Observable<any[]>;
  public carregarTipoContatos$: Observable<any[]>;
  public carregarEscolariade$: Observable<any[]>;
  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/]
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]
  public maskCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]

  constructor(private _membroService: MembroService, public snackBar: MatSnackBar) { }

  public form: FormGroup;
  public contatos = [];
  public escolaridades = [];
  public isContato: boolean = true;
  public isCelular: boolean = false;
  public isTelefone: boolean = false;
  public isFacebook: boolean = false;
  public isEmail: boolean = false;



  ngOnInit() {
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getComboContatos();
    this.getComboEscolaridade();
    this._buildForm();

  }

  getComboSexo() {
    this.carregarSexo$ = this._membroService.carregarSexo();
  }

  getComboEstadoCivil() {
    this.carregarEstadoCivil$ = this._membroService.carregarEstadoCivil();
  }

  getComboContatos() {
    this.carregarTipoContatos$ = this._membroService.carregarTiposContatos();
  }

  getComboEscolaridade() {
    this.carregarEscolariade$ = this._membroService.carregarEscolaridade();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'dataNascimento': new FormControl(''),
      'contatos': new FormControl(''),
      'contato': new FormControl(''),
      'contatoTelefone': new FormControl(''),
      'contatoCelular': new FormControl(''),
      'whatsapp': new FormControl(''),
      'escolaridades': new FormControl(''),
      'curso': new FormControl(''),
      'rg': new FormControl(''),
      'cpf': new FormControl(''),
      'sexo': new FormControl(''),
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl(''),
      'celula': new FormControl(''),
      'profissao': new FormControl(''),
      'email': new FormControl(''),
    });

  }
  adicionarContato() {

    let contato: string;
    let email:string;
    contato = this.preecherContato();
    email = this.form.controls['email'].value;
    let pattern = new RegExp("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"); 

    if (!contato) {
      this.snackBar.open('Por favor preencha o campo contato!', '', {
        duration: 2000,
      });
      // HelperChurch.showNotification('Por favor preencha o campo contato!', AlertType.Success);
      return false;
    }
    if (!pattern.test(email)) {
      this.snackBar.open('Por favor digite um email válido!', '', {
        duration: 2000,
      });
      // HelperChurch.showNotification('Por favor digite um email válido!', AlertType.Success);
      return false;
    }

    console.log(contato);
    this.contatos.push({
      tipo: this.form.controls['contatos'].value,
      contato: contato,
      whatsapp: this.form.controls['whatsapp'].value,
      facebook: this.isFacebook,
      email: this.isEmail,
      telefone: this.isTelefone,
      celular: this.isCelular
    });
  }

  preecherContato() {
    let contato: string;
    if (this.form.controls['contato'].value) {
      contato = this.form.controls['contato'].value;
    } else if (this.form.controls['contatoTelefone'].value) {
      contato = this.form.controls['contatoTelefone'].value;
    } else if (this.form.controls['contatoCelular'].value) {
      contato = this.form.controls['contatoCelular'].value;
    }
    return contato;
  }

  adicionarEscolaridade() {
    if (!this.form.controls['curso'].value) {
      HelperChurch.showNotification('Por favor preencha o campo curso!', AlertType.Success);
      return false;
    }
    this.contatos.push({
      tipo: this.form.controls['escolaridade'].value,
      contato: this.form.controls['curso'].value,
    });
  }

  tipo(event) {
    console.log(event);
    if (event.value == 'Celular' || event.value == 'Celular do trabalho') {
      this.isCelular = true;
      this.isTelefone = false;
      this.isContato = false;
      this.isEmail = false;
      this.isFacebook = false;
    } else if (event.value == 'Telefone' || event.value == 'Telefone do trabalho') {
      this.isTelefone = true;
      this.isCelular = false;
      this.isContato = false;
      this.isEmail = false;
      this.isFacebook = false;
      this.form.controls['whatsapp'].patchValue(false);
    } else if (event.value == 'Facebook') {
      this.isFacebook = true
      this.isContato = true;
      this.isCelular = false;
      this.isTelefone = false;
      this.isEmail = false
      this.form.controls['whatsapp'].patchValue(false);
    } else if (event.value == 'E-mail') {
      this.isEmail = true
      this.isContato = true;
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


  //  remove uma linha da grid
  removerContato(index): void {
    this.contatos.splice(index, 1)
  }

}
