import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-dialog-pessoa-grupo-modalidade-musico',
  templateUrl: './dialog-pessoa-grupo-modalidade-musico.component.html',
  styleUrls: ['./dialog-pessoa-grupo-modalidade-musico.component.scss']
})
export class DialogPessoaGrupoModalidadeMusicoComponent implements OnInit {

  public modalidades = new Array();
  public modalidadesPessoa = new Array();
  public modalidade:any;


  constructor(public dialogRef: MatDialogRef<DialogPessoaGrupoModalidadeMusicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    console.log(this.data)
    this.getModalidades();
  }

  getModalidades(): void {
    this.data.modalidades.pipe(take(1)).subscribe(map => {
      console.log(map)
      this.modalidades = map;
    });
  }

  adicionar() {
    if (!this.modalidade) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha um cargo.!");
      return false;
    }
    this.modalidadesPessoa.push(this.modalidade);
  }

  remover(i){
    this.modalidadesPessoa.splice(i, 1);
  }

  setEmiter(): void {
    let obj = {
      id:this.data.id,
      modalidades:this.modalidadesPessoa
    }
    this._emitirEventoService.emitir("dialog-pessoa-modalidade", obj);
  }



  close(): void {
    this.dialogRef.close();
  }

  confirmar(){
    this.setEmiter();
    this.close();
  }


}
