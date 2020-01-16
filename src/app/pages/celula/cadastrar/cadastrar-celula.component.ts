import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { CelulaService } from '../../../service/celula.service';

@Component({
  selector: 'app-cadastrar-celula',
  templateUrl: './cadastrar-celula.component.html',
  styleUrls: ['./cadastrar-celula.component.scss']
})
export class CadastrarCelulaComponent implements OnInit {

  public form: FormGroup;
  public lider: string = "Lider";
  public anfitriao: string = "Anfitriao";
  public igrejaSelecionada: any;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/]
  public comboSemana = [];
  public comboTurno = [];

  constructor(private _service: CelulaService, private _notifierService: NotifierService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.getComboSemana();
    this.getComboTurno();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.data);
      if (item.type == 'membro-comp') {
        //this.membro = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        console.log(item.data)
        this.form.controls['pastor'].patchValue(this.igrejaSelecionada.pastor.nomeCompleto);
      }
    });
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'diaSemana': new FormControl(''),
      'turno': new FormControl(''),
      'dataAbertura': new FormControl(''),
      'observacao': new FormControl(''),
      'tipo': new FormControl(''),
      'perfil': new FormControl(''),
      'horario': new FormControl(''),
      'pastor': new FormControl(''),
    });
  }

  getComboSemana() {
    this._service.carregarSemana().subscribe(item => {
      this.comboSemana = item;
      // console.log(item);
    });
  }

  getComboTurno() {
    this._service.carregarTurno().subscribe(item => {
      this.comboTurno = item;
      // console.log(item);
    });
  }

}
