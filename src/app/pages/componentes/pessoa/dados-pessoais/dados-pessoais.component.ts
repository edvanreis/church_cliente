import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembroService } from '../../../../service/membro.service';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { HelperChurch } from '../../../../helper/helper.church';
import { Pessoa } from '../../../../model/pessoa';
import { PessoaService } from '../../../../service/pessoa.service';




@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]

  public form: FormGroup;
  public pessoa;
  public comboSexo = [];
  public comboEstadoCivil = [];
  public dataNascimento;
  public igrejaSelecionada: any;
  @Input('tipoCadastro') tipoCadastro;
  public hideTipo: boolean = true;
  public visisaoCelular: boolean;

  constructor(private _pessoaService: PessoaService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getEmiter();
    console.log(this.tipoCadastro)
    if (this.tipoCadastro == 'membro') {
      this.hideTipo = false;
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
      'observacao': new FormControl('')
    });
  }


  setEmiter(): void {
    this.setObj()
    this._emitirEventoService.emitir("dadosPessoais", this.pessoa);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'save-ok') {
        console.log('entrou');
        this.form.reset();
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        if (this.igrejaSelecionada.visisaoCelular) {
          this.visisaoCelular = true;
        }
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
    this.pessoa.observacao = this.form.controls['observacao'].value;

    if (this.form.controls['batizado'].value) {
      this.pessoa.ofertante = this.form.controls['batizado'].value;
    }

    if (this.form.controls['dizimista'].value) {
      this.pessoa.dizimista = this.form.controls['dizimista'].value;
    }

    return this.pessoa;
  }

  change() {
    this.setEmiter();
  }

  changeData(event) {
    this.dataNascimento = event.target.value;
  }
}
