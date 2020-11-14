import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejaService } from '../../../service/igreja.service';
import { RedeService } from '../../../service/rede.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';
import { take, startWith, map } from 'rxjs/operators';
import { MembroService } from '../../../service/membro.service';

@Component({
  selector: 'app-cadastrar-rede',
  templateUrl: './cadastrar-rede.component.html',
  styleUrls: ['./cadastrar-rede.component.scss']
})
export class CadastrarRedeComponent implements OnInit {

  public form: FormGroup;
  public comboRede = [];
  public comboIgrejas = []
  public myControlMembro = new FormControl();
  public comboMembro = [];
  public filteredMembro: Observable<string[]>;
  //public nomeValue;
  public membroSelecionado: any;
  public membros: any = [];
  public igrejaSelecionada: any;
  public rede = {} as any;
  public label: string = "Lideres";
  public nameIgreja;
  public id;


  constructor(private _service: RedeService,
    private _notifierService: NotifierService,
    private _emitirEventoService: EmitirEventoService,
    private _datePipe: DatePipe,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _igejaService: IgrejaService,
    private _dateAdapter: DateAdapter<Date>,
    private _dialog: MatDialog,
    private _membroService: MembroService) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getComboRedes();
    this.getEmiter();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl('',Validators.required),
      'dataAbertura': new FormControl('',Validators.required),
      'descricao': new FormControl('',Validators.required),
      'redes': new FormControl('',Validators.required),
    });
  }

  getComboRedes() {
    this._service.tiposDeRedes().subscribe(item => {
      this.comboRede = item;
      // console.log(item);
    });
  }

  getEmiter(): void {
    this._emitirEventoService.mensagem.subscribe(item => {

      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        this.carregarMembro(this.igrejaSelecionada.id);
      }
      if (item.type == 'confirm-dialog-pessoa-rede') {
        this.membros.splice(item.data, 1);
      }
    });
  }

  adicionar() {
    if (!this.membroSelecionado) {
      console.log(this.membroSelecionado);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i => i.nome == this.membroSelecionado.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membroSelecionado.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membros.push(this.membroSelecionado);
  }


  save() {
    // console.log(this.obj());
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  obj() {
    return {
      nome: this.form.controls['nome'].value,
      igreja: this.igrejaSelecionada,
      membros: this.membros,
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
      rede: this.form.controls['redes'].value,
      descricao: this.form.controls['descricao'].value
    }
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("clear", "");
  }

  // clean() {
  //   this.form.controls['nome'].patchValue('');
  //   this.form.controls['redes'].patchValue('');
  //   this.form.controls['descricao'].patchValue('');
  //   this.form.controls['dataAbertura'].patchValue('');
  //   this.igrejaSelecionada = "";
  //   this.membros = [];
  //   this.setEmiter();

  // }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.getRede(this.id);
    }
  }

  getRede(id) {
    this._service.getRede(id).pipe(take(1)).subscribe(item => {
      //  console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.form.controls['redes'].patchValue(item.rede);
      this.form.controls['dataAbertura'].patchValue(new Date(item.dataAbertutaToDate));
      this.getIgreja(item.idIgreja)
      this.carregarPessoas(item.membros);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }

  carregarPessoas(item) {
    if (item) {
      for (let i = 0; i < item.length; i++) {
        let pessoa = {} as any;
        pessoa.id = item[i].id;
        pessoa.nomeCompleto = item[i].nomeCompleto;
        pessoa.celula = item[i].celula;
        pessoa.igreja = item[i].igreja;
        pessoa.cpf = item[i].cpf;
        this.membros.push(pessoa);
      }
    }
  }

  getIgreja(id) {
    this._igejaService.getIgreja(id).pipe(take(1)).subscribe(item => {
      this.igrejaSelecionada = item;
      this.emitirIgreja(item);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }
  voltar() {
    this._router.navigate(['/auth/rede/pesquisar'], {
      queryParams: {
        pesquisar: 'pesquisar',
      },
      skipLocationChange: true
    });
  }


  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
  }

  salvar() {
    if (!this.validFields()) {
      return;
    }
    if (this.id) {
      this.update();
    } else {
      this.save();
    }
  }

  update() {
    let obj = {} as any;
    obj = this.obj();
    obj.id = Number.parseInt(this.id);
    console.log(obj)
    this._service.update(obj).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  dialogRemover(i, item) {
    const dialogRef = this._dialog.open(DialogConfirmPessoaComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        controller: "rede",
        item: i
      }
    });
  }


  carregarMembro(id) {
    this._membroService.getMembroIgreja(id).pipe(take(1)).subscribe(item => {
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

  onSelectionChangedMembro($event: MatAutocompleteSelectedEvent, option) {
    this.membroSelecionado = option;
  }

  validFields(): boolean {
    if (!this.form.controls['nome'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor Informe o nome da Rede!");
      return false;
    }
    if (!this.form.controls['dataAbertura'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor Informe a Data de Abertura!");
      return false;
    }
    if (!this.form.controls['descricao'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor Informe uma descrição!");
      return false;
    }
    if (!this.form.controls['redes'].value) {
      this._notifierService.notify(AlertType.Error, "Por favor Informe uma tipo de rede!");
      return false;
    }
    if (!this.igrejaSelecionada) {
      this._notifierService.notify(AlertType.Error, "Por favor Informe uma Igreja!");
      return false;
    }
    if (this.membros.length == 0) {
      this._notifierService.notify(AlertType.Error, "Por adicione os lideres!");
      return false;
    }
    return true;
  }

}
