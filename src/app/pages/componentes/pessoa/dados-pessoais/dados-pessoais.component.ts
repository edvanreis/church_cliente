import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith, take } from 'rxjs/operators';
import { HelperChurch } from '../../../../helper/helper.church';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { PessoaService } from '../../../../service/pessoa.service';
import { Observable } from 'rxjs';
import { CelulaService } from '../../../../service/celula.service';
import { NotifierService } from 'angular-notifier';
import { AlertType } from '../../../../model/alert-type';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { RedeService } from '../../../../service/rede.service';


const ELEMENT_DATA = [
  { codigo: 'A', value: 'Ativo' },
  { codigo: 'I', value: 'Inativo' },
  { codigo: null, value: 'Todos' },
];


@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {

  public maskDate = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  public maskCPF = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public maskRG = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  public form: FormGroup;
  public pessoa;
  public comboSexo = [];
  public comboEstadoCivil = [];
  public dataNascimento;
  public igrejaSelecionada: any;
  public celulaSelecionada: any;
  @Input() membroInput: boolean;
  @Input() pesquisa: boolean;
  public isCelula: boolean = false;
  @Input() hideVisitante: boolean = true;
  public visaoCelular: boolean;
  public comboStatus = ELEMENT_DATA;
  public comboCelulas = [];
  public filteredCelula: Observable<string[]>;
  public myControlCelula = new FormControl();
  public celulaValue: any;
  public comboRede = [];
  public filteredRede: Observable<string[]>;
  public myControlRede = new FormControl();
  public redeSelecionada: any;
  public redeValue: any;

  constructor(private _pessoaService: PessoaService,
    private _emitirEventoService: EmitirEventoService,
    private _celulaService: CelulaService,
    private _notifierService: NotifierService,
    private _redeService: RedeService) { }

  ngOnInit() {
    this._buildForm();
    this.setEmiter();
    this.getComboSexo();
    this.getComboEstadoCivil();
    this.getEmiter();

  }

  getComboSexo() {
    this._pessoaService.carregarSexo().subscribe(item => {
      this.comboSexo = item;
      // console.log(item);
    });
  }

  getComboEstadoCivil() {
    this._pessoaService.carregarEstadoCivil().subscribe(item => {
      this.comboEstadoCivil = item;
      // console.log(item);
    });
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
      'visitanteDaCelula': new FormControl(false)
    });
  }


  setEmiter(): void {
    this.setObj()
    this._emitirEventoService.emitir("dadosPessoais", this.pessoa);
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {
      if (item.type == 'clear') {
        this.clear();

      }
      if (item.type == 'edit-dadosPessoais') {
        this.getObj(item.data);
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.visaoCelular = this.igrejaSelecionada.visaoCelular;
        this.carregarRede(this.igrejaSelecionada.id);
        this.setEmiter();

      }

    });
  }

  clear() {
    this.form.reset();
    this.pessoa = {} as any;
    this.redeSelecionada = null;
    this.redeValue = '';
    this.celulaSelecionada = null;
    this.celulaValue = '';
  }

  setObj() {
    this.pessoa = {} as any;
    this.pessoa.nome = this.form.controls['nome'].value;
    this.pessoa.sobreNome = this.form.controls['sobrenome'].value;
    this.pessoa.rg = HelperChurch.retirarFormatacao(this.form.controls['rg'].value);
    this.pessoa.cpf = HelperChurch.retirarFormatacao(this.form.controls['cpf'].value);
    this.pessoa.sexo = this.form.controls['sexo'].value;
    this.pessoa.estadoCivil = this.form.controls['estadoCivil'].value;
    this.pessoa.dataNascimento = this.form.controls['dataNascimento'].value;
    this.pessoa.nacionalidade = this.form.controls['nacionalidade'].value;
    this.pessoa.profissao = this.form.controls['profissao'].value;
    this.pessoa.observacao = HelperChurch.isNull(this.form.controls['observacao'].value);
    this.pessoa.status = HelperChurch.isNull(this.form.controls['status'].value);
    this.pessoa.batizado = HelperChurch.isBoolean(this.form.controls['batizado'].value);
    this.pessoa.dizimista = HelperChurch.isBoolean(this.form.controls['dizimista'].value);
    this.pessoa.cartaRecomendacao = HelperChurch.isBoolean(this.form.controls['cartaRecomendacao'].value);
    this.pessoa.membroDaCelula = HelperChurch.isBoolean(this.form.controls['membroDaCelula'].value);
    this.pessoa.visitanteDaCelula = HelperChurch.isBoolean(this.form.controls['visitanteDaCelula'].value);

    if (this.igrejaSelecionada) {
      this.pessoa.igreja = { id: this.igrejaSelecionada.id };
    }
    if (this.celulaSelecionada) {
      this.pessoa.celula = { id: this.celulaSelecionada.id };
    }
    if (this.redeSelecionada) {
      this.pessoa.rede = { id: this.redeSelecionada.id };
    }

    //  console.log(this.pessoa)
    return this.pessoa;
  }

  getObj(dados) {
    // console.log(dados)
    this.form.controls['nome'].patchValue(dados.nome);
    this.form.controls['sobrenome'].patchValue(dados.sobreNome);
    this.form.controls['rg'].patchValue(dados.rg);
    this.form.controls['cpf'].patchValue(dados.cpf);
    this.form.controls['sexo'].patchValue(dados.sexoEnum);
    this.form.controls['estadoCivil'].patchValue(dados.estadoCivilEnum);
    this.form.controls['nacionalidade'].patchValue(dados.nacionalidade);
    this.form.controls['profissao'].patchValue(dados.profissao);
    this.form.controls['observacao'].patchValue(dados.observacao);
    this.form.controls['batizado'].patchValue(dados.batizado);
    this.form.controls['dizimista'].patchValue(dados.dizimista);
    this.form.controls['dataNascimento'].patchValue(dados.dataNascimento);
    this.form.controls['cartaRecomendacao'].patchValue(dados.cartaRecomendacao);
    this.form.controls['status'].patchValue(dados.status);
    this.form.controls['membroDaCelula'].patchValue(dados.membroDaCelula);
    this.form.controls['visitanteDaCelula'].patchValue(dados.visitanteDaCelula);
    if (dados.celula) {
      this.celulaValue = dados.celula.nome;
      this.celulaSelecionada = dados.celula;
    }
    if (dados.rede) {
      this.redeValue = dados.rede.nome;
      this.redeSelecionada = dados.rede;
    }

    this.setObj();
    this.setEmiter();
  }


  change() {
    this.setEmiter();
  }

  changeData(event) {
    this.dataNascimento = event.target.value;
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
    this.setEmiter();
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
    if (this.visaoCelular || this.isCelula) {
      this.carregarCelula(this.redeSelecionada.id);
    }
    this.setEmiter();
  }

}
