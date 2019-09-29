import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { MembroService } from '../../../../service/membro.service';
import { Membro } from '../../../../model/membro';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../../model/alert-type';


@Component({
  selector: 'app-pesquisar-membro',
  templateUrl: './pesquisar-membro.component.html',
  styleUrls: ['./pesquisar-membro.component.scss']
})
export class PesquisarMembroComponent implements OnInit {


  constructor(private _emitirEventoService: EmitirEventoService, private _membroService: MembroService,private _notifierService: NotifierService) { }

  public membro: any;
  public dadosPessoais: any;
  public endereco: any;
  public comboTipoContatos = [];
  public comboEscolaridade = []

  ngOnInit() {
    // this.setEmiter();
    this.getEmiter();
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'dadosPessoais') {
        this.dadosPessoais = item.data;
      } else if (item.type == 'endereco') {
        this.endereco = item.data;
        console.log(item.data)
      }

    });
  }

  pesquisar() {
    this.preencherObjeto();
    this._membroService.pesquisar(this.membro).subscribe(item => {
      console.log(item.value);
    }, error => {
      // console.log(error);
      this._notifierService.notify(AlertType.Error, error.message);

    });
  }

  preencherObjeto(): Membro {

    this.membro = new Membro(); 
    if (this.dadosPessoais) {
      this.membro.nome = this.dadosPessoais.nome;
      this.membro.sobreNome = this.dadosPessoais.sobreNome;
      this.membro.rg = this.dadosPessoais.rg;
      this.membro.cpf = this.dadosPessoais.cpf;
      this.membro.sexo = this.dadosPessoais.sexo;
      this.membro.estadoCivil = this.dadosPessoais.estadoCivil;
      this.membro.dataNascimento = this.dadosPessoais.dataNascimento;
      this.membro.idCelula = this.dadosPessoais.idCelula;
      this.membro.nacionalidade = this.dadosPessoais.nacionalidade;
      this.membro.profissao = this.dadosPessoais.profissao;
      this.membro.batizado = this.dadosPessoais.batizado;
      this.membro.dizimista = this.dadosPessoais.dizimista;
    }
    if (this.endereco) {
      this.membro.endereco.cep = this.endereco.cep;
      this.membro.endereco.numero = this.endereco.numero;
      this.membro.endereco.complemento = this.endereco.complemento;
      this.membro.endereco.bairro = this.endereco.bairro;
      this.membro.endereco.logradouro = this.endereco.logradouro;
      this.membro.endereco.uf = this.endereco.uf;
      this.membro.endereco.localidade = this.endereco.cidade;
    }



    console.log(this.membro);
    return this.membro;
  }

}
