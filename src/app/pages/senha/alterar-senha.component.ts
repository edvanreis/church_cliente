import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  public form: FormGroup;

  constructor(private _router: Router, private _userService: UserService, private _notifierService: NotifierService) { }

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'cpf': new FormControl('', Validators.required),
      'senhaAual': new FormControl('', Validators.required),
      'senhaNova': new FormControl('', Validators.required),
    });
  }

  voltar() {
    this._router.navigate(['/']);
  }

  obj() {
    return {
      senha: this.form.controls['senha'].value,
      senhaNew: this.form.controls['senhaNew'].value,
      cpf: this.form.controls['cpf'].value
    }
  }

  alterar(){
    if(!this.form.valid){
      this._notifierService.notify(AlertType.Success, "Digite todos os campos obrigatórios!");
    }
    this._userService.alterarSenha(this.obj()).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

}
