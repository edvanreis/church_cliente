import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss']
})
export class SenhaComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'cpf': new FormControl('', Validators.required),
      'senhaAual': new FormControl('', Validators.required),
      'senhaNova': new FormControl('',Validators.required),
    });
  }

}
