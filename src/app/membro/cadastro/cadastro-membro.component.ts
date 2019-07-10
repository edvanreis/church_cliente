import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MembroService } from '../../service/membro.service';

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
      'celula': new FormControl(''),
    });

  }
  adicionarContato(){
    let contato = {} as any;
    contato.tipo = this.form.controls['contatos'].value;
    contato.contato = this.form.controls['contato'].value;
    contato.whatsapp = this.form.controls['whatsapp'].value;
    this.contatos.push(this.contatos);                                
  }

  adicionarEscolaridade(){
    let escolaridade = {} as any;
    escolaridade.escolaridade = this.form.controls['escolaridade'].value;
    escolaridade.curso = this.form.controls['curso'].value;
    this.contatos.push(escolaridade);                                 
  }

  tipo(event){
      console.log(event);
  }

  


}
