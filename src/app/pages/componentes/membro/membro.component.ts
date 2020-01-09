import { Component, OnInit, Input } from '@angular/core';
import { MembroService } from '../../../service/membro.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-membro',
  templateUrl: './membro.component.html',
  styleUrls: ['./membro.component.scss']
})
export class MembroComponent implements OnInit {

  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public nomeValue:string;
  @Input('label') label; 
  public membro:any;

  constructor(private _membroService: MembroService, private _notifierService: NotifierService,private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.carregarComboMembro();
    this.getEmiter();
  }

  carregarComboMembro() {
    this._membroService.getList().pipe(take(1)).subscribe(item => {
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filter(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("membro-comp", this.membro);
  }

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    console.log(option)
    this.membro = option;
    this.setEmiter();
  }

  
  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.type);
      if (item.type == 'rede') {
        this.membro = item.data;
        this.nomeValue = item.data;
      }

    });
  }




}
