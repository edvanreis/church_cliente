import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { PessoaService } from '../../../service/pessoa.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dialog-inativar-igreja',
  templateUrl: './dialog-inativar-igreja.component.html',
  styleUrls: ['./dialog-inativar-igreja.component.scss']
})
export class DialogInativarIgrejaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogInativarIgrejaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
