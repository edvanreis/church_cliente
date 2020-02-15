import { Component, OnInit } from '@angular/core';
import { MembroService } from '../../../service/membro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PessoaService } from '../../../service/pessoa.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';




@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss']
})
export class EscolaridadeComponent implements OnInit {
  
  public comboEscolaridade:any = []
  public escolaridades:any = []
  public escolaridadesGrid:any = []
  public form: FormGroup;

  constructor(private _pessoaService: PessoaService,private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this.getComboEscolaridade();
    this._buildForm();
    this.getEmiter();
  }


  private _buildForm(): void {
    this.form = new FormGroup({
      'escolaridade': new FormControl(''),
      'curso': new FormControl(''),
    });
  }

  getComboEscolaridade() {
    this._pessoaService.carregarEscolaridade().subscribe(item => {
      this.comboEscolaridade = item;
      // console.log(item);
    });
  }

  remover(index): void {
    this.escolaridades.splice(index, 1);
    this.escolaridadesGrid.splice(index, 1);
  }

  adicionar() {
    let escolaridade = this.comboEscolaridade.find(i=>i.tipo==this.form.controls['escolaridade'].value);
    this.escolaridades.push({tipo:escolaridade.tipo,curso:this.form.controls['curso'].value});
    this.escolaridadesGrid.push({tipo:escolaridade.descricao,curso:this.form.controls['curso'].value});
    this.setEmiter();
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.form.reset();
        this.escolaridades = [];
      }
      if (item.type == 'edit-escolaridades') {
        this.escolaridades = item.data;
        this.carregarEscolaridadeGrid(this.escolaridades);
        this.setEmiter();
      }
    });
  }
  

  carregarEscolaridadeGrid(contatos){
    contatos.forEach(element => {
      this.escolaridadesGrid.push({
        tipo: element.descricao,
        curso: element.curso,
      });
    });
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("escolaridades",  this.escolaridades);
  }
}
