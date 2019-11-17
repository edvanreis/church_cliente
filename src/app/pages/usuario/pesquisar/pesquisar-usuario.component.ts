import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { UserService } from '../../../service/user.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { HelperChurch } from '../../../helper/helper.church';


const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
  { codigo: null, value: 'Todas' },
];


@Component({
  selector: 'app-pesquisar-usuario',
  templateUrl: './pesquisar-usuario.component.html',
  styleUrls: ['./pesquisar-usuario.component.scss']
})
export class PesquisarUsuarioComponent implements OnInit {

  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]
  public form: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = [];
  public columnNames;
  public dados = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  public pageIndex: number = 0;
  public loading: boolean = false;
  public lista = [];
  public nome: string;
  public login: string;
  public cpf: string;
  public comboStatus = ELEMENT_DATA;


  constructor(private _router: Router,
    private _userService: UserService,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _avRoute: ActivatedRoute, ) { }


  ngOnInit() {
    this.columns();
    this.builForm();
    this.getParams();

  }
  builForm() {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'login': new FormControl(''),
      'cpf': new FormControl(''),
      'status': new FormControl(''),
      'dataInicio': new FormControl(''),
      'dataFim': new FormControl('')
    });
  }

  getParams() {
    let editar: boolean = false;
    if (this._avRoute.snapshot.queryParamMap.get("login")) {
      let login = this._avRoute.snapshot.queryParamMap.get("login");
      this.form.controls['login'].patchValue(login);
      editar = true;
    }
    if (this._avRoute.snapshot.queryParamMap.get("nome")) {
      let nome = this._avRoute.snapshot.queryParamMap.get("nome");
      this.form.controls['nome'].patchValue(nome);
      editar = true;
    }
    if (this._avRoute.snapshot.queryParamMap.get("cpf")) {
      let cpf = this._avRoute.snapshot.queryParamMap.get("cpf");
      this.form.controls['cpf'].patchValue(cpf);
      editar = true;
    }
    if (this._avRoute.snapshot.queryParamMap.get("status")) {
      let status = this._avRoute.snapshot.queryParamMap.get("status");
      this.form.controls['status'].patchValue(status);
      editar = true;
    }
    if (editar) {
      this.pesquisar();
    }
  }

  applyFilter(value) {
    this.dados.filter = value.trim().toLowerCase();
  }

  paginatorEvent(event) {
    this.pageIndex = event.pageIndex;
  }

  columns() {
    this.columnNames = [
      { id: 'login', value: 'Login' },
      { id: 'nome', value: 'Nome' },
      { id: 'cpf', value: 'CPF' },
      { id: 'status', value: 'Status' },
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
        id: id,
        login: this.form.controls['login'].value,
        nome: this.form.controls['nome'].value,
        cpf: this.form.controls['cpf'].value,
        status: this.form.controls['status'].value
      },
      skipLocationChange: true
    });
  }

  pesquisar() {
    this.loading = true;
    this._userService.pesquisar(this.obj()).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.dados = new MatTableDataSource(item);
      this.dados.sort = this.sort;
      this.dados.paginator = this.paginator;
      this.loading = false;
    }, error => {
      // console.log(error);
      this.loading = false;
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  obj() {
    return {
      nome: this.form.controls['nome'].value,
      login: this.form.controls['login'].value,
      cpf:  HelperChurch.retirarFormatacao((this.form.controls['cpf'].value)),
      status: this.form.controls['status'].value
    }
  }


  alterarSenha(id) {
    this._router.navigate(['/auth/usuario/senha'], {
      queryParams: {
        janela: 'Editar',
        id: id,
        login: this.form.controls['login'].value,
        nome: this.form.controls['nome'].value,
        cpf: this.form.controls['cpf'].value,
        status: this.form.controls['status'].value
      },
      skipLocationChange: true
    });
  }

}
