import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { PerfilService } from '../../../service/perfil.service';
import { UserService } from '../../../service/user.service';
import { MembroService } from '../../../service/membro.service';

const ELEMENT_DATA = [
  { codigo: 'ATIVO', value: 'Ativo' },
  { codigo: 'INATIVO', value: 'Inativo' },
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
  public filteredMembro: Observable<string[]>;
  public filteredPerfil: Observable<string[]>;
  public myControlMembro = new FormControl();
  public myControlPerfil = new FormControl();

  public comboStatus = ELEMENT_DATA;
  // public cpfValue;
  public membroValue:any;
  public perfilValue:any;



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
    this.carregarComboPessoa();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl({value:'', disabled: true}),
      'login-desable': new FormControl({value:'', disabled: true}),
      'login': new FormControl('', Validators.required),
      'status': new FormControl(''),
      'pefil': new FormControl(''),
      'cpf': new FormControl({value:'', disabled: true}),
      'cpfdesable': new FormControl({value:'', disabled: true})
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

    if (this._avRoute.snapshot.queryParamMap.get("status")) {
      this.status = this._avRoute.snapshot.queryParamMap.get("status");
    }
  }


  edit() {
    this.setObj();
    this._userService.update(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
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
    // console.log(this.obj)
    this._userService.save(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.voltar();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setObj() {
    this.obj.membro = {id:this.membro.id}
    this.obj.login = this.form.controls['login'].value;
    this.obj.perfis = this.perfis;
    this.obj.status = this.form.controls['status'].value;
    if (this.id) {
      this.obj.id = this.id;
    }
  }

  getUsuario(id) {
    this._userService.getUser(id).pipe(take(1)).subscribe(item => {
      this.form.controls['login-desable'].patchValue(item.login);
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['cpf'].patchValue(item.cpf);
      this.form.controls['status'].patchValue(item.status);
      this.form.controls['login'].patchValue(item.login);
      this.perfis = item.perfis;
      if(item.idMembro){
          this.membro = {id:item.idMembro};
      }
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
      // this.comboPerfil = item;
      // this.comboPerfil.forEach(element => {
      //   if(element.nome=='basico' && this.perfis.length == 0){
      //         this.perfis.push(element);
      //         this.perfilUsuario = element;
      //   }
      // });
      // console.log(item)
      this.comboPerfil = item;
      this.filteredPerfil = this.myControlPerfil.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterPerfil(value, this.comboPerfil))
      );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os perfis!");
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

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent,option) {
    this.membro = option;
    this.form.controls['cpf'].patchValue(option.cpf);
  }


  carregarComboPessoa() {
    this._membroService.getListMembros().pipe(take(1)).subscribe(item => {
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembro(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembro(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  private _filterPerfil(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

}
