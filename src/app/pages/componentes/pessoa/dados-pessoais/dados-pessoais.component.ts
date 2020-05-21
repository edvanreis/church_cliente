import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembroService } from '../../../../service/membro.service';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { HelperChurch } from '../../../../helper/helper.church';
import { Pessoa } from '../../../../model/pessoa';
import { PessoaService } from '../../../../service/pessoa.service';


const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
  { codigo: null, value: 'Todos' },
];


@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  public form: FormGroup;
  public pessoa;
  public comboSexo = [];
  public comboEstadoCivil = [];
  public dataNascimento;
  public igrejaSelecionada: any;
  public celulaSelecionada: any;
  @Input('membroInput') membroInput: boolean;
  @Input('pesquisa') pesquisa: boolean;
  public hideVisitante: boolean = true;
  public visaoCelular: boolean;
  public comboStatus = ELEMENT_DATA;

  constructor(private _pessoaService: PessoaService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getEmiter();
    // console.log(this.membroInput)
    if (this.membroInput) {
      this.hideVisitante = false;
    }
  }

  getComboSexo() {
    this._pessoaService.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._pessoaService.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
  }
  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'sobrenome': new FormControl('', Validators.required),
      'dataNascimento': new FormControl('', Validators.required),
      'rg': new FormControl('', Validators.required),
      'cpf': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'estadoCivil': new FormControl('', Validators.required),
      'nacionalidade': new FormControl('', Validators.required),
      'profissao': new FormControl(''),
      'batizado': new FormControl(''),
      'dizimista': new FormControl(''),
      'observacao': new FormControl(''),
      'cartaRecomendacao': new FormControl(''),
      'status': new FormControl(''),
      'membroDaCelula': new FormControl('')
    });
  }


  setEmiter(): void {
    this.setObj()
    this._emitirEventoService.emitir("dadosPessoais", this.pessoa);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.form.reset();
        this.pessoa = {} as any;
      }
      if (item.type == 'edit-dadosPessoais') {
        this.getObj(item.data);
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.visaoCelular = this.igrejaSelecionada.visaoCelular;
      }
      if (item.type == 'celula-comp') {
        this.celulaSelecionada = item.data;
      }
    });
  }

  setObj() {
    this.pessoa = {} as any;
    this.pessoa.nome = this.form.controls['nome'].value;
    this.pessoa.sobreNome = this.form.controls['sobrenome'].value;
    this.pessoa.rg = HelperChurch.retirarFormatacao(this.form.controls['rg'].value);
    this.pessoa.cpf = HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    this.pessoa.sexo = this.form.controls['sexo'].value;
    this.pessoa.estadoCivil = this.form.controls['estadoCivil'].value;
    this.pessoa.dataNascimento = this.form.controls['dataNascimento'].value;
    this.pessoa.nacionalidade = this.form.controls['nacionalidade'].value;
    this.pessoa.profissao = this.form.controls['profissao'].value;
    this.pessoa.observacao = HelperChurch.isNull(this.form.controls['observacao'].value);
    this.pessoa.status = HelperChurch.isNull(this.form.controls['status'].value);

    if (this.form.controls['batizado'].value) {
      this.pessoa.batizado = this.form.controls['batizado'].value;
    }

    if (this.form.controls['dizimista'].value) {
      this.pessoa.dizimista = this.form.controls['dizimista'].value;
    }
    if (this.form.controls['cartaRecomendacao'].value) {
      this.pessoa.cartaRecomendacao = this.form.controls['cartaRecomendacao'].value;
    }
    if(this.igrejaSelecionada){
      this.pessoa.igreja = this.igrejaSelecionada;
    }
    if(this.igrejaSelecionada){
      this.pessoa.celula = this.celulaSelecionada;
    }
    if (this.form.controls['membroDaCelula'].value) {
      this.pessoa.membroDaCelula = this.form.controls['membroDaCelula'].value;
    }
    //  console.log(this.pessoa)
    return this.pessoa;
  }

  getObj(dados){
    // console.log(dados)
    this.form.controls['nome'].patchValue(dados.nome);
    this.form.controls['sobrenome'].patchValue(dados.sobreNome);
    this.form.controls['rg'].patchValue(dados.rg);
    this.form.controls['cpf'].patchValue(dados.cpf);
    this.form.controls['sexo'].patchValue(dados.sexoEnum);
    this.form.controls['estadoCivil'].patchValue(dados.estadoCivilEnum);
    this.form.controls['nacionalidade'].patchValue(dados.nacionalidade);
    this.form.controls['profissao'].patchValue(dados.profissao);
    this.form.controls['observacao'].patchValue(dados.observacao);
    this.form.controls['batizado'].patchValue(dados.batizado);
    this.form.controls['dizimista'].patchValue(dados.dizimista);
    this.form.controls['dataNascimento'].patchValue(dados.dataNascimento);
    this.form.controls['cartaRecomendacao'].patchValue(dados.cartaRecomendacao);
    this.form.controls['status'].patchValue(dados.status);
    this.form.controls['membroDaCelula'].patchValue(dados.membroDaCelula);
    this.setObj();
    this.setEmiter();
  }
  

  change() {
    this.setEmiter();
  }

  changeData(event) {
    this.dataNascimento = event.target.value;
  }
}
