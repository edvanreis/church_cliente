import { VisitanteService } from './../../../service/visitante.service';
import { MembroService } from './../../../service/membro.service';
import { RedeService } from './../../../service/rede.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { AlertType } from '../../../model/alert-type';
import { CelulaService } from '../../../service/celula.service';
import { ContatoService } from '../../../service/contato.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { EnderecoService } from '../../../service/endereco.service';
import { EscolaridadeService } from '../../../service/escolaridade.service';
import { MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { DialogConfirmCriarVisitanteComponent } from '../../dialog/dialog-confirm-criar-visitante/dialog-confirm-criar-visitante.component';
import { map, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-cadastrar-visitante',
  templateUrl: './cadastrar-visitante.component.html',
  styleUrls: ['./cadastrar-visitante.component.scss']
})
export class CadastrarVisitanteComponent implements OnInit {

  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]


  public enderecos: any;
  public escolaridades: any = [];
  public contatos: any = [];
  public celula: any;
  public igreja: any;
  public visitante = {} as any;
  public id: any;
  public pesquisa: boolean = false;

  public form: FormGroup;
  public comboSexo = [];
  public comboEstadoCivil = [];
  public igrejaSelecionada: any;



  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public comboRede = [];
  public redeSelecionada: any;
  public redeValue: any;

  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public comboCelulas = [];
  public celulaSelecionada: any;
  public visaoCelular: boolean;
  public celulaValue: any;



  constructor(private _emitirEventoService: EmitirEventoService,
    private _serviceMembro: MembroService,
    private _service: VisitanteService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _redeService: RedeService,
    private _celulaService: CelulaService) { }

  ngOnInit() {
    this.getParams();
    this.getEmiter();
    this._buildForm();
    this.getComboSexo();
    this.getComboEstadoCivil();
  }

  getComboSexo() {
    this._serviceMembro.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._serviceMembro.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'sobrenome': new FormControl(''),
      'dataNascimento': new FormControl(''),
      'sexo': new FormControl(''),
      'estadoCivil': new FormControl(''),
      'nacionalidade': new FormControl(''),
      'dataCultoIgreja': new FormControl(''),
      'dataCultoRede': new FormControl(''),
      'dataReuniaoCelula': new FormControl(''),
    });
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getVisitante(this.id);
      this.pesquisa = true;
    }
  }

  getVisitante(id) {
    this._service.obterVisitante(id).pipe(take(1)).subscribe(item => {

      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['sobrenome'].patchValue(item.sobreNome);
      this.form.controls['sexo'].patchValue(item.sexoEnum);
      this.form.controls['estadoCivil'].patchValue(item.estadoCivilEnum);
      this.form.controls['nacionalidade'].patchValue(item.nacionalidade);
      this.form.controls['dataNascimento'].patchValue(item.dataNascimento);
      this.form.controls['dataCultoIgreja'].patchValue(item.dataCultoIgreja);
      this.form.controls['dataCultoRede'].patchValue(item.dataCultoRede);
      this.form.controls['dataReuniaoCelula'].patchValue(item.dataReuniaoCelula);

      if(item.contatos){
        this.emitirContatos(item.contatos);
      }

      if(item.igreja){
        this.emitirIgreja(item.igreja);
      }

      if(item.rede){
        this.redeSelecionada = item.rede;
        this.redeValue = this.redeSelecionada.nome;
      }

      if(item.celula){
        this.celulaSelecionada = item.rede;
        this.celulaValue = this.celulaSelecionada.nome;
      }

    }, error => {
      // console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }


  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }
      if (item.type == 'escolaridades') {
        this.escolaridades = item.data;
      }
      if (item.type == 'contatos') {
        this.contatos = item.data;
      }
      if (item.type == 'confirm-dialog-criar-visitante') {
        this.emitiClear();
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.visaoCelular = this.igrejaSelecionada.visaoCelular;
        this.carregarRede(this.igrejaSelecionada.id);
      }

    });
  }

  salvar() {
    this.setObj();
    let mensagem = this.validFields();
    if (mensagem) {
      this._notifierService.notify(AlertType.Error, mensagem);
      return false;
    }
    if (!this.visitante.id) {
      this.dialogAvisoVisitanteJaCadastrado(this.visitante);
    } else {
      this.updade();
    }
  }


  updade() {
    console.log(this.visitante)
    this._service.update(this.visitante).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.errors);

    });
  }

  setObj() {
    if (this.id) {
      this.visitante.id = this.id;
    }

    this.visitante.nome = this.form.controls['nome'].value;
    this.visitante.sobreNome = this.form.controls['sobrenome'].value;
    this.visitante.sexo = this.form.controls['sexo'].value;
    this.visitante.estadoCivil = this.form.controls['estadoCivil'].value;
    this.visitante.dataNascimento = this.form.controls['dataNascimento'].value;
    this.visitante.nacionalidade = this.form.controls['nacionalidade'].value;
    this.visitante.dataCultoIgreja = this.form.controls['dataCultoIgreja'].value;
    this.visitante.dataCultoRede = this.form.controls['dataCultoRede'].value;
    this.visitante.dataReuniaoCelula = this.form.controls['dataReuniaoCelula'].value;

    if(this.igrejaSelecionada){
      this.visitante.igreja = {id:this.igrejaSelecionada.id};
    }
    if(this.redeSelecionada){
      this.visitante.rede = {id:this.redeSelecionada.id};
    }
    if(this.celulaSelecionada){
      this.visitante.celula = {id:this.celulaSelecionada.id};
      this.visitante.visitanteDaCelula = true;
    }

    if (this.contatos) {
      this.visitante.contatos = this.contatos;
    }
    console.log(this.visitante)

  }

  emitiClear(): void {
    this._emitirEventoService.emitir('clear', '');
  }

  emitirPessoa(item): void {
    this._emitirEventoService.emitir('edit-dadosPessoais', item);
  }

  emitirEnderecos(item): void {
    this._emitirEventoService.emitir('edit-endereco', item);
  }

  emitirContatos(item): void {
    this._emitirEventoService.emitir('edit-contatos', item);
  }

  emitirEscolaridades(item): void {
    this._emitirEventoService.emitir('edit-escolaridades', item);
  }

  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
    this.igrejaSelecionada = item;
    if(this.igrejaSelecionada){
      this.carregarRede(this.igrejaSelecionada.id);
    }
  }



  voltar() {
    this._router.navigate(['/auth/visitante/pesquisar'], {
      queryParams: {
        pesquisa: this.pesquisa,
        editar:this._avRoute.snapshot.queryParamMap.get("editar")
      },
      skipLocationChange: true
    });
  }

  validFields(): string {
    let concat = 'Por favor preencha o campo';
    if (!this.visitante.nome) {
      return concat + ' Nome!';
    }
    if (!this.visitante.sobreNome) {
      return concat + ' Sobre Nome!';
    }
    if (!this.visitante.igreja) {
      return concat + ' Igreja!';
    }

    return null;
  }

  dialogAvisoVisitanteJaCadastrado(pessoa) {
    let obj = {} as any;
    obj.nome = pessoa.nome;
    obj.sobreNome = pessoa.sobreNome;

    const dialogRef = this._dialog.open(DialogConfirmCriarVisitanteComponent, {
      width: '600px',
      data: {
        pessoaCadastrada: this._service.avisoVisitanteJaCadastrado(obj),
        visitante:this.visitante
      }
    });
  }

  carregarRede(id) {

    this._redeService.getRedeIgreja(id).pipe(take(1)).subscribe(item => {
      this.comboRede = item;
      // console.log(item);
      this.filteredRede = this.myControlRede.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterRede(value, this.comboRede))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar igrejas sede!");
    });
  }


  private _filterRede(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionRedeChange($event: MatAutocompleteSelectedEvent, option) {
    this.redeSelecionada = option;
    if (this.visaoCelular) {
      this.carregarCelula(this.redeSelecionada.id);
    }
  }

  carregarCelula(id) {

    this._celulaService.getCelulaRede(id).pipe(take(1)).subscribe(item => {
      this.comboCelulas = item;
      // console.log(item);
      this.filteredCelula = this.myControlCelula.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCelula(value, this.comboCelulas))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as células!");
    });
  }

  private _filterCelula(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  onSelectionCelulaChange($event: MatAutocompleteSelectedEvent, option) {
    this.celulaSelecionada = option;
  }


}
