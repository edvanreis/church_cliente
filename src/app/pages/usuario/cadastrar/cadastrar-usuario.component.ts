import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../../service/user.service';
import { PerfilService } from '../../../service/perfil.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  public form: FormGroup;
  public id: any;
  public titulo: any;
  public obj = {} as any;
  public comboPrtfil = [];
  public perfis = [];


  constructor(private _router: Router,
    private _notifierService: NotifierService,
    private _userService: UserService,
    private _avRoute: ActivatedRoute,
    private _perfilService: PerfilService) { }

  ngOnInit() {
    this._buildForm();
    this.getParams();
    this.carregarPermissao();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'login': new FormControl('', Validators.required),
      'perfil': new FormControl(''),
    });
  }

  voltar() {
    this._router.navigate(['/auth/usuario/pesquisar']);
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getPerfil(this.id);
    }
    if (this._avRoute.snapshot.queryParamMap.get("janela")) {
      this.titulo = this._avRoute.snapshot.queryParamMap.get("janela");
    }
  }


  edit() {
    if (!this.form.valid) {
      this._notifierService.notify(AlertType.Error, "Preencha todos os campos obrigatórios!");
      return false;
    }
    this.setObj();
    this._perfilService.update(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.voltar();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  save() {
    if (!this.form.valid) {
      this._notifierService.notify(AlertType.Error, "Preencha todos os campos obrigatórios!");
      return false;
    }
    this.setObj();
    this._perfilService.save(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.voltar();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setObj() {
    this.obj.nome = this.form.controls['nome'].value;
    this.obj.login = this.form.controls['login'].value;
    this.obj.perfis = this.perfis;
    if (this.id) {
      this.obj.id = this.id;
    }
  }

  getPerfil(id) {
    this._perfilService.getPerfil(id).pipe(take(1)).subscribe(item => {
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['login'].patchValue(item.descricao);
      this.perfis = item.perfis;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  saveOrEdit() {
    if (this.id) {
      this.edit();
    } else {
      this.save();
    }
  }

  carregarPermissao() {
    this._perfilService.getList().pipe(take(1)).subscribe(item => {
      this.comboPrtfil = item;
      console.log(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as permissões!");
    });
  }

  adicionar() {
    console.log(this.form.controls['permissao'].value);
    this.perfis.push(this.form.controls['permissao'].value);
  }

  //  remove uma linha da grid
  remover(index): void {
    this.perfis.splice(index, 1);
  }

}
