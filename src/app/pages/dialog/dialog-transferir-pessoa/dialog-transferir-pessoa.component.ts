import { CelulaService } from './../../../service/celula.service';
import { VisitanteService } from '../../../service/visitante.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MembroService } from '../../../service/membro.service';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { AlertType } from '../../../model/alert-type';
import { RedeService } from '../../../service/rede.service';
import { map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transferir-pessoa',
  templateUrl: './dialog-transferir-pessoa.component.html',
  styleUrls: ['./dialog-transferir-pessoa.component.scss']
})
export class DialogTransferirPessoaComponent implements OnInit {

  public igrejaSelecionada: any;

  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public comboCelulas = [];
  public celulaSelecionada: any;
  public visaoCelular: boolean;
  public celulaValue: any;

  constructor(public dialogRef: MatDialogRef<DialogTransferirPessoaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _membroService: MembroService,
    private _visitanteService: VisitanteService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _redeService: RedeService,
    private _celulaService: CelulaService) { }

  ngOnInit() {
    console.log(this.data)
    this.getEmiter();
    if(this.data.controller=='rede'){
       this.carregarRede();
    }
    if(this.data.controller=='celula'){
       this.carregarCelula();
   }


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
    this._membroService.transferirMembro(this.data.controller,id, this.data.pessoaId, this.data.metodo)
      .pipe(take(1)).subscribe(item => {
        this.setEmiter();
        this.close();
        this._notifierService.notify(AlertType.Success, item.value);
      }, error => {
        this._notifierService.notify(AlertType.Error, error.error.message);

      });
  }

  transferirVisitante(id) {
    this._visitanteService.transferirVisitante(this.data.controller,id, this.data.pessoaId, this.data.metodo)
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

  onSelectionRedeClick($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
  }

  carregarRede() {

    this._redeService.getRedeIgreja(this.data.igrejaId).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as redes!");
    });
  }

  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  carregarCelula() {

    this._celulaService.getCelulaRede(this.data.redeId).pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
      // console.log(item);
      this.filteredCelula = this.myControlCelula.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCelula(value, this.comboCelulas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  private _filterCelula(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionCelulaClick($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
  }




}
