import { PedidoService } from '../../../service/pedido.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnderecoService } from '../../../service/endereco.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-cadastrar-pedido',
  templateUrl: './cadastrar-pedido.component.html',
  styleUrls: ['./cadastrar-pedido.component.scss']
})
export class CadastrarPedidoComponent implements OnInit {

  public form: FormGroup;
  public maskCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public comboEstados = [];
  public comboAreaOracao= [];
  public pesquisa:boolean = false;
  public pedido = {} as any;
  public igrejaSelecionada:any;

  constructor(private _service: PedidoService,
    private _enderecoService: EnderecoService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.getComboUF();
    this.getAreaPedidoOracao();
    this.getEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'pessoaNome': new FormControl('',Validators.required),
      'descricao': new FormControl('',Validators.required),
      'area': new FormControl('',Validators.required),
      'celular': new FormControl(''),
      'email': new FormControl(''),
      'logradouro': new FormControl(''),
      'uf': new FormControl(''),
    });
  }

  getComboUF() {
    this._enderecoService.carregarEstados().subscribe(item => {
      this.comboEstados = item;
      // console.log(item);
    });
  }
    getAreaPedidoOracao() {
      this._service.carregarAreaPedidoOracao().subscribe(item => {
        this.comboAreaOracao = item;
        // console.log(item);
      });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.data);
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
      }
    });
  }

  salvar(){
    if(!this.validFields()){
      return;
    }
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.form.reset();
      this.setEmiter();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


 obj(){
   return {
      pessoaNome : this.form.controls['pessoaNome'].value,
      descricao : this.form.controls['descricao'].value,
      area : this.form.controls['area'].value,
      celular : this.form.controls['celular'].value,
      email : this.form.controls['email'].value,
      logradouro : this.form.controls['logradouro'].value,
      uf : this.form.controls['uf'].value,
      igreja:{id:this.igrejaSelecionada?this.igrejaSelecionada.id:null}
   }

 }

 validFields():boolean{
  if(!this.form.controls['pessoaNome'].value){
    this._notifierService.notify(AlertType.Error, "Por favor digite o Nome!");
    return false;
  }
  if(!this.form.controls['descricao'].value){
    this._notifierService.notify(AlertType.Error, "Por favor digite o Pedido de oração!");
    return false;
  }
  if(!this.form.controls['area'].value){
    this._notifierService.notify(AlertType.Error, "Por favor selecione uma Área!");
    return false;
  }
  return true;
}

setEmiter(): void {
  this._emitirEventoService.emitir("edit-igreja", '');
}

}
