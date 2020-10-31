import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-historico-pessoa',
  templateUrl: './dialog-historico-pessoa.component.html',
  styleUrls: ['./dialog-historico-pessoa.component.scss']
})
export class DialogHistoricoPessoaComponent implements OnInit {
  public columnNames;
  public displayedColumns: string[] = [];
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sortMarcacao: MatSort;


  constructor(public dialogRef: MatDialogRef<DialogHistoricoPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.columns();
    this.getHistory();
  }

  getHistory(): void {
    this.data.history.pipe(take(1)).subscribe(map => {
      // console.log(map);
      this.dados = new MatTableDataSource(map);
      this.dados.sort = this.sortMarcacao;
      this.dados.paginator = this.paginator;
    });
  }

  columns() {
    this.columnNames = [
      { id: 'status', value: 'Status' },
      { id: 'descSitucao', value: 'Situação' },
      { id: 'dataAtualizacao', value: 'Data atualização' },
      { id: 'usuarioAtualizacao', value: 'Usuário atualização' },
      { id: 'observacao', value: 'Observação' },
    ]
    this.displayedColumns = this.columnNames.map(x => x.id);
  }

  close(): void {
    this.dialogRef.close();
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

}
