import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-agendamentos',
  templateUrl: './cadastrar-agendamentos.component.html',
  styleUrls: ['./cadastrar-agendamentos.component.scss']
})
export class CadastrarAgendamentosComponent implements OnInit {

  public form: FormGroup;
  public maskHorario = [/\d/, /\d/, ':', /\d/, /\d/];
  public id: any;
  public data: any;

  constructor(private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _datePipe: DatePipe,
    private _avRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._buildForm();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'horaInicio': new FormControl('', Validators.required),
      'horaFim': new FormControl('', Validators.required),
      'descricao': new FormControl('', Validators.required),
    });
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
    }
    if (this._avRoute.snapshot.queryParamMap.get("data")) {
      this.data = this._avRoute.snapshot.queryParamMap.get("data");
    }
  }

  voltar() {
    this._router.navigate(['/auth/agendamentos/pesquisar'], {
      queryParams: {
        pesquisar: 'pesquisar',
      },
      skipLocationChange: true
    });
  }

}
