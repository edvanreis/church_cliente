import { Component, OnInit } from '@angular/core';
import { MembroService } from '../../../service/membro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PessoaService } from '../../../service/pessoa.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { AlertType } from '../../../model/alert-type';
import { NotifierService } from 'angular-notifier';
import { EscolaridadeService } from '../../../service/escolaridade.service';
import { DialogConfirmComponent } from '../../dialog/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material';




@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss']
})
export class EscolaridadeComponent implements OnInit {
  
  public comboEscolaridade:any = []
  public escolaridades:any = []
  public escolaridadesGrid:any = []
  public form: FormGroup;

  constructor(private _service: EscolaridadeService,
              private _emitirEventoService: EmitirEventoService,
              private _notifierService: NotifierService,
              private _dialog: MatDialog) { }

  ngOnInit() {
    this.getComboEscolaridade();
    this._buildForm();
    this.getEmiter();
  }


  private _buildForm(): void {
    this.form = new FormGroup({
      'escolaridade': new FormControl(''),
      'curso': new FormControl(''),
    });
  }

  getComboEscolaridade() {
    this._service.getList().subscribe(item => {
      this.comboEscolaridade = item;
      // console.log(item);
    });
  }

  remover(index): void {
    this.escolaridades.splice(index, 1);
  }

  adicionar() {
    if(!this.form.controls['escolaridade'].value){
      this._notifierService.notify(AlertType.Error, "Por favor escolha pelo menos uma escolaridade!");
      return false;
    }
    let escolaridade = this.form.controls['escolaridade'].value;
    let isExist = this.escolaridades.find(i=>i.curso==this.form.controls['curso'].value);
    if(isExist){
      this._notifierService.notify(AlertType.Error, "Curso já adicionado!");
      return false;
    }
    
    let curso:string = this.form.controls['curso'].value;
    this.escolaridades.push({
        id:escolaridade.id,
        descricao:escolaridade.descricao,
        curso:curso.toUpperCase()
    });
    this.setEmiter();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.form.reset();
        this.escolaridades = [];
      }
      if (item.type == 'edit-escolaridades') {
        this.escolaridades = item.data;
        this.setEmiter();
      }
      if (item.type == 'confirm-dialog-escolaridade') {
        this.escolaridades.splice(item.data, 1);
        this.setEmiter();
      }

    });
  }
  

  carregarEscolaridadeGrid(contatos){
    contatos.forEach(element => {
      this.escolaridadesGrid.push({
        tipo: element.descricao,
        curso: element.curso,
      });
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("escolaridades",  this.escolaridades);
  }

  dialogRemover(item) {
    console.log(item)
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '600px',
      data: {
        controller: 'escolaridade',
        item: item,
      }
    });
  }
}
