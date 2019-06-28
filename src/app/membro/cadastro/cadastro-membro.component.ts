import { Component, OnInit } from '@angular/core';
import { MembroService } from '../../service/membro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.scss']
})
export class CadastroMembroComponent implements OnInit {

  public carregarSexo = [];
  // carregarSexo$: Observable<any[]>;
  public maskDate = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF  = [ /\d/, /\d/,/\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/,/\d/]
  public maskRG  = [ /\d/, /\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/]

  constructor(private _membroService:MembroService) { }

  ngOnInit() {
    this.getComboSexo();
  }

  getComboSexo(){
     this._membroService.carregarSexo().subscribe(item=>{
        console.log(item);
     });
  }

}
