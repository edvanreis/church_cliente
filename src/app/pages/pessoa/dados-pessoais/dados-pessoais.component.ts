import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MembroService } from '../../../service/membro.service';
import { Pessoa } from '../../../model/pessoa';



@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/]

  public form: FormGroup;
  public pessoa;
  public comboSexo = [];
  public comboEstadoCivil = [];
  constructor(private _membroService: MembroService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboSexo();
    this.getComboEstadoCivil();
  }

  getComboSexo() {
    this._membroService.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._membroService.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      console.log(item);
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
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl('', Validators.required),
      'profissao': new FormControl(''),
      'batizado': new FormControl(''),
      'dizimista': new FormControl(''),
      'celula': new FormControl('', Validators.required),
    });
  }


  setEmiter(): void {
    this._emitirEventoService.emitir("dadosPessoais", this.fillPessoa());
  }

  // getEmiter(): void {
  //   this._emitirEventoService.mensagem.subscribe(item => {
  //     console.log(item.type);
  //     if(item.type =='dadosPessoais'){
  //       this.setEmiter();
  //     }
  //   });
  // }

  fillPessoa(): Pessoa {
    this.pessoa = new Pessoa();
    this.pessoa.nome = this.form.controls['nome'].value;
    this.pessoa.sobreNome = this.form.controls['sobrenome'].value;
    this.pessoa.rg = this.form.controls['rg'].value;
    this.pessoa.cpf = this.form.controls['cpf'].value;
    this.pessoa.sexo = this.form.controls['sexo'].value;
    this.pessoa.estadoCivil = this.form.controls['estadoCivil'].value;
    this.pessoa.dataNascimento = this.form.controls['dataNascimento'].value;
    this.pessoa.idCelula = this.form.controls['celula'].value;
    this.pessoa.nacionalidade = this.form.controls['nacionalidade'].value;
    this.pessoa.profissao = this.form.controls['profissao'].value;
    this.pessoa.batizado = this.form.controls['batizado'].value;
    this.pessoa.dizimista = this.form.controls['dizimista'].value;
    return this.pessoa;
  }

  change() {
    this.setEmiter();
  }
}
