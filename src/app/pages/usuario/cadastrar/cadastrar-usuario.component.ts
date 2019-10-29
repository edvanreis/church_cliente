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

const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
  { codigo: null, value: 'Todas' },
];

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit {

  public form: FormGroup;
  public id: any;
  public titulo: any;
  public nome: string;
  public login: string;
  public cpf: string;
  public obj = {} as any;
  public comboPerfil = [];
  public comboMembro = [];
  public perfis = [];
  public membro:any;
  public perfilUsuario:any;
  public status:any;


  constructor(private _router: Router,
    private _notifierService: NotifierService,
    private _userService: UserService,
    private _avRoute: ActivatedRoute,
    private _perfilService: PerfilService,
    private _membroService: MembroService) { }

  ngOnInit() {
    this._buildForm();
    this.getParams();
    this.carregarComboPerfis();
    this.carregarComboMembro(); 
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'login': new FormControl('', Validators.required),
      'senha': new FormControl(''),
      'status': new FormControl(''),
      'cpf': new FormControl('', Validators.required),
      'perfil': new FormControl(''),
    });
  }

  voltar() {
    this._router.navigate(['/auth/usuario/pesquisar'],{
      queryParams: {
        login: this.login,
        nome: this.nome,
        cpf: this.cpf,
        status:this.status
      },
      skipLocationChange: true
    });
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getUsuario(this.id);
    }
    if (this._avRoute.snapshot.queryParamMap.get("janela")) {
      this.titulo = this._avRoute.snapshot.queryParamMap.get("janela");
    }
    if (this._avRoute.snapshot.queryParamMap.get("login")) {
      this.login = this._avRoute.snapshot.queryParamMap.get("login");
    }
    if (this._avRoute.snapshot.queryParamMap.get("nome")) {
      this.nome = this._avRoute.snapshot.queryParamMap.get("nome");
    }
    if (this._avRoute.snapshot.queryParamMap.get("cpf")) {
      this.cpf = this._avRoute.snapshot.queryParamMap.get("cpf");
    }
    if (this._avRoute.snapshot.queryParamMap.get("status")) {
      this.status = this._avRoute.snapshot.queryParamMap.get("status");
    }
  }


  edit() {
    // if (!this.form.valid) {
    //   this._notifierService.notify(AlertType.Error, "Preencha todos os campos obrigatórios!");
    //   return false;
    // }
    this.setObj();
    console.log(this.obj)
    this._userService.update(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      // this.voltar();
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
    console.log(this.obj)
    this._userService.save(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.voltar();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setObj() {
    this.obj.membro = this.membro
    this.obj.login = this.form.controls['login'].value;
    this.obj.senha = this.form.controls['senha'].value;
    this.obj.perfis = this.perfis;
    this.obj.status = this.form.controls['status'].value;
    if (this.id) {
      this.obj.id = this.id;
    }
  }

  getUsuario(id) {
    this._userService.getUser(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.form.controls['login'].patchValue(item.login);
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['cpf'].patchValue(item.cpf);
      this.form.controls['status'].patchValue(item.status);
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

  carregarComboPerfis() {
    this._perfilService.getList().pipe(take(1)).subscribe(item => {
      this.comboPerfil = item;
      // console.log(item);
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

  onSelectionChangedMembroNome($event: MatAutocompleteSelectedEvent,option) {
    this.membro = option;
    this.form.controls['cpf'].patchValue(option.cpf);
  }

  onSelectionChangedMembroCpf($event: MatAutocompleteSelectedEvent,option) {
    this.membro = option;
    this.form.controls['nome'].patchValue(option.nome);
  }

  carregarComboMembro() {
    this._membroService.getList().pipe(take(1)).subscribe(item => {
      this.comboMembro = item;
      // console.log(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

}
