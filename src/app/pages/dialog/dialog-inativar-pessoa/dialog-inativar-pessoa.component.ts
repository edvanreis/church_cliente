import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dialog-inativar-pessoa',
  templateUrl: './dialog-inativar-pessoa.component.html',
  styleUrls: ['./dialog-inativar-pessoa.component.scss']
})
export class DialogInativarPessoaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogInativarPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService) { }

  ngOnInit() {
  }


  close(): void {
    this.dialogRef.close();
  }

  confirmar(){
    
  }
}
