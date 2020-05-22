import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { ExcelService } from '../../../service/excel.service';

@Component({
  selector: 'app-pesquisar-reuniao',
  templateUrl: './pesquisar-reuniao.component.html',
  styleUrls: ['./pesquisar-reuniao.component.scss']
})
export class PesquisarReuniaoComponent implements OnInit {

  constructor(private _router: Router,
    //private _service: ,
    private _notifierService: NotifierService,
    private _dialog: MatDialog,
    private _emitirEventoService: EmitirEventoService,
    private _excelService: ExcelService,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  cadastrar() {
    // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/reuniao/cadastrar'], {
      queryParams: {
        janela: 'Nova',
      },
      skipLocationChange: true
    });
  }

}
