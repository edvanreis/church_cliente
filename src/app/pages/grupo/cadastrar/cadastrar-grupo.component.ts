import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoGrupoService } from '../../../service/tipo-grupo.service';
import { Observable } from 'rxjs';
import { PessoaService } from '../../../service/pessoa.service';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatAutocompleteSelectedEvent, DateAdapter } from '@angular/material';
import { GrupoService } from '../../../service/grupo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

const ELEMENT_DATA_TIPO_PESSOA: any = [
  { id: 'L', nome: 'Líder' },
  { id: 'C', nome: 'Co-Líder' },
  { id: 'M', nome: 'Membro' }
];

@Component({
  selector: 'app-cadastrar-grupo',
  templateUrl: './cadastrar-grupo.component.html',
  styleUrls: ['./cadastrar-grupo.component.scss']
})
export class CadastrarGrupoComponent implements OnInit {
  public form: FormGroup;
  public formSub: FormGroup;
  public tipoGrupo$: Observable<any[]>;
  public comboMembro = [];
  public comboGrupos = [];
  public filteredMembro: Observable<string[]>;
  public filteredGrupos: Observable<string[]>;
  public myControlMembro = new FormControl();
  public myControlGrupos = new FormControl();
  public igrejaSelecionada: any;
  public membros = [];
  public membroSelecionado: any;
  public grupoSelecionado: any;
  public comboTipoPessoa = ELEMENT_DATA_TIPO_PESSOA;
  public tipoPessoa: any;
  public id: any;
  public pesquisa: boolean = false;
  public membroValue: any;
  public label: any;
  public tipo: any;
  public subGrupo: boolean = false;
  public grupoValue:any;


  constructor(private _tipoGrupoService: TipoGrupoService,
    private _pessoaService: PessoaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _serviceGruop: GrupoService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _dateAdapter: DateAdapter<Date>) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.carregarTiposGruposTrabalho();
    this.getEmiter();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required),
      'descricao': new FormControl(''),
      'radio': new FormControl('1'),
      'dataAbertura': new FormControl('', Validators.required),
    });
  }


  carregarTiposGruposTrabalho() {
    this.tipoGrupo$ = this._tipoGrupoService.getList();
  }

  carregarMembro(id) {
    this._pessoaService.getMembroIgreja(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboMembro = item;
      this.filteredMembro = this.myControlMembro.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterMembros(value, this.comboMembro))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterMembros(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  carregarGrupos(id) {
    this._serviceGruop.getGruposByIgrejas(id).pipe(take(1)).subscribe(item => {
      // console.log(item);
      this.comboGrupos = item;
      this.filteredGrupos = this.myControlGrupos.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGrupos(value, this.comboGrupos))
        );
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });
  }

  private _filterGrupos(value: string, lista): string[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  getEmiter() {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.carregarMembro(this.igrejaSelecionada.id);
        this.carregarGrupos({igreja:{id:this.igrejaSelecionada.id}});
      }
    });
  }

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    this.membroSelecionado = option;
  }

  adicionarMembro() {
    if (!this.membroSelecionado) {
      console.log(this.membroSelecionado);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    if (!this.tipoPessoa) {
      this._notifierService.notify(AlertType.Error, "Por favor escola um tipo de pessoa.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i => i.nome == this.membroSelecionado.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membroSelecionado.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membroSelecionado.tipo = this.tipoPessoa.id;
    this.membroSelecionado.tipoNome = this.tipoPessoa.nome;
    this.membros.push(this.membroSelecionado);
  }

  salvar() {
    if (this.id) {

    } else {
      this.save();
    }
  }
  save() {
    console.log(this.setObj());
    if (!this.validField()) {
      return;
    }
    this._serviceGruop.save(this.setObj()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });

  }


  setObj() {
    return {
      nome: this.form.controls['nome'].value,
      descricao: this.form.controls['descricao'].value,
      igreja: { id: this.igrejaSelecionada.id, visaoCelular: this.igrejaSelecionada.visaoCelular },
      pessoas: this.membros,
      tipo: this.getTipoSelecionado(),
      grupo: this.getGrupoSelecionado(),
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy')
    }
  }

  getTipoSelecionado() {
    if (!this.form.controls['tipo'].value) {
      return null;
    } else {
      return { id: this.form.controls['tipo'].value };
    }
  }

  getGrupoSelecionado() {
    if (!this.grupoSelecionado) {
      return null;
    } else {
      return { id: this.grupoSelecionado.id }
    }
  }

  validField(): boolean {
    if (!this.form.controls['nome'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor preencha o campo Nome");
      return false;
    }
    if (this.membros.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor adicione pelo menos um Membro");
      return false;
    }
    if (!this.form.controls['descricao'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor preencha o campo Descrição");
      return false;
    }
    if (!this.igrejaSelecionada) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione uma igreja!");
      return false;
    }
    if (!this.form.controls['tipo'].value && !this.subGrupo) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha um Tipo de grupo de Trabalho!");
      return false;
    }

    if (!this.form.controls['dataAbertura'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor digita a Data de Abertura!");
      return false;
    }

    if (!this.grupoSelecionado && this.subGrupo) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione um grupo de trabalho!");
      return false;
    }
    return true;
  }


  voltar() {
    this._router.navigate(['/auth/grupo/pesquisar'], {
      queryParams: {
        pesquisar: this.pesquisa
      },
      skipLocationChange: true
    });
  }

  onSelectionChangedGrupos($event: MatAutocompleteSelectedEvent, option) {
    this.grupoSelecionado = option;
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.pesquisa = true;
      this.getGrupo(this.id);
    }
  }

  getGrupo(id) {
    this._serviceGruop.getGrupo(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.form.controls['dataAbertura'].patchValue(new Date(item.dataAberturaToDate));
      if (item.tipo) {
        this.form.controls['tipo'].patchValue(item.tipo.id);
      }
      if (item.pessoas) {
        this.membros = item.pessoas;
      }
      if(item.isSubGrupo){
        this.form.controls['radio'].patchValue('2');
        this.subGrupo = true;
        this.grupoSelecionado = item.grupo;
        this.grupoValue = item.grupo.nome
      }else{
        this.form.controls['radio'].patchValue('1');
        this.subGrupo = false;
      }

      if (item.igreja) {
        this.igrejaSelecionada = item.igreja;
        this.setEmiterIgreja();
      }
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  setEmiterIgreja(): void {
    this._emitirEventoService.emitir("edit-igreja", this.igrejaSelecionada);
  }

  changeRadio() {
    // console.log(this.form.controls['radio'].value);
    if (this.form.controls['radio'].value == '2') {
      this.subGrupo = true;
    } else {
      this.subGrupo = false;
    }
  }
}
