import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { ParametrosService } from '../../../service/parametros.service';

@Component({
  selector: 'app-cadastrar-parametros',
  templateUrl: './cadastrar-parametros.component.html',
  styleUrls: ['./cadastrar-parametros.component.scss']
})
export class CadastrarParametrosComponent implements OnInit {

  public comboTipoParametro = [];
  public form: FormGroup;
  public id: any;

  constructor(private _service: ParametrosService,
    private _router: Router,
    private _notifierService: NotifierService,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarTipo();
    this._buildForm();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'tipo': new FormControl('', Validators.required),
      'email': new FormControl(''),
      'senha': new FormControl(''),
      'descricao': new FormControl('', Validators.required),
    });
  }
  carregarTipo() {
    this._service.getTipo().subscribe(item => {
      this.comboTipoParametro = item;
      // console.log(item);
    });
  }


  voltar() {
    this._router.navigate(['/auth/parametros/pesquisar']);
  }

  obj() {
    let obj = {} as any;
    obj.tipo = this.form.controls['tipo'].value;
    obj.email = this.form.controls['email'].value;
    obj.senha = this.form.controls['senha'].value;
    obj.descricao = this.form.controls['descricao'].value;
    return obj;
  }

  save() {
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getParametro(this.id);
    }
  }
  getParametro(id) {
    this._service.getParametro(id).pipe(take(1)).subscribe(item => {
      this.form.controls['tipo'].patchValue(item.tipo);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.form.controls['email'].patchValue(item.email);
      this.form.controls['senha'].patchValue(item.senha);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  salvar() {
    if (this.id) {
      this.edit();
    } else {
      this.save();
    }
  }

  edit() {
    if (!this.form.valid) {
      this._notifierService.notify(AlertType.Error, "Preencha todos os campos obrigatórios!");
      return false;
    }

    this._service.update(this.obj()).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


}
