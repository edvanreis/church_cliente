import { Component, OnInit } from '@angular/core';
import { MembroService } from '../../service/membro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.scss']
})
export class CadastroMembroComponent implements OnInit {

  carregarSexo$: Observable<any[]>;
  carregarEstadoCivil$: Observable<any[]>;
  public maskDate = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF  = [ /\d/, /\d/,/\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/,/\d/]
  public maskRG  = [ /\d/, /\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/]

  constructor(private _membroService:MembroService) { }

  ngOnInit() {
    this.getComboSexo();
    this.getComboEstadoCivil();
  }

  getComboSexo(){
    this.carregarSexo$ = this._membroService.carregarSexo();
  }

  getComboEstadoCivil(){
    this.carregarEstadoCivil$ = this._membroService.carregarEstadoCivil();
  }

}
