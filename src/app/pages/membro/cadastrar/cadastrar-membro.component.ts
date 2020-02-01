import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MembroService } from '../../../service/membro.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { Membro } from '../../../model/membro';
import { AlertType } from '../../../model/alert-type';
import { Contatos } from '../../../model/contatos';
import { take } from 'rxjs/operators';
import { EnderecoService } from '../../../service/endereco.service';
import { EtapaVisaoService } from '../../../service/etapa-visao.service';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastrar-membro.component.html',
  styleUrls: ['./cadastrar-membro.component.scss']
})
export class CadastrarMembroComponent implements OnInit {

  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]
  public maskCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]


  constructor(private _membroService: MembroService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _enderecoService: EnderecoService,
    private _etapaVisao: EtapaVisaoService) { }

  public form: FormGroup;
  public contatosGrid = [];
  public contatos = [];
  public escolaridades = [];
  public escolaridadesGrid = [];
  public isContato: boolean = true;
  public isCelular: boolean = false;
  public isTelefone: boolean = false;
  public isFacebook: boolean = false;
  public isEmail: boolean = false;
  public comboEstados = [];
  public comboSexo = [];
  public comboEstadoCivil = [];
  public comboTipoContatos = [];
  public comboEscolaridade = []
  public membro: Membro;
  public dadosPessoais: any;
  public endereco: any;
  public etapa$: Observable<any[]>;
  public etapas = [];
  public batizado:boolean = false;
  public dizimista:boolean;
 


  ngOnInit() {
    // this.getComboSexo();
    // this.getComboEstadoCivil();
    this.getComboContatos();
    this._buildForm();
    // this.getComboUF();
    this.getComboEtapaVisao();
    this.getEmiter();
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.type);
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }
      if (item.type == 'escolaridade') {
        this.endereco = item.data;
      }

    });
  }

  getComboEtapaVisao() {
    console.log('teste');
    this.etapa$ = this._etapaVisao.getList();
  }


  getComboContatos() {
    this._membroService.carregarTiposContatos().subscribe(item => {
      this.comboTipoContatos = item;
      // console.log(item);
    });
  }

 
  getComboUF() {
    this._enderecoService.carregarEstados().subscribe(item => {
      this.comboEstados = item;
      // console.log(item);
    });
  }

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
      'emailPrincipal': new FormControl(''),
      'batizado': new FormControl(''),
      'dizimista': new FormControl('')
    });
  }
  adicionarContato() {
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
      if (element.emailPrincial == this.form.controls['emailPrincipal'].value) {
        possuiEmailPrincipal = true;
      }
    });
    if (possuiEmailPrincipal) {
      this._notifierService.notify(AlertType.Error, 'Você já possuí um email principal!');
      return false;
    }

    this.contatosGrid.push({
      tipo: tipo,
      contato: contato,
      whatsapp: this.form.controls['whatsapp'].value,
      facebook: this.isFacebook,
      email: this.isEmail,
      telefone: this.isTelefone,
      celular: this.isCelular,
      emailPrincipal: this.form.controls['emailPrincipal'].value,
    });
    // console.log(tipo);
    let obj = new Contatos();
    obj.tipo = tipoSelected;
    obj.contato = contato;
    obj.whatsapp = this.form.controls['whatsapp'].value;
    obj.emailPrincipal = this.form.controls['emailPrincipal'].value;
    this.contatos.push(obj);
    this.clearInputContato();
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

  adicionarEscolaridade() {
    if (!this.form.controls['curso'].value) {
      this._notifierService.notify(AlertType.Error, 'Por favor preencha o campo curso!');
      return false;
    }
    let tipoSelected: string = this.form.controls['escolaridade'].value;
    let tipo: string;
    this.comboEscolaridade.forEach(item => {
      if (tipoSelected == item.tipo) {
        tipo = item.descricao;
      }
    });
    this.escolaridades.push({
      tipo: this.form.controls['escolaridade'].value,
      curso: this.form.controls['curso'].value,
    });
    this.escolaridadesGrid.push({
      tipo: tipo,
      curso: this.form.controls['curso'].value,
    });
    this.form.controls['curso'].patchValue('');
    // console.log(this.escolaridadesGrid);
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

  adicionarEtapa() {
    if (!this.form.controls['etapa'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma etapa.!");
      return false;
    }
    this.etapas.push(this.form.controls['etapa'].value);
  }
  //  remove uma linha da grid
  removerContato(index): void {
    this.contatos.splice(index, 1);
    this.contatosGrid.splice(index, 1)
  }

  removerEscolaridade(index) {
    this.escolaridades.splice(index, 1);
    this.escolaridadesGrid.splice(index, 1)
  }

  removerEtapa(index): void {
    this.etapas.splice(index, 1);
  }

  carregarObjeto(): Membro {
    // console.log(this.dadosPessoais);
    this.membro = new Membro();
    this.membro.nome = this.dadosPessoais.nome;
    this.membro.sobreNome = this.dadosPessoais.sobreNome;
    this.membro.rg = this.dadosPessoais.rg;
    this.membro.cpf = this.dadosPessoais.cpf;
    this.membro.sexo = this.dadosPessoais.sexo;
    this.membro.estadoCivil = this.dadosPessoais.estadoCivil;
    this.membro.dataNascimento = this.dadosPessoais.dataNascimento;
    this.membro.nacionalidade = this.dadosPessoais.nacionalidade;
    this.membro.profissao = this.dadosPessoais.profissao;
    // this.membro.batizado = this.dadosPessoais.batizado;
    // this.membro.dizimista = this.dadosPessoais.dizimista;
    // endereço
    this.membro.endereco.cep = this.endereco.cep;
    this.membro.endereco.numero = this.endereco.numero;
    this.membro.endereco.complemento = this.endereco.complemento;
    this.membro.endereco.bairro = this.endereco.bairro;
    this.membro.endereco.logradouro = this.endereco.logradouro;
    this.membro.endereco.uf = this.endereco.uf;
    this.membro.endereco.localidade = this.endereco.cidade;
    //contatos
    this.membro.contatos = this.contatos;
    //escolaridade
    this.membro.escolaridades = this.escolaridades;
    //escolaridade
    this.membro.etapas = this.etapas;
    return this.membro;
  }

  salvar() {
    if (!this.form.valid) {
      this._notifierService.notify(AlertType.Success, "Preencha todos os campos obrigatórios!");
      return false;
    }
    this.membro = this.carregarObjeto();
    console.log(this.membro)
    this._membroService.save(this.membro).pipe(take(1)).subscribe(item => {
      // console.log(item.value);
      this.clear();
      this.setEmiter();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      // console.log(error);
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  clear() {
    this.setEmiter();
    this.contatos = [];
    this.contatosGrid = [];
    this.escolaridades = [];
    this.escolaridadesGrid = [];
    this.form.controls['escolaridade'].patchValue('');
    this.form.controls['contatos'].patchValue('');
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("save-ok", "");
  }

  setFieldFormControl(field, value) {
    this.form.controls[field].patchValue(value)
  }

 
 
}
