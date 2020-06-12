import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CelulaService } from '../../../service/celula.service';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { PessoaService } from '../../../service/pessoa.service';
import { FaltasService } from '../../../service/faltas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pesquisar-justificar-ausencia',
  templateUrl: './pesquisar-justificar-ausencia.component.html',
  styleUrls: ['./pesquisar-justificar-ausencia.component.scss']
})
export class PesquisarJustificarAusenciaComponent implements OnInit {

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public celulaValue: string;
  public comboCelulas = [];
  public celulaSelecionada: any;
  public rede: any;
  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public membroSelecionado;
  public faltas = [];
  public checkedFaltasList = [];
  public retornoCheckedFaltasList:string;
  public membroValue:any;

  constructor(private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _pessoaService: PessoaService,
    private _faltasService: FaltasService,
    private _router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarCelula();
    this.getParams(); 
  }


  carregarCelula() {

    this._celulaService.getList().pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
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
    this.rede = this.celulaSelecionada.rede.nome;
    this.carregarMembro(this.celulaSelecionada.id);
  }

  carregarMembro(id) {
    this._pessoaService.getMembroCelula(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembro(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembro(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    this.membroSelecionado = option;
    this.getFaltasPessoa(this.membroSelecionado.id); 
  }

  getFaltasPessoa(id) {
    this._faltasService.getFaltasByPessoa(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.faltas = item;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  cadastrar() {

    let obj = this.objPesquisa();
    localStorage.setItem("pesquisar", JSON.stringify(obj));
    if(this.checkedFaltasList.length == 0){
      this._notifierService.notify(AlertType.Error, "Por favor selecione pelo menos um dia a ser justificado!");
      return false;
    }
    if(!this.existeDiasJustificado()){
      return;
    }
    
    this._router.navigate(['/auth/justificar/cadastrar'], {
      queryParams: {
        faltas:this.listaFaltastr()
      },
      skipLocationChange: true
    });
  }

  objPesquisa(){
    return {
      celulaSelecionada:this.celulaSelecionada,
      membroSelecionado:this.membroSelecionado
    }
  }

  
  editar(item) {
    // console.log(item);
    let obj = this.objPesquisa();
    localStorage.setItem("pesquisar", JSON.stringify(obj));
    this._router.navigate(['/auth/justificar/cadastrar'], {
      queryParams: {
        id:item.justificativaAusenciaId,
        faltaId:item.id
      },
      skipLocationChange: true
    });
  }

  onCheckboxChange(option, event) {
    
    // console.log(option);
    if (event.checked) {
      this.checkedFaltasList.push(option);
    } else {
      for (var i = 0; i < this.checkedFaltasList.length; i++) {
        if (this.checkedFaltasList[i] == option) {
          this.checkedFaltasList.splice(i, 1);
        }
      }
    }
    // console.log(this.checkedFaltasList);
  }

  listaFaltastr(): string {
    let idStr: string = null;
    let i = 0;
    if (this.checkedFaltasList) {
      this.checkedFaltasList.forEach(item => {
        if (i > 0) {
          idStr += ", " + item.id;
        } else {
          idStr = item.id;
        }
        i++;
      });
    }
    return idStr;
  }

  splitListaFaltastr() {
    let array = null;
    array = [];
    if (this.retornoCheckedFaltasList) {
      if (this.retornoCheckedFaltasList.indexOf(",") != -1) {
        array = this.retornoCheckedFaltasList.split(",");
      } else {
        array.push(this.retornoCheckedFaltasList);
      }
    }
    return array;
  }

  existeDiasJustificado():boolean{
    let dias = [];
    this.checkedFaltasList.forEach(item=>{
      if(item.justificativaAusenciaId){
          dias = item.dataDaReuniao;
      }
    });
    if(dias.length > 0){
      this._notifierService.notify(AlertType.Error, "Já existe uma justificativa para este dias! "+dias);
      return false;
    }
    return true;
  }

  getParams() {
    // console.log(this._avRoute.snapshot.queryParamMap);
    if (this._avRoute.snapshot.queryParamMap.get("pesquisa")) {
      let obj = JSON.parse(localStorage.getItem("pesquisar"));
      localStorage.removeItem("pesquisar");     
      this.celulaSelecionada = obj.celulaSelecionada;
      this.celulaValue = this.celulaSelecionada.nome;
      this.rede = this.celulaSelecionada.rede.nome;
      this.membroSelecionado = obj.membroSelecionado;
      this.membroValue = this.membroSelecionado.nomeCompleto;
      this.getFaltasPessoa(this.membroSelecionado.id); 
      
      
    }
  }



}
