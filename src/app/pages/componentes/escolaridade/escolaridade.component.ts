import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  public comboEscolaridades: any = []
  public escolaridades: any = []
  public escolaridadesGrid: any = []
  public form: FormGroup;
  @Input('associadoId') associadoId;
  public isCuso:boolean = false;
  public escolaridade:any;

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
      this.comboEscolaridades = item;
      // console.log(item);
    });
  }

  remover(index): void {
    this.escolaridades.splice(index, 1);
  }

  adicionar() {
    if (!this.form.controls['escolaridade'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha pelo menos uma escolaridade!");
      return false;
    }
    let escolaridade = this.form.controls['escolaridade'].value;
    if(this.form.controls['curso'].value){
      let isExist = this.escolaridades.find(i => i.curso == this.form.controls['curso'].value.toUpperCase());
      if (isExist) {
        this._notifierService.notify(AlertType.Error, "O Curso já foi adicionado!");
        return false;
      }
    }

    let curso: string = this.form.controls['curso'].value;
    curso = curso?curso.toUpperCase():null
    this.escolaridades.push({
      codigo: escolaridade.codigo,
      id: escolaridade.id,
      descricao: escolaridade.descricao,
      curso: curso
    });
    this.setEmiter();
    this.form.reset();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.form.reset();
        this.escolaridades = [];
      }
      if (item.type == 'edit-escolaridades') {
        for (let i = 0; i < item.data.length; i++) {
          let escolaridade = {} as any;
          escolaridade.id = item.data[i].id;
          escolaridade.descricao = item.data[i].descricao;
          this.escolaridades.push(escolaridade);
          this.setEmiter();
        }
      }
      if (item.type == 'confirm-dialog-escolaridade') {
        this.escolaridades.splice(item.data, 1);
        this.setEmiter();
      }

    });
  }


  carregarEscolaridadeGrid(contatos) {
    contatos.forEach(element => {
      this.escolaridadesGrid.push({
        tipo: element.descricao,
        curso: element.curso,
      });
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("escolaridades", this.escolaridades);
  }

  dialogRemover(i,item) {
    const dialogRef = this._dialog.open(DialogConfirmComponent, {
      width: '600px',
      data: {
        controller: 'escolaridade',
        item: item,
        associadoId: this.associadoId,
        index:i
      }
    });
  }

  inputValid(){
    let lista = [];
    lista.push("SUPERIOR INCOMPLETO")
    lista.push("SUPERIOR INCOMPLETO")
    lista.push("SUPERIOR COMPLETO")
    lista.push("MESTRADO")
    lista.push("DOUTORADO")
    lista.push("PH. D")
    lista.push("PÓS-GRADUAÇÃO")

    let escolaridade = lista.find(item=>item===this.escolaridade.descricao);
    if(escolaridade){
      this.isCuso = true;
    }else{
      this.isCuso = false;
    }

  }
}
