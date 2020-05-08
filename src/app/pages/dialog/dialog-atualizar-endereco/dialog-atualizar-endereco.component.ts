import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { EnderecoService } from '../../../service/endereco.service';
import { FormGroup, FormControl } from '@angular/forms';

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


  constructor(public dialogRef: MatDialogRef<DialogAtualizarEnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service:EnderecoService) { }

  ngOnInit() {
    console.log(this.data)
    this._buildForm();
    this.tipoEndereco = this.data.tipoEndereco;
    this.comboEstados = this.data.comboEstados;
    this.carregarEndereco();
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

  carregarEndereco() {
    this.form.controls['cep'].patchValue(this.data.item.cep);
    this.form.controls['numero'].patchValue(this.data.item.numero);
    this.form.controls['complemento'].patchValue(this.data.item.complemento);
    this.form.controls['bairro'].patchValue(this.data.item.bairro);
    this.form.controls['logradouro'].patchValue(this.data.item.logradouro);
    this.form.controls['localidade'].patchValue(this.data.item.localidade);
    this.form.controls['uf'].patchValue(this.data.item.uf);
    this.form.controls['tipo'].patchValue(this.data.item.tipo);
  }

  
  close(): void {
    this.dialogRef.close();
  }

}
