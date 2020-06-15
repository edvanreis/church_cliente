import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoGrupoService } from '../../../service/tipo-grupo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastrar-grupo',
  templateUrl: './cadastrar-grupo.component.html',
  styleUrls: ['./cadastrar-grupo.component.scss']
})
export class CadastrarGrupoComponent implements OnInit {
  public form: FormGroup;
  public tipoGrupo$: Observable<any[]>;
  constructor(  private _tipoGrupoService:TipoGrupoService) { }

  ngOnInit() {
    this._buildForm();
    this.carregarTiposGruposTrabalho();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'tipo': new FormControl('',Validators.required), 
      'descricao': new FormControl(''), 
    });
  }
  

  carregarTiposGruposTrabalho(){
    this.tipoGrupo$ = this._tipoGrupoService.getList();
  }
}
