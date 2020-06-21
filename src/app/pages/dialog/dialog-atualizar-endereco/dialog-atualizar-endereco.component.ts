import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { EnderecoService } from '../../../service/endereco.service';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { HelperChurch } from '../../../helper/helper.church';

@Component({
  selector: 'app-dialog-atualizar-endereco',
  templateUrl: './dialog-atualizar-endereco.component.html',
  styleUrls: ['./dialog-atualizar-endereco.component.scss']
})
export class DialogAtualizarEnderecoComponent implements OnInit {

  public tipoEndereco = [];
  public comboEstados = [];
  public form: FormGroup;
  public maskCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public endereco: any;


  constructor(public dialogRef: MatDialogRef<DialogAtualizarEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: EnderecoService) { }

  ngOnInit() {
    // console.log(this.data)
    this._buildForm();
    this.tipoEndereco = this.data.tipoEndereco;
    this.comboEstados = this.data.comboEstados;
    this.carregarEndereco(this.data.item);
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

  carregarEndereco(item) {
    this.form.controls['cep'].patchValue(item.cep);
    this.form.controls['numero'].patchValue(item.numero);
    this.form.controls['complemento'].patchValue(item.complemento);
    this.form.controls['bairro'].patchValue(item.bairro);
    this.form.controls['logradouro'].patchValue(item.logradouro);
    this.form.controls['localidade'].patchValue(item.localidade);
    this.form.controls['uf'].patchValue(item.uf);
    this.form.controls['tipo'].patchValue(item.tipo);
  }


  close(): void {
    this.dialogRef.close();
  }

  salvar() {
    let obj = this.preencherEndereco();
    if (obj.id) {
      if(!obj.tipo){
        this._notifierService.notify(AlertType.Error, 'Tipo de endereço é obrigatório!');
      }
      this.save(obj);
    }
    obj.codigo = this.data.item.codigo;
    this.endereco = obj;
    this.setEmiter();
    this.close();
  }

  preencherEndereco() {
    let obj = {} as any;
    obj.cep = HelperChurch.retirarFormatacaoCep(this.form.controls['cep'].value);
    obj.numero = this.form.controls['numero'].value;
    obj.complemento = this.form.controls['complemento'].value;
    obj.bairro = this.form.controls['bairro'].value;
    obj.logradouro = this.form.controls['logradouro'].value;
    obj.localidade = this.form.controls['localidade'].value;
    obj.uf = this.form.controls['uf'].value;
    obj.tipo = this.form.controls['tipo'].value;

    if (this.data.item.id) {
      obj.id = this.data.item.id;
    }
    return obj;
  }

  save(obj) {
    this._service.update(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.setEmiter();
      this.close();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('endereco-dialog', this.endereco);
  }

  consultarCEP(event) {
    // console.log(event.target.value);
    let cep: string = event.target.value;
    cep = HelperChurch.retirarFormatacaoCep(cep);
    if (!this.validarCep(cep)) {
      return;
    }
    this.form.reset();
    this._service.carregarEndereco(cep).subscribe(item => {
      console.log(item);
      this.carregarEndereco(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, 'Erro ao conectar ao site dos correios');
    });
  }

  validarCep(cep: string): boolean {
    let validarCep = /^[0-9]{8}$/;
    if (validarCep.test(cep)) {
      return true;
    } else {
      this._notifierService.notify(AlertType.Error, 'Não é um cep válido!');
      return false;
    }
  }

}
