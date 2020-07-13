import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { PessoaService } from '../../../service/pessoa.service';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';

@Component({
  selector: 'app-dialog-confirm-criar-visitante',
  templateUrl: './dialog-confirm-criar-visitante.component.html',
  styleUrls: ['./dialog-confirm-criar-visitante.component.scss']
})
export class DialogConfirmCriarVisitanteComponent implements OnInit {

  public columnNames;
  public displayedColumns: string[] = [];
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sortMarcacao: MatSort;

  constructor(public dialogRef: MatDialogRef<DialogConfirmCriarVisitanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _emitirEventoService: EmitirEventoService,
    private _notifierService: NotifierService,
    private _service: PessoaService) { }

  ngOnInit() {
    console.log(this.data.pessoa)
    this.columns();
    this.getPessoa();
  }

  columns() {
    this.columnNames = [
      { id: 'nome', value: 'Nome' },
      { id: 'sobreNome', value: 'Sobre Nome' },
      { id: 'rg', value: 'RG' },
      { id: 'cpf', value: 'CPF' },
      { id: 'igrejaNome', value: 'Igreja' },
      { id: 'observacao', value: 'Observação' },
    ]
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  getPessoa(): void {
    this.data.pessoaCadastrada.pipe(take(1)).subscribe(map => {
      // console.log(map);
      this.dados = new MatTableDataSource(map);
      this.dados.sort = this.sortMarcacao;
      this.dados.paginator = this.paginator;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  setEmiter(): void {
    this._emitirEventoService.emitir('confirm-dialog-criar-visitante', '');
  }

  confirmar() {
      this._service.save(this.data.pessoa).pipe(take(1)).subscribe(item => {
        this.setEmiter();
        this.close();
        this._notifierService.notify(AlertType.Success, item.value);
      }, error => {
        this._notifierService.notify(AlertType.Error, error.message);
      });
  }


}
