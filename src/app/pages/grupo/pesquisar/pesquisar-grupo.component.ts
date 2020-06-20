import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  public statusSelecionado:any;
  public form: FormGroup;
  public check: boolean = false;
  public igrejaSelecionada:any;
  public grupos = [];
  public filteredGrupos: Observable<string[]>;
  public myControl = new FormControl();

  constructor( private _notifierService: NotifierService,
    private _router: Router,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _avRoute: ActivatedRoute,
    private _excelService: ExcelService,
    private _serviceGruop: GrupoService ) { }

  ngOnInit() {
   this.getEmiter();
   this._buildForm();
  }

  cadastrar() {
    // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/grupo/cadastrar']);
  }

  getEmiter() {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.carregarGrupos(this.igrejaSelecionada.id);
      }
    });
  }


  carregarGrupos(id) {
    this._serviceGruop.findGruposTrabalhoESubByIgreja(id).pipe(take(1)).subscribe(item => {
      console.log(item);
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

  carregarGruposGroupBy(id) {
    this._serviceGruop.getGruposByIgrejasGroupBy(id).pipe(take(1)).subscribe(item => {
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
    if (this.igrejaSelecionada && agrupar) {
      this.carregarGruposGroupBy(this.igrejaSelecionada.id);
    } else {
      this.carregarGrupos(this.igrejaSelecionada.id);
    }
  }


  exportAsXLSX() {
    let dados = [];
    this.grupos.forEach(i => {
      dados.push({
        "Sub Grupo": i.isSubGrupo?"Sim":"Não",
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

  dialogStatus(id, controller) {
    const dialogRef = this._dialog.open(DialogAtivarInativarComponent, {
      width: '600px',
      data: {
        id: id,
        controller: controller
      }
    });
  }


  editar(id, tipo) {
   // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/grupo/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id,
        tipo: tipo
      },
      skipLocationChange: true
    });
  }


}
