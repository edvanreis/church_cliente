import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembroService } from '../../../service/membro.service';
import { NotifierService } from 'angular-notifier';
import { Pessoa } from '../../../model/pessoa';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';


@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  public form: FormGroup;
  public maskCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public comboEstados = [];
  public pessoa;

  constructor(private _membroService: MembroService, private _notifierService: NotifierService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'cep': new FormControl('', Validators.required),
      'numero': new FormControl(''),
      'bairro': new FormControl({ value: '', disabled: true }),
      'complemento': new FormControl(''),
      'logradouro': new FormControl({ value: '', disabled: true }),
      'cidade': new FormControl({ value: '', disabled: true }),
      'uf': new FormControl({ value: '', disabled: true }),
    });
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

  getComboUF() {
    this._membroService.carregarEstados().subscribe(item => {
      this.comboEstados = item;
      // console.log(item);
    });
  }

  change() {
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("endereco", this.fillPessoa());
  }

  
  fillPessoa(): Pessoa {
    this.pessoa = new Pessoa();
    this.pessoa.cep = this.form.controls['cep'].value;
    this.pessoa.numero = this.form.controls['numero'].value;
    this.pessoa.complemento = this.form.controls['complemento'].value;
    this.pessoa.bairro = this.form.controls['bairro'].value;
    this.pessoa.logradouro = this.form.controls['logradouro'].value;
    this.pessoa.cidade = this.form.controls['cidade'].value;
    this.pessoa.uf = this.form.controls['uf'].value;
   
    return this.pessoa;
  }

}
