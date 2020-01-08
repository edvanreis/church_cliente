import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RedeService } from '../../../service/rede.service';
import { MembroService } from '../../../service/membro.service';
import { Observable } from 'rxjs';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { IgrejaService } from '../../../service/igreja.service';

@Component({
  selector: 'app-cadastrar-rede',
  templateUrl: './cadastrar-rede.component.html',
  styleUrls: ['./cadastrar-rede.component.scss']
})
export class CadastrarRedeComponent implements OnInit {

  public form: FormGroup;
  public comboRede = [];
  public comboIgrejas = []
  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  public nomeValue;
  public membro: any;
  public membros:any=[];
  public filteredIgreja: Observable<string[]>;
  public igrejaSelecionada: any;
  public nomePastorValue:string;
  public myControlIgreja = new FormControl();
  public rede = {} as any;


  constructor(private _service:RedeService,
              private _membroService: MembroService,
              private _notifierService: NotifierService,
              private _igrejaService: IgrejaService) { }

  ngOnInit() {
    this._buildForm();
    this.getComboRedes();
    this.carregarComboIgreja();
    this.carregarComboMembro();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'dataAbertura': new FormControl(''),
      'observacao': new FormControl(''),
      'redes': new FormControl(''),
    });
  }

  getComboRedes() {
    this._service.tiposDeRedes().subscribe(item => {
      this.comboRede = item;
      // console.log(item);
    });
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


  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    console.log(option)
    this.membro = option;
  }

  adicionar() {
    if(!this.membro){
      this._notifierService.notify(AlertType.Error, "Erro:campo membro em branco!");
      return false;
    }
    this.membros.push(this.membro);
  }


  remover(index): void {
    this.membros.splice(index, 1);
  }

  onSelectionChangedIgreja($event: MatAutocompleteSelectedEvent, option) {
    this.igrejaSelecionada = option;
    if (option.pastor) {
      this.nomePastorValue = option.pastor.nomeCompleto;
    } else {
      this.nomePastorValue = null;
    }
  }

  carregarComboIgreja() {

    this._igrejaService.getListSede().pipe(take(1)).subscribe(item => {
      this.comboIgrejas = item;
      console.log(item);
      this.filteredIgreja = this.myControlIgreja.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterIgreja(value, this.comboIgrejas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }

  private _filterIgreja(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  salvar(){

  }


}
