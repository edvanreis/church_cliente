import { Component, OnInit, ViewChild } from '@angular/core';
import { MembroService } from '../../service/membro.service';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ExampleDatabase, ExampleDataSource } from '../../tables/fixed-table/helpers.data';

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

  constructor(private _membroService:MembroService) { }

  public form: FormGroup;
  public contatos=[];
  public escolaridades = [];

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
      'contatos': new FormControl(''),
      'descContato': new FormControl(''),
    });

  }
  adicionarContato(){
    this.contatos.push({tipo:this.form.controls['contatos'].value,descricao:this.form.controls['descContato'].value});                                
  }

  adicionarEscolaridade(){
    this.escolaridades.push({tipo:this.form.controls['escolaridade'].value,descricao:this.form.controls['descEscolaridade'].value});                                
  }

  


}
