import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';
import { TipoGrupoService } from '../../../service/tipo-grupo.service';

@Component({
  selector: 'app-pesquisar-grupo',
  templateUrl: './pesquisar-grupo.component.html',
  styleUrls: ['./pesquisar-grupo.component.scss']
})
export class PesquisarGrupoComponent implements OnInit {

  constructor( private _notifierService: NotifierService,
    private _router: Router,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _avRoute: ActivatedRoute,
    private _excelService: ExcelService ) { }

  ngOnInit() {
   
  }

  cadastrar() {
    // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/grupo/cadastrar']);
  }

 

}
