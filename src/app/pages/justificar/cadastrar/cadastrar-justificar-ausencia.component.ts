import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JustificativaService } from '../../../service/justificativa.service';

@Component({
  selector: 'app-cadastrar-justificar-ausencia',
  templateUrl: './cadastrar-justificar-ausencia.component.html',
  styleUrls: ['./cadastrar-justificar-ausencia.component.scss']
})
export class CadastrarJustificarAusenciaComponent implements OnInit {

  public justificativas$: Observable<any[]>;
  public form: FormGroup;

  constructor(private _service: JustificativaService,
    private _router: Router) { }

  ngOnInit() {
   this._buildForm();
   this.carregarJustificativas();
  }

  carregarJustificativas() {
    this.justificativas$ = this._service.getList();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'justificativas': new FormControl('',Validators.required),
      'observacao': new FormControl(''),
    });
  }
  voltar() {
    // console.log(id)
    this._router.navigate(['/auth/justificar/pesquisar'], {
      queryParams: {

      },
      skipLocationChange: true
    });
  }

}
