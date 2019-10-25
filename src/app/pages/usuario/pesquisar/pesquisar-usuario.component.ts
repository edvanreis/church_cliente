import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { UserService } from '../../../service/user.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-pesquisar-usuario',
  templateUrl: './pesquisar-usuario.component.html',
  styleUrls: ['./pesquisar-usuario.component.scss']
})
export class PesquisarUsuarioComponent implements OnInit {


  public form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading:boolean = false;
  public lista = [];
  

  constructor(private _router: Router,
    private _userService:UserService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService) { }


  ngOnInit() {
    this.columns();
    // this.getList();
    this.emiter();
    this.builForm();
  }
builForm(){
  this.form = new FormGroup({
    'nome': new FormControl(''),
    'login': new FormControl(''),
  });
}

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  columns() {
    this.columnNames = [
      { id: 'login', value: 'login' },
      { id: 'Nome', value: 'nome' },
      { id: 'id', value: 'Ação' }
    ];
    this.displayedColumns = this.columnNames.map(x => x.id);
  }


  cadastrar() {
    this._router.navigate(['/auth/usuario/cadastrar'], {
      queryParams: {
        janela: 'Novo',
      },
      skipLocationChange: true
    });
  }
  editar(id) {
    this._router.navigate(['/auth/usuario/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

  pesquisar() {
    this.loading = true;
    this._userService.pesquisar(this.obj()).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      this.loading = false;
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  obj(){
    return {
      nome:this.form.controls['nome'].value,
      login:this.form.controls['login'].value
    }
  }

  // remover(id) {
  //   const dialogRef = this._dialog.open(DialogRemoverPermissaoComponent, {
  //     width: '600px',
  //     data: {
  //       id: id,
  //       tela:'permissoes',
  //       panelClass: 'components-container-gt-xs'
  //     }
  //   });
  // }

  emiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.data == 'remove') {
        // this.getList();
      }
    });
  }


}
