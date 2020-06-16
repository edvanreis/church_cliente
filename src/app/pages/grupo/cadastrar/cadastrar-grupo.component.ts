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


  constructor(private _tipoGrupoService: TipoGrupoService,
    private _pessoaService: PessoaService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _service: GrupoService,
    private _router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
    this._buildForm();
    this._buildFormSub();
    this.carregarTiposGruposTrabalho();
    this.getEmiter();
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
    this._service.getGruposByIgrejas(id).pipe(take(1)).subscribe(item => {
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
    if(!this.tipoPessoa){
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

  salvarGrupo() {
    if (this.id) {

    } else {
      this.save()
    }
  }
  save() {
    console.log(this.setObjGrupo());
    if (!this.validField()) {
      return;
    }
    if (!this.validFieldGrupo()) {
      return;
    }
    this._service.save(this.setObjGrupo()).pipe(take(1)).subscribe(item => {
      // this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, "Erro ao carregar os membros!");
    });

  }

  setObjGrupo() {
    return {
      nome: this.form.controls['nome'].value,
      descricao: this.form.controls['descricao'].value,
      igreja: { id: this.igrejaSelecionada.id ,visaoCelular:this.igrejaSelecionada.visaoCelular},
      pessoas: this.membros,
      tipo: { id: this.form.controls['tipo'].value },
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
    return true;
  }

  validFieldGrupo() {
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
}
