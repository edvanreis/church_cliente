import { Component, OnInit, Compiler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';
import { UserService } from '../../service/user.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../model/alert-type';

@Component({
  selector: 'cdk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  formlogin: FormGroup;

  usuario: string = '';
  senha: string = '';

  returnUrl: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _compiler: Compiler,
    private _auth: AuthService,
    private _tokenService: TokenService,
    private _userData: UserService,
    private _router: Router,
    private _notifierService: NotifierService) { }

  ngOnInit() {
    this._buildForm();
    this._auth.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this._compiler.clearCache();
  }

  login() {

    if (!this.formlogin.valid) {
      // this._helper.showMessageWarn("Todos os campos são obrigatórios");
      return;
    }

    let obj = { username: this.formlogin.value.login, password: this.formlogin.value.password }

    this._auth.login(obj.username, obj.password).subscribe(user => {
      this._storeToken(user);
      this._storeUser();
    }, erro => {
      // console.log(erro);
      this._notifierService.notify(AlertType.Error, "Usuáro e senha Inválidos!");
    })

  }

  private _storeToken(user){
    const token = user.access_token;
    const expires_in = user.expires_in;
    this._tokenService.storeToken(token);
    this._tokenService.storeTokenExpire(expires_in);
  }

  private _storeUser(){
    this._auth.user().subscribe(user=>{
      this._userData.storeuser(user.userAuthentication);
      this.router.navigate([this.returnUrl]);
    })
  }

  private _buildForm() {

    this.formlogin = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  alterarSenha() {
    this._router.navigate(['/senha/alterar-senha']);
  }

  marcarAgendamento() {
    this._router.navigate(['/agendamento/cadastrar']);
  }

  desmarcarAgendamento() {
    this._router.navigate(['/agendamento/pesquisar']);
  }

  esqueceuSenha() {
    this._router.navigate(['/senha/alterar-senha'], {
      queryParams: {
        esqueceuSenha: true,
      },
      skipLocationChange: true
    });
  }

  pedidoOracao() {
    this._router.navigate(['/pedido/cadastrar']);
  }

}
