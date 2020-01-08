import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembroService } from '../../../../service/membro.service';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { HelperChurch } from '../../../../helper/helper.church';
import { Pessoa } from '../../../../model/pessoa';




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
  constructor(private _membroService: MembroService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getEmiter();
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
  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('',Validators.required),
      'sobrenome': new FormControl('',Validators.required),
      'dataNascimento': new FormControl('',Validators.required),
      'rg': new FormControl('',Validators.required),
      'cpf': new FormControl('',Validators.required),
      'sexo': new FormControl('',Validators.required),
      'estadoCivil': new FormControl('',Validators.required),
      'nacionalidade': new FormControl('',Validators.required),
      'profissao': new FormControl(''),
      'batizado': new FormControl(''),
      'dizimista': new FormControl(''),
    });
  }


  setEmiter(): void {
    this._emitirEventoService.emitir("dadosPessoais", this.carregarObjeto());
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'save-ok') {
        console.log('entrou');
        this.form.reset();
      }
    });
  }

  carregarObjeto(): Pessoa {
    this.pessoa = new Pessoa();
    this.pessoa.nome = this.form.controls['nome'].value;
    this.pessoa.sobreNome = this.form.controls['sobrenome'].value;
    this.pessoa.rg = HelperChurch.retirarFormatacao(this.form.controls['rg'].value);
    this.pessoa.cpf = HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    this.pessoa.sexo = this.form.controls['sexo'].value;
    this.pessoa.estadoCivil = this.form.controls['estadoCivil'].value;
    this.pessoa.dataNascimento = !this.dataNascimento?this.form.controls['dataNascimento'].value:this.dataNascimento;
    this.pessoa.nacionalidade = this.form.controls['nacionalidade'].value;
    this.pessoa.profissao = this.form.controls['profissao'].value;
    this.pessoa.batizado = this.form.controls['batizado'].value;
    this.pessoa.dizimista = this.form.controls['dizimista'].value;
    return this.pessoa;
  }

  change() {
    this.setEmiter();
  }

  changeData(event) {
    this.dataNascimento = event.target.value;
  }
}
