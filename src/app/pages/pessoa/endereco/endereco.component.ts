import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { Pessoa } from '../../../model/pessoa';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { MembroService } from '../../../service/membro.service';
import { Endereco } from '../../../model/Endereco';



@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  public form: FormGroup;
  public maskCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public comboEstados = [];
  public endereco;

  constructor(private _membroService: MembroService, 
              private _notifierService: NotifierService, 
              private _emitirEventoService: EmitirEventoService,
              private _enderecoService: EnderecoService ) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboUF();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'cep': new FormControl('', Validators.required),
      'numero': new FormControl(''),
      'bairro': new FormControl({ value: '', disabled: true }),
      'complemento': new FormControl(''),
      'logradouro': new FormControl({ value: '', disabled: true }),
      'localidade': new FormControl({ value: '', disabled: true }),
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
        this._enderecoService.carregarEndereco(cep).subscribe(item => {
          if (item) {
            console.log(item);
            this.form.controls['logradouro'].patchValue(item.logradouro);
            this.form.controls['localidade'].patchValue(item.localidade);
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
    this._emitirEventoService.emitir("endereco", this.fillEndereco());
  }

  
  fillEndereco(): Endereco {
    this.endereco = new Endereco();
    this.endereco.cep = this.form.controls['cep'].value;
    this.endereco.numero = this.form.controls['numero'].value;
    this.endereco.complemento = this.form.controls['complemento'].value;
    this.endereco.bairro = this.form.controls['bairro'].value;
    this.endereco.logradouro = this.form.controls['logradouro'].value;
    this.endereco.localiade = this.form.controls['localidade'].value;
    this.endereco.uf = this.form.controls['uf'].value;
   
    return this.endereco;
  }

}
