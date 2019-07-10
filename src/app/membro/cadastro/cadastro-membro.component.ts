import { Component, OnInit, ViewChild } from '@angular/core';
import { MembroService } from '../../service/membro.service';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ExampleDatabase, ExampleDataSource } from '../../tables/fixed-table/helpers.data';

export interface ContatoElement {
  tipo: string;
  contato: string;
  whatsapp:string;
}

export interface EscolaridadeElement {
  escolaridade: string;
  curso: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.scss']
})
export class CadastroMembroComponent implements OnInit {

  public carregarSexo$: Observable<any[]>;
  public carregarEstadoCivil$: Observable<any[]>;
  public carregarTipoContatos$: Observable<any[]>;
  public carregarEscolariade$: Observable<any[]>;
  public maskDate = [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF  = [ /\d/, /\d/,/\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/,/\d/]
  public maskRG  = [ /\d/, /\d/, '.', /\d/, /\d/,/\d/, '.', /\d/, /\d/, /\d/,'.', /\d/]
  public maskTelefone  = [ '(', /\d/, /\d/,')',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,]
  public maskCelular  = [ '(', /\d/, /\d/,')',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
  public maskCep  = [ /\d/, /\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/]

  constructor(private _membroService:MembroService) { }

  public form: FormGroup;
  public contatos=[];
  public contato:ContatoElement;
  public escolaridade:EscolaridadeElement;
  public escolaridades = [];
  public isContato:boolean = true;
  public isCelular:boolean = false;
  public isTelefone:boolean = false;

  ngOnInit() {
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getComboContatos();
    this.getComboEscolaridade();
    this._buildForm();
    
  }

  getComboSexo(){
    this.carregarSexo$ = this._membroService.carregarSexo();
  }

  getComboEstadoCivil(){
    this.carregarEstadoCivil$ = this._membroService.carregarEstadoCivil();
  }

  getComboContatos(){
    this.carregarTipoContatos$ = this._membroService.carregarTiposContatos();
  }

  getComboEscolaridade(){
    this.carregarEscolariade$ = this._membroService.carregarEscolaridade();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'dataNascimento': new FormControl(''),
      'contatos': new FormControl(''),
      'contato': new FormControl(''),
      'contatoTelefone': new FormControl(''),
      'contatoCelular': new FormControl(''),
      'whatsapp': new FormControl(''),
      'escolaridades': new FormControl(''),
      'curso': new FormControl(''),
      'rg': new FormControl(''),
      'cpf': new FormControl(''),
      'sexo': new FormControl(''),
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl(''),
    });

  }
  adicionarContato(){
    this.contato.tipo = this.form.controls['contatos'].value;
    this.contato.contato = this.form.controls['contato'].value;
    this.contato.whatsapp = this.form.controls['whatsapp'].value;
    this.contatos.push(this.contato);                                
  }

  adicionarEscolaridade(){
    this.escolaridade.escolaridade = this.form.controls['escolaridade'].value;
    this.escolaridade.curso = this.form.controls['curso'].value;
    this.contatos.push(this.escolaridade);                                 
  }

  tipo(event){
      console.log(event);
  }

  


}
