import { Component, OnInit } from '@angular/core';
import { IgrejaService } from '../../../service/igreja.service';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-pesquisar-igreja',
  templateUrl: './pesquisar-igreja.component.html',
  styleUrls: ['./pesquisar-igreja.component.scss']
})
export class PesquisarIgrejaComponent implements OnInit {

  public igrejas = [];
  filteredIgrejas: Observable<string[]>;
  myControl = new FormControl();

  constructor(private _igrejaService: IgrejaService, private _notifierService: NotifierService, private _router: Router) { }

  ngOnInit() {
    this.lista();
  }


  lista() {
    this._igrejaService.getListSede().pipe(take(1)).subscribe(item => {
      this.igrejas = item;
      console.log(item);
      this.filteredIgrejas = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, error => {
      console.log(error);
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }


  private _filter(value: string): string[] {
    console.log(value)
    const filterValue = value.toLowerCase();
    return this.igrejas.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  cadastrar() {
    this._router.navigate(['/auth/igreja/cadastrar'], {
      queryParams: {
        janela: 'Novo',
      },
      skipLocationChange: true
    });
  }

  editar(id) {
    this._router.navigate(['/auth/igreja/cadastrar'], {
      queryParams: {
        janela: 'Editar',
        id: id
      },
      skipLocationChange: true
    });
  }

}
