import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-cadastrar-igreja',
  templateUrl: './cadastrar-igreja.component.html',
  styleUrls: ['./cadastrar-igreja.component.scss']
})
export class CadastrarIgrejaComponent implements OnInit {

  public filteredIgreja: Observable<string[]>;
  public igreja:any;
  public nomeValue:any;
  public dadosIgreja:any;
  public endereco:any;
  public myControlIgreja = new FormControl();
  constructor(private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
   
  }

  onSelectionChangedIgreja($event: MatAutocompleteSelectedEvent,option) {
    this.igreja = option;  
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.type);
      if (item.type == 'dadosPessoais') {
        this.dadosIgreja = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }

    });
  }



}
