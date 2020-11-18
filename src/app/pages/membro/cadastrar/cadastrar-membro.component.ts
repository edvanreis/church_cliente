import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { HelperChurch } from './../../../helper/helper.church';
import { CelulaService } from './../../../service/celula.service';
import { MembroService } from './../../../service/membro.service';
import { RedeService } from './../../../service/rede.service';
import { VisitanteService } from './../../../service/visitante.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastrar-membro.component.html',
  styleUrls: ['./cadastrar-membro.component.scss']
})
export class CadastrarMembroComponent implements OnInit {

  public form: FormGroup;
  public membro = {} as any;
  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/,/\d/]
  public id: any;
  public comboSexo = [];
  public comboEstadoCivil = [];


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



  public enderecos: any;
  public escolaridades: any = [];
  public contatos: any = [];
  public etapas: any = [];
  public cargos: any = [];
  public celula: any;
  public igrejaSelecionada: any;


  public pesquisa: boolean = false;
  public importacao: boolean = false;
  public isCelula = true;

  public visitanteId: any;


  constructor(private _emitirEventoService: EmitirEventoService,
    private _service: MembroService,
    private _notifierService: NotifierService,
    private _router: Router,
    private _avRoute: ActivatedRoute,
    private _redeService: RedeService,
    private _celulaService: CelulaService,
    private _visitanteService: VisitanteService) { }

  ngOnInit() {
    this.getParams();
    this.getEmiter();
    this._buildForm();
    this.getComboSexo();
    this.getComboEstadoCivil();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('', Validators.required),
      'sobrenome': new FormControl('', Validators.required),
      'dataNascimento': new FormControl('', Validators.required),
      'rg': new FormControl('', Validators.required),
      'cpf': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'estadoCivil': new FormControl('', Validators.required),
      'nacionalidade': new FormControl('', Validators.required),
      'profissao': new FormControl(''),
      'batizado': new FormControl(false),
      'dizimista': new FormControl(false),
      'observacao': new FormControl(''),
      'cartaRecomendacao': new FormControl(false),
      'status': new FormControl(''),
      'membroDaCelula': new FormControl(false),
    });
  }

  getComboSexo() {
    this._service.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._service.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getMembro(this.id);
      this.pesquisa = true;
    }

    if (this._avRoute.snapshot.queryParamMap.get("visitanteId")) {
      this.visitanteId = this._avRoute.snapshot.queryParamMap.get("visitanteId");
      this.getVisitante(this.visitanteId);
      this.pesquisa = true;
    }
    if (this._avRoute.snapshot.queryParamMap.get("importacao")) {
      this.importacao = true;;
    }
  }

  getMembro(id) {
    this._service.obterMembro(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['sobrenome'].patchValue(item.sobreNome);
      this.form.controls['rg'].patchValue(item.rg);
      this.form.controls['cpf'].patchValue(item.cpf);
      this.form.controls['sexo'].patchValue(item.sexoEnum);
      this.form.controls['estadoCivil'].patchValue(item.estadoCivilEnum);
      this.form.controls['nacionalidade'].patchValue(item.nacionalidade);
      this.form.controls['profissao'].patchValue(item.profissao);
      this.form.controls['observacao'].patchValue(item.observacao);
      this.form.controls['batizado'].patchValue(item.batizado);
      this.form.controls['dizimista'].patchValue(item.dizimista);
      this.form.controls['dataNascimento'].patchValue(item.dataNascimento);
      this.form.controls['cartaRecomendacao'].patchValue(item.cartaRecomendacao);
      this.form.controls['membroDaCelula'].patchValue(item.membroDaCelula);

      if (item.celula) {
        this.celulaValue = item.celula.nome;
        this.celulaSelecionada = item.celula;
      }
      if (item.rede) {
        this.redeValue = item.rede.nome;
        this.redeSelecionada = item.rede;
      }
      if (item.escolaridades) {
        this.emitirEscolaridades(item.escolaridades);
      }
      if (item.etapas) {
        this.emitirEtapaVisao(item.etapas);
      }
      if (item.cargos) {
        this.emitirCargo(item.cargos);
      }
      if (item.igreja) {
        this.emitirIgreja(item.igreja);
      }
      if (item.enderecos) {
        this.emitirEnderecos(item.enderecos);
      }

      if (item.contatos) {
        this.emitirContatos(item.contatos);
      }
      // this.emitirCelula(item.celula);
    }, error => {
      // console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  getVisitante(id) {
    this._visitanteService.migrar(id).pipe(take(1)).subscribe(item => {
      // console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['sobrenome'].patchValue(item.sobreNome);
      this.form.controls['sexo'].patchValue(item.sexoEnum);
      this.form.controls['estadoCivil'].patchValue(item.estadoCivilEnum);
      this.form.controls['nacionalidade'].patchValue(item.nacionalidade);
      this.form.controls['dataNascimento'].patchValue(item.dataNascimento);

      if (item.celula) {
        this.celulaValue = item.celula.nome;
        this.celulaSelecionada = item.celula;
      }
      if (item.rede) {
        this.redeValue = item.rede.nome;
        this.redeSelecionada = item.rede;
      }

      if (item.igreja) {
        this.emitirIgreja(item.igreja);
      }
      if (item.contatos) {
        this.emitirContatos(item.contatos);
      }
      // this.emitirCelula(item.celula);
    }, error => {
      // console.log(error)
      // this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }




  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      // console.log(item.type);
      if (item.type == 'endereco') {
        this.enderecos = item.data;
      }
      if (item.type == 'escolaridades') {
        this.escolaridades = item.data;
      }
      if (item.type == 'contatos') {
        this.contatos = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.visaoCelular = this.igrejaSelecionada.visaoCelular;
        this.carregarRede(this.igrejaSelecionada.id);
      }
      if (item.type == 'mult-select-etapas-visao') {
        this.etapas = item.data;
      }
      if (item.type == 'cargos-comp') {
        this.cargos = item.data;
      }
    });
  }

  salvar() {
    this.setObj();
    // let mensagem = this.validFields();
    // if (mensagem) {
    //   this._notifierService.notify(AlertType.Error, mensagem);
    //   return false;
    // }
    if (this.membro.id) {
      this.updade();
    } else if (this.visitanteId) {
      this.importar();
    } else {
      this.save();
    }
  }

  save() {
    this._service.save(this.membro).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.errors);
    });
  }

  updade() {
    this._service.update(this.membro).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.error.errors);
    });
  }

  importar() {
    this._visitanteService.importar(this.membro).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      console.log(error)
      // this._notifierService.notify(AlertType.Error, error.error.errors);
    });
  }

  setObj() {
    if (this.id) {
      this.membro.id = Number.parseInt(this.id);
    }

    this.membro.nome = this.form.controls['nome'].value;
    this.membro.sobreNome = this.form.controls['sobrenome'].value;
    this.membro.sexo = this.form.controls['sexo'].value;
    this.membro.estadoCivil = this.form.controls['estadoCivil'].value;
    this.membro.dataNascimento = this.form.controls['dataNascimento'].value;
    this.membro.nacionalidade = this.form.controls['nacionalidade'].value;
    this.membro.profissao = this.form.controls['profissao'].value;
    this.membro.rg = HelperChurch.retirarFormatacao(this.form.controls['rg'].value);
    this.membro.cpf = HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    this.membro.batizado = HelperChurch.isBoolean(this.form.controls['batizado'].value);
    this.membro.dizimista = HelperChurch.isBoolean(this.form.controls['dizimista'].value);
    this.membro.cartaRecomendacao = HelperChurch.isBoolean(this.form.controls['cartaRecomendacao'].value);
    this.membro.membroDaCelula = HelperChurch.isBoolean(this.form.controls['membroDaCelula'].value);

    if (this.igrejaSelecionada) {
      this.membro.igreja = { id: this.igrejaSelecionada.id };
    }
    if (this.redeSelecionada) {
      this.membro.rede = { id: this.redeSelecionada.id };
    }
    if (this.celulaSelecionada) {
      this.membro.celula = { id: this.celulaSelecionada.id };
    }
    if (this.enderecos) {
      this.membro.enderecos = this.enderecos;
    }
    if (this.contatos) {
      this.membro.contatos = this.contatos;
    }
    if (this.escolaridades) {
      this.membro.escolaridades = this.escolaridades;
    }

    if (this.etapas) {
      this.membro.etapas = this.etapas;
    }

    if (this.cargos) {
      this.membro.cargos = this.cargos;
    }

    if (this.visitanteId) {
      this.membro.visitanteId = Number.parseInt(this.visitanteId);
    }

    console.log(this.membro)

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

  emitirEtapaVisao(item): void {
    this._emitirEventoService.emitir('edit-mult-select-etapas', item);
  }

  emitirCargo(item): void {
    this._emitirEventoService.emitir('edit-cargos', item);
  }

  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
    this.igrejaSelecionada = item;
    if (this.igrejaSelecionada) {
      this.carregarRede(this.igrejaSelecionada.id);
    }
  }

  // emitirCelula(item): void {
  //   this.isCelula = true;
  //   this._emitirEventoService.emitir('edit-celula', item);
  // }


  voltar() {
    let caminho: string = "";
    if (this.importacao) {
      caminho = "/auth/visitante/pesquisar";
    } else {
      caminho = "/auth/membro/pesquisar";
    }
    if (this.pesquisa || this.importacao) {
      this._router.navigate([caminho], {
        queryParams: {
          pesquisa: this.pesquisa
        },
        skipLocationChange: true
      });
    } else {
      this._router.navigate([caminho]);
    }


  }

  validFields(): string {
    let concat = 'Por favor preencha o campo';
    let concatArray = 'Por favor adicione pelo menos um';

    if (!this.membro.nome) {
      return concat + ' nome!';
    }
    if (!this.membro.sobreNome) {
      return concat + ' Sobre Nome!';
    }
    if (!this.membro.rg) {
      return concat + ' RG!';
    }
    if (!this.membro.cpf) {
      return concat + ' CPF!';
    }
    if (!this.membro.dataNascimento) {
      return concat + ' Data Nascimento!';
    }
    if (!this.membro.sexo) {
      return concat + ' Sexo!';
    }
    if (!this.membro.estadoCivil) {
      return concat + ' Estado Civil!';
    }
    if (!this.membro.nacionalidade) {
      return concat + ' Nacionalidade!';
    }
    if (this.enderecos.length == 0) {
      return concatArray + ' Endereço!';
    }
    if (this.enderecos.length == 0) {
      return concatArray + ' Contato!';
    }
    if (this.escolaridades.length == 0) {
      return concatArray + 'a  Esconlaridade!';
    }
    if (!this.membro.igreja) {
      return concat + ' Igreja!';
    }

    if (!this.membro.batizado) {
      return concat + 'O campo batizado é Obrigatório!';
    }

    return null;
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
      this._notifierService.notify(AlertType.Error, "Erro ao carregar as redes!");
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
