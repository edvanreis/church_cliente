import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-permissoes',
  templateUrl: './add-permissoes.component.html',
  styleUrls: ['./add-permissoes.component.scss']
})
export class AddPermissoesComponent implements OnInit {

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
