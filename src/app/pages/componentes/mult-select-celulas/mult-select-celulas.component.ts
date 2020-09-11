import { Component, OnInit, Input } from '@angular/core';
import { CelulaService } from '../../../service/celula.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-mult-select-celulas',
  templateUrl: './mult-select-celulas.component.html',
  styleUrls: ['./mult-select-celulas.component.scss']
})
export class MultSelectCelulasComponent implements OnInit {
  checkedList = [];
  checked: boolean = false;
  celulas: any[];
  filteredCelulas: Observable<string[]>;
  myControl = new FormControl();
  selection: any;
  checkedListRetorno = [];


  constructor(private service: CelulaService, private _emitirEventoService: EmitirEventoService) { }

  @Input() isChecked = false;
  public redeId:any;

  ngOnInit() {
   this.getEmiter();
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'mult-clear') {
        this.checkedList = [];
        this.celulas = [];
        this.filteredCelulas = new  Observable<string[]>();
       }
       if (item.type == 'rede-selected') {
        this.redeId = item.data;
        this.carregarCelulas();
       }
    });
  }

  carregarCelulas() {
    this.service.getCelulaRede(this.redeId).subscribe(element => {
      this.celulas = element;
      this.filteredCelulas = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
  }

  marcarDesmarcar() {
    if (this.checked)
      this.limparTodos();
    else
      this.marcarTodos();
  }

  limparTodos() {
    this.checked = false;
    this.checkedList = [];
  };

  marcarTodos() {
    this.checked = true;
    this.checkedList = [];
    for (var i = 0; i < this.celulas.length; i++) {
      this.checkedList.push(this.celulas[i]);
    }
    this.emiter(this.checkedList);
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.celulas.filter(option => option.nome.toLowerCase().includes(filterValue));
  }


  onCheckboxChange(option, event) {
    // console.log(this.checkedList);
    if (event.target.checked) {
      this.checkedList.push(option);
    } else {
      for (var i = 0; i < this.celulas.length; i++) {
        if (this.checkedList[i] == option) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    this.emiter(this.checkedList);
  }

  emiter(checkedList) {
    this._emitirEventoService.emitir("mult-select-celulas", checkedList);
  }

}
