import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { CelulaService } from '../../../service/celula.service';
import { take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { DateAdapter } from '@angular/material';
import { HelperChurch } from '../../../helper/helper.church';

@Component({
  selector: 'app-cadastrar-reuniao',
  templateUrl: './cadastrar-reuniao.component.html',
  styleUrls: ['./cadastrar-reuniao.component.scss']
})
export class CadastrarReuniaoComponent implements OnInit {

  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public form: FormGroup;
  public celulaSelecionada: any;
  public membros = [];
  public comboSemana = [];

  constructor(private _emitirEventoService: EmitirEventoService,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _dateAdapter: DateAdapter<Date>) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getEmiter();
    this.getComboSemana();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'horaInicio': new FormControl(''),
      'horaFim': new FormControl(''),
      'dataDaReuniao': new FormControl(''),
      'diaSemana': new FormControl(''),
      'louvor': new FormControl(''),
      'observacao': new FormControl(''),
      'oferta': new FormControl(''),
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'celula-comp') {
        this.celulaSelecionada = item.data;
        this.getCelulaPessoa(this.celulaSelecionada.id);
      }
    });
  }

  getCelulaPessoa(id){
    this._celulaService.getCelulaPessoa(id).pipe(take(1)).subscribe(item => {
      this.membros = item;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);

    });
  }

  getComboSemana() {
    this._celulaService.carregarSemana().subscribe(item => {
      this.comboSemana = item;
      // console.log(item);
    });
  }

  onInputCurrency(event) {
    // console.log(event.target.value)
    this.form.controls['oferta'].patchValue(HelperChurch.currencyValue(event.target.value));
  }


}
