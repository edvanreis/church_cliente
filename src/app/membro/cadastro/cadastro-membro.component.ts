import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../model/alert-type';
import { Contatos } from '../../model/contatos';
import { MembroService } from '../../service/membro.service';
import { Membro } from '../../model/membro';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.scss']
})
export class CadastroMembroComponent implements OnInit {


  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/]
  public maskTelefone = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]
  public maskCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(private _membroService: MembroService, private _notifierService: NotifierService) { }

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



  ngOnInit() {
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getComboContatos();
    this.getComboEscolaridade();
    this._buildForm();
    this.getComboUF();


  }

  getComboSexo() {
    this._membroService.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._membroService.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
  }

  getComboContatos() {
    this._membroService.carregarTiposContatos().subscribe(item => {
      this.comboTipoContatos = item;
      // console.log(item);
    });
  }

  getComboEscolaridade() {
    this._membroService.carregarEscolaridade().subscribe(item => {
      this.comboEscolaridade = item;
      // console.log(item);
    });
  }
  getComboUF() {
    this._membroService.carregarEstados().subscribe(item => {
      this.comboEstados = item;
      // console.log(item);
    });
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'sobrenome': new FormControl('', Validators.required),
      'dataNascimento': new FormControl('', Validators.required),
      'contatos': new FormControl(''),
      'contato': new FormControl(''),
      'contatoTelefone': new FormControl(''),
      'contatoCelular': new FormControl(''),
      'whatsapp': new FormControl(''),
      'escolaridade': new FormControl(''),
      'curso': new FormControl(''),
      'rg': new FormControl('', Validators.required),
      'cpf': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl('', Validators.required),
      'celula': new FormControl(''),
      'profissao': new FormControl(''),
      'email': new FormControl(''),
      'cep': new FormControl('', Validators.required),
      'numero': new FormControl(''),
      'bairro': new FormControl({value: '', disabled: true}),
      'complemento': new FormControl(''),
      'logradouro': new FormControl({value: '', disabled: true}),
      'cidade': new FormControl({value: '', disabled: true}),
      'uf': new FormControl({value: '', disabled: true}),
      'batizado': new FormControl(''),
      'dizimista': new FormControl(''),
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

    this.contatosGrid.push({
      tipo: tipo,
      contato: contato,
      whatsapp: this.form.controls['whatsapp'].value,
      facebook: this.isFacebook,
      email: this.isEmail,
      telefone: this.isTelefone,
      celular: this.isCelular
    });
    // console.log(tipo);
    let obj = new Contatos();
    obj.tipo = tipoSelected;
    obj.contato = contato;
    obj.whatsapp = this.form.controls['whatsapp'].value;
    this.contatos.push(obj);
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
    // if (!this.form.controls['curso'].value) {
    //   HelperChurch.showNotification('Por favor preencha o campo curso!', AlertType.Success);
    //   return false;
    // }
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


  //  remove uma linha da grid
  removerContato(index): void {
    this.contatos.splice(index, 1);
    this.contatosGrid.splice(index, 1)
  }

  removerEscolaridade(index) {
    this.escolaridades.splice(index, 1);
    this.escolaridadesGrid.splice(index, 1)
  }

  consultarCEP(event) {
    console.log(event.target.value);
    let cep: string = event.target.value;
    if (cep) {
      cep = cep.replace("-", "").trim();
      let validarCep = /^[0-9]{8}$/;
      if (validarCep.test(cep)) {
        this._membroService.carregarEndereco(cep).subscribe(item => {
          if (item) {
            this.form.controls['logradouro'].patchValue(item.logradouro);
            this.form.controls['cidade'].patchValue(item.localidade);
            this.form.controls['uf'].patchValue(item.uf);
            this.form.controls['bairro'].patchValue(item.bairro);
          }
        }, error => {
          this._notifierService.notify(AlertType.Error, 'Erro ao conectar ao site dos correios');
        });
      }
    }
  }

  fillMembros(): Membro {
    this.membro = new Membro();
    // // dados pessoais
    this.membro.nome = this.form.controls['nome'].value;
    this.membro.sobreNome = this.form.controls['sobrenome'].value;
    this.membro.rg = this.form.controls['rg'].value;
    this.membro.cpf = this.form.controls['cpf'].value;
    this.membro.sexo = this.form.controls['sexo'].value;
    this.membro.estadoCivil = this.form.controls['estadoCivil'].value;
    this.membro.dataNascimento = this.form.controls['dataNascimento'].value;
    // this.membro.idCelula = this.form.controls['celula'].value;
    this.membro.nacionalidade = this.form.controls['nacionalidade'].value;
    this.membro.profissao = this.form.controls['profissao'].value;
    this.membro.batizado = this.form.controls['batizado'].value;
    this.membro.dizimista = this.form.controls['dizimista'].value;
    // endereço
    // this.membro.endereco.cep = this.form.controls['cep'].value;
    // this.membro.endereco.numero = this.form.controls['numero'].value;
    // this.membro.endereco.complemento = this.form.controls['complemento'].value;
    // this.membro.endereco.bairro = this.form.controls['bairro'].value;
    // this.membro.endereco.logradouro = this.form.controls['logradouro'].value;
    // this.membro.endereco.uf = this.form.controls['uf'].value; 
    // this.membro.endereco.cidade = this.form.controls['cidade'].value;
    //contatos
    this.membro.contatos = this.contatos;
    this.membro.escolaridades = this.escolaridades;    


    return this.membro;
  }

  salvar() {
    // if (!this.form.valid) {
    //   this._notifierService.notify(AlertType.Success, "Preencha todos os campos obrigatórios!");
    //   return false;
    // }
    this.membro = this.fillMembros();
    console.log(this.membro);
    this._membroService.save(this.membro).subscribe(item => {
      this.clear();
      this._notifierService.notify(AlertType.Success, "Salvo com sucesso!");
    }, error => {
      // console.log(error);
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  clear(){
    this.form.reset();
    this.contatos = [];
    this.contatosGrid = [];
    this.escolaridades = [];
    this.escolaridadesGrid = [];
  }
}
