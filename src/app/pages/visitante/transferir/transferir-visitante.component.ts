import { VisitanteService } from './../../../service/visitante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CelulaService } from './../../../service/celula.service';
import { RedeService } from './../../../service/rede.service';
import { Component, OnInit } from '@angular/core';
import { map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-transferir-visitante',
  templateUrl: './transferir-visitante.component.html',
  styleUrls: ['./transferir-visitante.component.scss']
})
export class TransferirVisitanteComponent implements OnInit {

  public id:any;
  public form: FormGroup;

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

  constructor(private _redeService: RedeService,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _service: VisitanteService) { }

  ngOnInit() {
    this.getEmiter();
    this.getParams();
    this._buildForm();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'dataCultoIgreja': new FormControl(''),
      'dataCultoRede': new FormControl(''),
      'dataReuniaoCelula': new FormControl(''),
    });
  }

  salvar(){
    this._service.tranferir(this.setObj()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setObj(){

    let obj = {} as any;
    obj.id = this.id;

    if(this.igrejaSelecionada){
      obj.igreja = {id:this.igrejaSelecionada.id}
    }
    if(this.redeSelecionada){
      obj.rede = {id:this.redeSelecionada.id}
    }
    if(this.celulaSelecionada){
      obj.celula = {id:this.celulaSelecionada.id}
    }
    return obj;
  }

  voltar() {
    this._router.navigate(['/auth/visitante/pesquisar']);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.visaoCelular = this.igrejaSelecionada.visaoCelular;
        this.carregarRede(this.igrejaSelecionada.id);
      }

    });
  }

  carregarRede(id) {

    this._redeService.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }


  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    if (this.visaoCelular) {
      this.carregarCelula(this.redeSelecionada.id);
    }
  }

  carregarCelula(id) {

    this._celulaService.getCelulaRede(id).pipe(take(1)).subscribe(item => {
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

  onSelectionCelulaChange($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getVisitante(this.id);
    }
  }

  getVisitante(id) {
    this._service.obterVisitante(id).pipe(take(1)).subscribe(item => {

      if(item.igreja){
        this.emitirIgreja(item.igreja);
      }

      if(item.rede){
        this.redeSelecionada = item.rede;
        this.redeValue = this.redeSelecionada.nome;
      }

      if(item.celula){
        this.celulaSelecionada = item.rede;
        this.celulaValue = this.celulaSelecionada.nome;
      }

    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
    this.igrejaSelecionada = item;
    if(this.igrejaSelecionada){
      this.carregarRede(this.igrejaSelecionada.id);
    }
  }


}
