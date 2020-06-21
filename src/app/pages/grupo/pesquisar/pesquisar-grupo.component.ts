import { Component, OnInit } from '@angular/core';
import { MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GrupoService } from '../../../service/grupo.service';
import { AlertType } from '../../../model/alert-type';
import { take, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogAtivarInativarComponent } from '../../dialog/dialog-ativar-inativar/dialog-ativar-inativar.component';
import { IgrejaService } from '../../../service/igreja.service';
import { HelperChurch } from '../../../helper/helper.church';


const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
];

@Component({
  selector: 'app-pesquisar-grupo',
  templateUrl: './pesquisar-grupo.component.html',
  styleUrls: ['./pesquisar-grupo.component.scss']
})
export class PesquisarGrupoComponent implements OnInit {

  public comboStatus = ELEMENT_DATA;
  public statusSelecionado: any;
  public form: FormGroup;
  public check: boolean = false;
  public igrejaSelecionada: any;
  public grupos = [];
  public filteredGrupos: Observable<string[]>;
  public myControl = new FormControl();
  public comboIgrejas = [];
  public filteredIgreja: Observable<string[]>;
  public myControlIgreja = new FormControl();
  public igrejaValue: any;
  public statusValue: any;

  constructor(private _notifierService: NotifierService,
    private _router: Router,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _avRoute: ActivatedRoute,
    private _excelService: ExcelService,
    private _serviceGruop: GrupoService,
    private _igrejaService: IgrejaService) { }

  ngOnInit() {
    this.carregarIgrejas();
    this._buildForm();
    this.getEmiter();
    this.getParams();
  }

  cadastrar() {
    // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/grupo/cadastrar']);
  }

  carregarIgrejas() {

    this._igrejaService.getList().pipe(take(1)).subscribe(item => {
      this.comboIgrejas = item;
      // console.log(item);
      this.filteredIgreja = this.myControlIgreja.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterIgreja(value, this.comboIgrejas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filterIgreja(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChange($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
    this.carregarLista();
  }

  carregarLista() {
    this.setObj();
    if (this.form.controls['group'].value) {
      this.carregarGruposGroupBy();
    } else {
      this.carregarGrupos();
    }
  }

  carregarGrupos() {
    this._serviceGruop.findGruposTrabalhoESubByIgreja(this.setObj()).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.grupos = item;
      this.filteredGrupos = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os grupos!");
    });
  }

  carregarGruposGroupBy() {
    this._serviceGruop.getGruposByIgrejasGroupBy(this.setObj()).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.grupos = item;
      this.filteredGrupos = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os grupos!");
    });
  }

  setObj() {
    return {
      status: HelperChurch.isNull(this.statusSelecionado),
      igreja: this.getIgrejaSelecionada()
    }
  }

  getIgrejaSelecionada() {
    if (!this.igrejaSelecionada) {
      return null;
    } else {
      return { id: this.igrejaSelecionada.id };
    }
  }

  private _filter(value: string): string[] {
    // console.log(value)
    const filterValue = value.toLowerCase();
    return this.grupos.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'group': new FormControl(false),
    });
  }

  changeAgrupar(agrupar) {
    this.setObj();
    if (this.igrejaSelecionada && agrupar) {
      this.carregarGruposGroupBy();
    } else {
      this.carregarGrupos();
    }
  }


  exportAsXLSX() {
    let dados = [];
    this.grupos.forEach(i => {
      dados.push({
        "Sub Grupo": i.isSubGrupo ? "Sim" : "Não",
        "Nome": i.nome,
        "Líder": i.lider,
        "Tipo de Grupo": i.tipo.nome,
      });
    });
    this._excelService.exportAsExcelFile(dados, "pesquisa");
  }


  getListForStatus(status) {
    this._serviceGruop.getListForStatus(status).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.grupos = item;
      this.filteredGrupos = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }


  onSelection() {
    if (this.statusSelecionado == 'I') {
      this.form.controls['group'].patchValue(false);
      this.check = true;
      this.getListForStatus(this.statusSelecionado);
    } else {
      this.check = false;
      this.getListForStatus(this.statusSelecionado);
    }
  }

  dialogStatus(id) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        controller: "grupoTrabalho"
      }
    });
  }


  editar(id) {
    let obj = {
      status: this.statusSelecionado,
      igreja: this.igrejaSelecionada
    }
    localStorage.setItem("pesquisar", JSON.stringify(obj));
    this._router.navigate(['/auth/grupo/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id,
      },
      skipLocationChange: true
    });
  }
  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(obj => {
      if (obj.data == 'status') {
        this.carregarLista();
      }
    });
  }

  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisar")) {
      let obj = JSON.parse(localStorage.getItem("pesquisar"));
      this.igrejaSelecionada = obj.igreja;
      this.statusSelecionado = obj.status;
      if (obj && obj.igreja) {
        if (this.igrejaSelecionada) {
          this.igrejaValue = this.igrejaSelecionada.nome;
        }
      }
      if (obj && obj.status) {
        if (this.statusSelecionado) {
          this.statusValue = this.statusSelecionado.codigo;
        }
      }


      localStorage.removeItem("pesquisar");
      this.carregarLista();
    }
  }

}
