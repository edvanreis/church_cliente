import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { MembroService } from '../../../service/membro.service';
import { DialogAtualizarEnderecoComponent } from '../../dialog/dialog-atualizar-endereco/dialog-atualizar-endereco.component';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { HelperChurch } from '../../../helper/helper.church';



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
  public enderecos: any = [];
  @Input('sizeLimitOne') sizeLimitOne = false;
  @Input('pessoa') pessoa = false;
  @Input('idPessoa') idPessoa;
  @Input('idAssociado') idAssociado;
  public tipoEndereco = [];
  public observacao: boolean = false;

  constructor(private _membroService: MembroService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _enderecoService: EnderecoService,
    private _dialog: MatDialog) { }

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
      if (!this.validarCep(cep)) {
        return;
      }
      this.cleanForm();
      this._enderecoService.carregarEndereco(cep).subscribe(item => {
        // console.log(item);
        this.form.controls['cep'].patchValue(item.cep);
        this.form.controls['logradouro'].patchValue(item.logradouro);
        this.form.controls['localidade'].patchValue(item.localidade);
        this.form.controls['uf'].patchValue(item.uf);
        this.form.controls['bairro'].patchValue(item.bairro);
        this.carregarEnderecoParam(item);
        this.setEmiter();
      }, error => {
        this._notifierService.notify(AlertType.Error, 'Erro ao conectar ao site dos correios');
      });
    }
  }

  cleanForm(){
    this.form.controls['logradouro'].patchValue('');
    this.form.controls['localidade'].patchValue('');
    this.form.controls['uf'].patchValue('');
    this.form.controls['bairro'].patchValue('');
    this.form.controls['complemento'].patchValue('');
    this.form.controls['tipo'].patchValue('');
  }

  validarCep(cep: string): boolean {
    cep = cep.replace("-", "").trim();
    let validarCep = /^[0-9]{8}$/;
    if (validarCep.test(cep)) {
      return true;
    } else {
      this._notifierService.notify(AlertType.Error, 'Não é um cep válido!');
      return false;
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
    this.endereco.cep = HelperChurch.retirarFormatacaoCep(endereco.cep);
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
    this.endereco.localidade = this.form.controls['localidade'].value;
    this.endereco.uf = this.form.controls['uf'].value;
    this.endereco.observacao = this.form.controls['observacao'].value;
    if (this.form.controls['tipo'].value) {
      this.endereco.tipo = this.form.controls['tipo'].value;
      let tipoObj = this.tipoEndereco.find(i => i.tipo == this.endereco.tipo);
      this.endereco.descTipoEndereco = tipoObj.descTipoEndereco;
      if (this.endereco.tipo == 'OUTROS') {
        this.observacao = true;
      } else {
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
        for (let i = 0; i < item.data.length; i++) {
          let endereco = {} as any;
          endereco.codigo = i + 1;
          endereco.id = item.data[i].id;
          endereco.numero = item.data[i].numero;
          endereco.cep = item.data[i].cep
          endereco.complemento = item.data[i].complemento
          endereco.bairro = item.data[i].bairro
          endereco.logradouro = item.data[i].logradouro
          endereco.localidade = item.data[i].localidade
          endereco.uf = item.data[i].uf
          endereco.tipo = item.data[i].tipo
          endereco.descTipoEndereco = item.data[i].descTipoEndereco
          endereco.idPessoa = this.idPessoa;
          this.enderecos.push(endereco)
        }
        this.setEmiter();
      }
      if (item.type == 'confirm-dialog-endereco') {
        this.enderecos.splice(item.data, 1);
        this.setEmiter();
      }
      if (item.type == 'endereco-dialog') {
        for (let i = 0; i < this.enderecos.length; i++) {
          if (this.enderecos[i].codigo == item.data.codigo) {
            this.enderecos[i] = item.data;
          }
        }
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
    if (this.enderecos.length > 0 && this.sizeLimitOne) {
      this._notifierService.notify(AlertType.Error, 'Apenas um endereço é permitido!');
      return false;
    }
    if (this.enderecos.length != 0) {
      this.endereco.codigo = this.enderecos[this.enderecos.length - 1].codigo + 1;
    } else {
      this.endereco.codigo = 1;
    }
    this.enderecos.push(this.endereco);
  }


  dialogAtualizar(item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogAtualizarEnderecoComponent, {
      width: '800px',
      data: {
        item: item,
        tipoEndereco: this.tipoEndereco,
        comboEstados: this.comboEstados,
        pessoa: this.pessoa
      }
    });
  }

  dialogRemover(item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '600px',
      data: {
        controller: 'endereco',
        item: item,
        idAssociado: this.idAssociado
      }
    });
  }
}
