import { Component, OnInit, Input } from '@angular/core';
import { MembroService } from '../../../service/membro.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';

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

  constructor(private _membroService: MembroService, private _notifierService: NotifierService) { }

  ngOnInit() {
    this.carregarComboMembro();
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


}
