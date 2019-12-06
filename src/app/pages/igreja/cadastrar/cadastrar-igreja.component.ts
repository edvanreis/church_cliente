import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { IgrejaService } from '../../../service/igreja.service';
import { take, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-igreja',
  templateUrl: './cadastrar-igreja.component.html',
  styleUrls: ['./cadastrar-igreja.component.scss']
})
export class CadastrarIgrejaComponent implements OnInit {

  public filteredIgreja: Observable<string[]>;
  public igrejaSelecionada:any;
  public igreja:any;
  public nomeValue:any;
  public dadosIgreja:any;
  public endereco:any;
  public myControlIgreja = new FormControl();
  public comboIgrejaSede=[];
  public filteredIgrejaSede: Observable<string[]>;
  public myControlIgrejaSede = new FormControl();
  public nomePastorValue;
  constructor(private _emitirEventoService: EmitirEventoService,private _igrejaService:IgrejaService, private _notifierService: NotifierService) { }

  ngOnInit() {
   this.getEmiter();
   this.carregarComboIgrejaSede();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.data);
      if (item.type == 'dadosIgreja') {
        this.dadosIgreja = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }
    });  
  }

  getDadosIgreja(filial){
    this.igreja = {} as any;
    this.igreja.nome = this.dadosIgreja.nome;
    this.igreja.cnpj = this.dadosIgreja.cnpj;
    this.igreja.telefone = this.dadosIgreja.telefone;
    this.igreja.pastor = this.dadosIgreja.membro;
    this.igreja.endereco = this.endereco;
    if(filial){
      this.igreja.sede = null;
    }
  }

  salvarSede(){
    this.getDadosIgreja(false);
    console.log(this.igreja);
    this._igrejaService.saveSede(this.igreja).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  carregarComboIgrejaSede() {
    console.log('entrou');
    this._igrejaService.getListSede().pipe(take(1)).subscribe(item => {
      this.comboIgrejaSede = item;
      this.filteredIgrejaSede = this.myControlIgrejaSede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboIgrejaSede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionChangedIgreja($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
    this.nomePastorValue = option.membro.nome;
  }


}
