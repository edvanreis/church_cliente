import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { MembroService } from '../../../service/membro.service';
import { Endereco } from '../../../model/Endereco';
import { Observable } from 'rxjs';



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
  public enderecos:any = [];
  @Input('sizeLimitOne')sizeLimitOne = false;
  @Input('pessoa')pessoa = false;
  public tipoEndereco = [];
  public observacao:boolean = false;

  constructor(private _membroService: MembroService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _enderecoService: EnderecoService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboUF();
    this.getComboTipoEndereco();
    this.getEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'cep': new FormControl(''),
      'numero': new FormControl(''),
      'bairro': new FormControl(''),
      'complemento': new FormControl(''),
      'logradouro': new FormControl(''),
      'localidade': new FormControl(''),
      'uf': new FormControl(''),
      'tipo': new FormControl(''),
      'observacao': new FormControl(''),
    });
  }

  consultarCEP(event) {
    // console.log(event.target.value);
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
            this.carregarEnderecoParam(item);
            this.setEmiter();
          }
        }, error => {
          this._notifierService.notify(AlertType.Error, 'Erro ao conectar ao site dos correios');
        });
      }
    }
  }

  getComboUF() {
    this._enderecoService.carregarEstados().subscribe(item => {
      this.comboEstados = item;
      // console.log(item);
    });
  }

  getComboTipoEndereco() {
    this._enderecoService.carregarTiposEndereco().subscribe(item => {
      this.tipoEndereco = item;
    });
  }

  change() {
    this.carregarEndereco();
    this.setEmiter();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("endereco", this.enderecos);
  }


  carregarEnderecoParam(endereco) {
    this.endereco = {} as any;
    this.endereco.cep = endereco.cep;
    this.endereco.numero = endereco.numero;
    this.endereco.complemento = this.form.controls['complemento'].value;
    this.endereco.bairro = endereco.bairro;
    this.endereco.logradouro = endereco.logradouro;
    this.endereco.localidade = endereco.localidade;
    this.endereco.uf = endereco.uf;
    this.endereco.tipo = endereco.tipo;
    this.endereco.descTipoEndereco = endereco.descTipoEndereco;
    this.endereco.observacao = endereco.observacao;
  }

  carregarEndereco() {
    this.endereco = {} as any;
    this.endereco.cep = this.form.controls['cep'].value;
    this.endereco.numero = this.form.controls['numero'].value;
    this.endereco.complemento = this.form.controls['complemento'].value;
    this.endereco.bairro = this.form.controls['bairro'].value;
    this.endereco.logradouro = this.form.controls['logradouro'].value;
    this.endereco.localidade =this.form.controls['localidade'].value;
    this.endereco.uf = this.form.controls['uf'].value;
    this.endereco.observacao = this.form.controls['observacao'].value;
    if(this.form.controls['tipo'].value){
      this.endereco.tipo = this.form.controls['tipo'].value;
      let tipoObj = this.tipoEndereco.find(i=>i.tipo == this.endereco.tipo);
      this.endereco.descTipoEndereco = tipoObj.descTipoEndereco;
      if(this.endereco.tipo=='OUTROS'){
        this.observacao = true;
      }else{
        this.observacao = false;
      }
    }
  }



  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.form.reset();
        this.enderecos = [];
      }
      if (item.type == 'edit-endereco') {
          this.enderecos = item.data;
          this.setEmiter();
      }
    });
  }

  carregarEnderecoEmiter(endereco) {
    this.form.controls['cep'].patchValue(endereco.cep);
    this.form.controls['numero'].patchValue(endereco.numero);
    this.form.controls['complemento'].patchValue(endereco.complemento);
    this.form.controls['bairro'].patchValue(endereco.bairro);
    this.form.controls['logradouro'].patchValue(endereco.logradouro);
    this.form.controls['localidade'].patchValue(endereco.localidade);
    this.form.controls['uf'].patchValue(endereco.uf);
    this.form.controls['tipo'].patchValue(endereco.tipo);
  }


    //  remove uma linha da grid
    remover(index): void {
      this.enderecos.splice(index, 1);
      this.setEmiter();
    }
  
    adicionar() {
      if(this.enderecos.length > 0 && this.sizeLimitOne){
        this._notifierService.notify(AlertType.Error, 'Apenas um endereço é permitido!');
        return false;
      }
      this.enderecos.push(this.endereco);
    }

}
