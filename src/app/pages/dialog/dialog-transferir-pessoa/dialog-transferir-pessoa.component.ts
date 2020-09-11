import { VisitanteService } from '../../../service/visitante.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MembroService } from '../../../service/membro.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transferir-pessoa',
  templateUrl: './dialog-transferir-pessoa.component.html',
  styleUrls: ['./dialog-transferir-pessoa.component.scss']
})
export class DialogTransferirPessoaComponent implements OnInit {

  public igrejaSelecionada: any;
  public redeSelecionada: any;
  public celulaSelecionada: any;

  constructor(public dialogRef: MatDialogRef<DialogTransferirPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _membroService: MembroService,
    private _visitanteService: VisitanteService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    console.log(this.data)
    this.getEmiter();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmar() {
    let erro: boolean = false;
    if (this.data.controller === 'igreja') {
      if (this.igrejaSelecionada) {
        switch (this.data.tipoPessoa) {
          case 'M':
            this.transferirMembro(this.igrejaSelecionada.id);
            break;
          case 'V':
            this.transferirVisitante(this.igrejaSelecionada.id);
            break;
        }
      }
    } else if (this.data.controller === 'rede') {
      if (this.redeSelecionada) {
        switch (this.data.tipoPessoa) {
          case 'M':
            this.transferirMembro(this.redeSelecionada.id);
            break;
          case 'V':
            this.transferirVisitante(this.redeSelecionada.id);
            break;
        }
      }
    } else if (this.data.controller === 'celula') {
      if (this.celulaSelecionada) {
        switch (this.data.tipoPessoa) {
          case 'M':
            this.transferirMembro(this.celulaSelecionada.id);
            break;
          case 'V':
            this.transferirVisitante(this.celulaSelecionada.id);
            break;
        }
      }
    }


    if (erro) {
      this._notifierService.notify(AlertType.Error, 'Por favor selecione ' + this.data.controller);
    }

  }

  transferirMembro(id) {
    this._membroService.transferirMembro(this.data.controller, this.data.id, this.data.pessoaId, this.data.metodo)
      .pipe(take(1)).subscribe(item => {
        this.setEmiter();
        this.close();
        this._notifierService.notify(AlertType.Success, item.value);
      }, error => {
        this._notifierService.notify(AlertType.Error, error.error.message);

      });
  }

  transferirVisitante(id) {
    this._visitanteService.transferirVisitante(this.data.controller, this.data.id, this.data.pessoaId, this.data.metodo)
      .pipe(take(1)).subscribe(item => {
        this.setEmiter();
        this.close();
        this._notifierService.notify(AlertType.Success, item.value);
      }, error => {
        this._notifierService.notify(AlertType.Error, error.error.message);

      });
  }


  setEmiter(): void {
    this._emitirEventoService.emitir('transferido', this.data.tipoPessoa);
  }



}
