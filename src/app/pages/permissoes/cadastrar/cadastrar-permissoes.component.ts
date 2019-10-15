import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { PermissoesService } from '../../../service/permissoes.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-permissoes',
  templateUrl: './cadastrar-permissoes.component.html',
  styleUrls: ['./cadastrar-permissoes.component.scss']
})
export class CadastrarPermissoesComponent implements OnInit {

  public form: FormGroup;
  public id: any;
  public titulo: any;
  public obj = {} as any;

  constructor(private _router: Router,
    private _notifierService: NotifierService,
    private _permissoesService: PermissoesService,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this._buildForm();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'descricao': new FormControl('', Validators.required),
    });
  }

  voltar() {
    this._router.navigate(['/auth/permissoes/pesquisar']);
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getPermissao(this.id);
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
    this._permissoesService.save(this.obj).pipe(take(1)).subscribe(item => {
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
    this._permissoesService.save(this.obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
      this.voltar();
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setObj() {
    this.obj.nome = this.form.controls['nome'].value;
    this.obj.descricao = this.form.controls['descricao'].value;
    if (this.id) {
      this.obj.id = this.id;
    }
  }

  getPermissao(id) {
    this._permissoesService.getPermissao(id).pipe(take(1)).subscribe(item => {
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['descricao'].patchValue(item.descricao);
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


}
