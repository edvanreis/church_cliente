import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-celula',
  templateUrl: './cadastrar-celula.component.html',
  styleUrls: ['./cadastrar-celula.component.scss']
})
export class CadastrarCelulaComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this._buildForm();
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
    });
  }

}
