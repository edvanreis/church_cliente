import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-permissoes',
  templateUrl: './cadastrar-permissoes.component.html',
  styleUrls: ['./cadastrar-permissoes.component.scss']
})
export class CadastrarPermissoesComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('',Validators.required),
      'descricao': new FormControl('',Validators.required),
    });
  }

}
