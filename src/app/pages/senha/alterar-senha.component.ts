import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../model/alert-type';
import { take } from 'rxjs/operators';
import { HelperChurch } from '../../helper/helper.church';

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
      'senhaAtual': new FormControl('', Validators.required),
      'senhaNova': new FormControl('', Validators.required),
    });
  }

  voltar() {
    this._router.navigate(['/']);
  }

  obj() {
    return {
      senha: this.form.controls['senhaAtual'].value,
      senhaNew: this.form.controls['senhaNova'].value,
      cpf: HelperChurch.retirarFormatacaoCPF(this.form.controls['cpf'].value)
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
