import { Component, OnInit } from '@angular/core';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

@Component({
  selector: 'app-cadastrar-visitante',
  templateUrl: './cadastrar-visitante.component.html',
  styleUrls: ['./cadastrar-visitante.component.scss']
})
export class CadastrarVisitanteComponent implements OnInit {

  public dadosPessoais: any;
  public endereco: any;
  public escolaridade: any;


  constructor( private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.getEmiter();
  }

  

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      console.log(item.type);
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      }
      if (item.type == 'endereco') {
        this.endereco = item.data;
      }
      if (item.type == 'escolaridades') {
        this.escolaridade = item.data;
      }

    });
  }

  salvar(){
    console.log(this.obj())
  
  }

  obj(){


  }

}
