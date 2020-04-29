import { Component, OnInit } from '@angular/core';
import { IgrejaService } from '../../../service/igreja.service';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { Router, ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogAtivarInativarComponent } from '../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component';
import { IgrejaSedeService } from '../../../service/igreja-sede.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
];


@Component({
  selector: 'app-pesquisar-igreja',
  templateUrl: './pesquisar-igreja.component.html',
  styleUrls: ['./pesquisar-igreja.component.scss']
})
export class PesquisarIgrejaComponent implements OnInit {

  public igrejas = [];
  filteredIgrejas: Observable<string[]>;
  myControl = new FormControl();
  public comboStatus = ELEMENT_DATA;
  public statusSelecionado = 'A';
  public form: FormGroup;
  public check: boolean = false;

  constructor(private _igrejaService: IgrejaService,
    private _sedeService: IgrejaSedeService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getList();
    this.getEmiter();
    this.getParams();
    this._buildForm();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'group': new FormControl(false),
    });
  }

  getListGroup() {
    this._sedeService.getList().pipe(take(1)).subscribe(item => {
      this.igrejas = item;
      // console.log(item);
      this.filteredIgrejas = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      console.log(error);
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }


  private _filter(value: string): string[] {
    console.log(value)
    const filterValue = value.toLowerCase();
    return this.igrejas.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  cadastrar() {
    localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/igreja/cadastrar'], {
      queryParams: {
        janela: 'Novo',
      },
      skipLocationChange: true
    });
  }

  editar(id, tipo) {
    localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/igreja/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id,
        tipo: tipo
      },
      skipLocationChange: true
    });
  }


  dialogStatus(id, controller) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        controller: controller
      }
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.data == 'status') {
        this.getList();
      }
    });
  }

  onSelection() {
    if (this.statusSelecionado == 'I') {
      this.form.controls['group'].patchValue(false);
      this.check = true;
      this.getListForStatus(this.statusSelecionado);
    } else {
      this.check = false;
      this.getList();
    }

  }

  getListForStatus(status) {
    this._igrejaService.getListForStatus(status).pipe(take(1)).subscribe(item => {
      console.log(item)
      this.igrejas = item;
      this.filteredIgrejas = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  getList() {
    this._igrejaService.getList().pipe(take(1)).subscribe(item => {
      console.log(item)
      this.igrejas = item;
      this.filteredIgrejas = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
      this.statusSelecionado = JSON.parse(localStorage.getItem("pesquisar"));
      localStorage.removeItem("pesquisar");
      this.getListForStatus(this.statusSelecionado);
    }
  }

  changeAgrupar(agrupar) {
    if (agrupar) {
      this.getListGroup();
    } else {
      this.getList();
    }
  }



}
