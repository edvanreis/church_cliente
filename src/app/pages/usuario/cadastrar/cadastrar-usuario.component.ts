import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../../service/user.service';
import { PerfilService } from '../../../service/perfil.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MembroService } from '../../../service/membro.service';

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
  public comboPerfil = [];
  public comboMembro = [];
  public perfis = [];
  public membro:any;
  public perfilUsuario:any;


  constructor(private _router: Router,
    private _notifierService: NotifierService,
    private _userService: UserService,
    private _avRoute: ActivatedRoute,
    private _perfilService: PerfilService,
    private _membroService: MembroService) { }

  ngOnInit() {
    this._buildForm();
    this.getParams();
    // this.carregarComboPerfis();
    this.carregarComboMembro(); 
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'login': new FormControl('', Validators.required),
      'senha': new FormControl('', Validators.required),
      'perfil': new FormControl(''),
    });
  }

  voltar() {
    this._router.navigate(['/auth/usuario/pesquisar']);
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getUsuario(this.id);
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

  getUsuario(id) {
    this._userService.getUser(id).pipe(take(1)).subscribe(item => {
      this.form.controls['login'].patchValue(item.login);
      // this.perfis = item.perfis;
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

  carregarComboPerfis() {
    this._perfilService.getList().pipe(take(1)).subscribe(item => {
      this.comboPerfil = item;
      console.log(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as permissões!");
    });
  }

  adicionar() {
    let adicionada: boolean = false;
    this.perfis.forEach(element => {
      if (element.id == this.perfilUsuario.id) {
        adicionada = true;
      }
    });
    if (adicionada) {
      this._notifierService.notify(AlertType.Error, "Permissão já adicionada!");
      return false;
    } else {
      this.perfis.push(this.perfilUsuario);
      this.form.controls['perfil'].patchValue('');
    }
  }

  //  remove uma linha da grid
  remover(index): void {
    this.perfis.splice(index, 1);
  }

  onSelectionChangedPerfil($event: MatAutocompleteSelectedEvent,option) {
    this.perfilUsuario = option;
  }

  carregarComboMembro() {
    this._membroService.getList().pipe(take(1)).subscribe(item => {
      this.comboMembro = item;
      console.log(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

}
