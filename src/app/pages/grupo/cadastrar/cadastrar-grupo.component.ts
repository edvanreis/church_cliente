import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoGrupoService } from '../../../service/tipo-grupo.service';
import { Observable } from 'rxjs';
import { PessoaService } from '../../../service/pessoa.service';
import { take, startWith, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { GrupoService } from '../../../service/grupo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubGrupoService } from '../../../service/sub-groupo.service';

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


  constructor(private _tipoGrupoService: TipoGrupoService,
    private _pessoaService: PessoaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _serviceGruop: GrupoService,
    private _serviceSubGruop: SubGrupoService,
    private _router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this._buildForm();
    this._buildFormSub();
    this.carregarTiposGruposTrabalho();
    this.getEmiter();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required),
      'descricao': new FormControl(''),
    });
  }

  private _buildFormSub(): void {
    this.formSub = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'descricao': new FormControl(''),
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
        this.carregarGrupos(this.igrejaSelecionada.id);
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
    if (!this.label || this.label == 'Grupo de Trabalho') {
      if (this.id) {

      } else {
        this.saveGrupo();
      }
    }
    if (this.label == 'Sub Grupo de Trabalho') {
      if (this.id) {

      } else {
        this.saveSubGrupo();
      }
    }
  }
  saveGrupo() {
    console.log(this.setObjGrupo());
    if (!this.validFieldGrupo()) {
      return;
    }
    this._serviceGruop.save(this.setObjGrupo()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });

  }

  saveSubGrupo() {
    console.log(this.setObjSubGrupo());
    if (!this.validFieldSubGrupo()) {
      return;
    }
    this._serviceSubGruop.save(this.setObjSubGrupo()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });

  }



  setObjGrupo() {
    return {
      nome: this.form.controls['nome'].value,
      descricao: this.form.controls['descricao'].value,
      igreja: { id: this.igrejaSelecionada.id, visaoCelular: this.igrejaSelecionada.visaoCelular },
      pessoas: this.membros,
      tipo: { id: this.form.controls['tipo'].value },
    }
  }

  setObjSubGrupo() {
    return {
      nome: this.formSub.controls['nome'].value,
      descricao: this.formSub.controls['descricao'].value,
      pessoas: this.membros,
      grupo: { id: this.grupoSelecionado.id },
      igreja: { id: this.igrejaSelecionada.id, visaoCelular: this.igrejaSelecionada.visaoCelular },
    }
  }

  validFieldGrupo(): boolean {
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
    if (!this.form.controls['tipo'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor escolha um Tipo de grupo de Trabalho!");
      return false;
    }
    return true;
  }

  validFieldSubGrupo(): boolean {
    if (!this.formSub.controls['nome'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor preencha o campo Nome");
      return false;
    }
    if (this.membros.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por favor adicione pelo menos um Membro");
      return false;
    }
    if (!this.formSub.controls['descricao'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor preencha o campo Descrição");
      return false;
    }
    if (!this.igrejaSelecionada) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione uma igreja!");
      return false;
    }
    if (!this.grupoSelecionado) {
      this._notifierService.notify(AlertType.Error, "Por favor selecione um grupo de trabalho!");
      return false;
    }
    return true;
  }


  voltar() {
    this._router.navigate(['/auth/grupo/pesquisar'], {
      queryParams: {
        pesquisa: this.pesquisa
      },
      skipLocationChange: true
    });
  }

  onSelectionChangedGrupos($event: MatAutocompleteSelectedEvent, option) {
    this.grupoSelecionado = option;
  }

  onTabChanged(event) {
    // console.log(event.tab.textLabel);
    this.label = event.tab.textLabel;
    if (event) {
      this.membros = [];
      this.membroValue = "";
      this.tipoPessoa = null;
    }
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.tipo = this._avRoute.snapshot.queryParamMap.get("tipo");
      if (this.tipo && this.tipo == 'grupoTrabalho') {
        this.getGrupo(this.id);
      } else {
        this.getSubGrupo(this.id);
      }
    }
  }

  getGrupo(id) {
    this._serviceGruop.getGrupo(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['descricao'].patchValue(item.descricao);
      if (item.tipo) {
        this.form.controls['tipo'].patchValue(item.tipo.id);
      }
      if (item.pessoas) {
        this.membros = item.pessoas;
      }

      if (item.igreja) {
        this.igrejaSelecionada = item.igreja;
        this.setEmiterIgreja();
      }
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getSubGrupo(id) {
    this._serviceSubGruop.getSubGrupo(id).pipe(take(1)).subscribe(item => {
      console.log(item);
      this.formSub.controls['nome'].patchValue(item.nome);
      this.formSub.controls['descricao'].patchValue(item.descricao);
      if (item.pessoas) {
        this.membros = item.pessoas;
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
}
