import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/]

  public form: FormGroup;
  public isEsqueceuSenha: boolean = false;
  public idHash: any;

  constructor(private _router: Router,
    private _userService: UserService,
    private _notifierService: NotifierService,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this._buildForm();
    this.avRoute();
  }

  avRoute() {
    if (this._avRoute.snapshot.queryParamMap.get("esqueceuSenha")) {
      this.isEsqueceuSenha = true;

    }
  }
  private _buildForm(): void {
    this.form = new FormGroup({
      'cpf': new FormControl('', Validators.required),
      'senhaAtual': new FormControl('', Validators.required),
      'senhaNova': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
    });
  }

  voltar() {
    this._router.navigate(['/']);
  }

  obj() {
    return {
      senha: this.form.controls['senhaAtual'].value,
      senhaNew: this.form.controls['senhaNova'].value,
      email: this.form.controls['email'].value,
      cpf: HelperChurch.retirarFormatacaoCPF(this.form.controls['cpf'].value)
    }
  }

  alterar() {
    if (!this.form.controls['cpf'].value && !this.form.controls['senhaAtual'].value  && !this.form.controls['senhaNova'].value) {
      this._notifierService.notify(AlertType.Success, "Digite todos os campos obrigatórios!");
      return false;
    }
    let obj = this.obj();
    console.log(obj);
    this._userService.alterarSenha(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  enviarEmail() {
    if (!this.form.controls['cpf'].value && !this.form.controls['email'].value) {
      this._notifierService.notify(AlertType.Success, "Digite todos os campos obrigatórios!");
      return false;
    }
    this._userService.esqueceuSenha(this.obj()).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

}
