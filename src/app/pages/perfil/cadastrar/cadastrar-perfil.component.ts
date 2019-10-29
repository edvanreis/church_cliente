import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { PerfilService } from '../../../service/perfil.service';
import { AlertType } from '../../../model/alert-type';
import { take } from 'rxjs/operators';
import { PermissoesService } from '../../../service/permissoes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  styleUrls: ['./cadastrar-perfil.component.scss']
})
export class CadastrarPerfilComponent implements OnInit {

  public form: FormGroup;
  public id: any;
  public titulo: any;
  public obj = {} as any;
  public comboPermissao = [];
  public permissoes = [];
  public permissao: any;

  constructor(private _router: Router,
    private _notifierService: NotifierService,
    private _perfilService: PerfilService,
    private _avRoute: ActivatedRoute,
    private _permissoesService: PermissoesService) { }

  ngOnInit() {
    this._buildForm();
    this.getParams();
    this.carregarPermissao();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'descricao': new FormControl('', Validators.required),
      'permissao': new FormControl(''),
    });
  }

  voltar() {
    this._router.navigate(['/auth/perfil/pesquisar']);
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
    if(this.nameValid(this.form.controls['nome'].value)){
      this._notifierService.notify(AlertType.Error, "O nome não deve possuir espaços!");
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
    this.obj.descricao = this.form.controls['descricao'].value;
    this.obj.permissoes = this.permissoes;
    if (this.id) {
      this.obj.id = this.id;
    }
  }

  getPerfil(id) {
    this._perfilService.getPerfil(id).pipe(take(1)).subscribe(item => {
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.permissoes = item.permissoes;
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
    this._permissoesService.getList().pipe(take(1)).subscribe(item => {
      this.comboPermissao = item;
      console.log(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as permissões!");
    });
  }

  adicionar() {
    let adicionada: boolean = false;
    this.permissoes.forEach(element => {
      if (element.id == this.permissao.id) {
        adicionada = true;
      }
    });
    if (adicionada) {
      this._notifierService.notify(AlertType.Error, "Permissão já adicionada!");
      return false;
    } else {
      this.permissoes.push(this.permissao);
      this.form.controls['permissao'].patchValue('');
    }
  }

  //  remove uma linha da grid
  remover(index): void {
    this.permissoes.splice(index, 1);
  }

  onSelectionChanged($event: MatAutocompleteSelectedEvent, option) {
    this.permissao = option;
  }

  nameValid(name): boolean {
    if (name.indexOf(' ') != -1) {
      return true;
    } else {
      return false;
    }
  }

}
