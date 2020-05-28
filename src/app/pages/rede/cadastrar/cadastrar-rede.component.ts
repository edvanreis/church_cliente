import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejaService } from '../../../service/igreja.service';
import { RedeService } from '../../../service/rede.service';
import { DialogConfirmPessoaComponent } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.component';

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
  public membro: any;
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
    private _dialog: MatDialog) { }

  ngOnInit() {
    this._dateAdapter.setLocale("br");
    this._buildForm();
    this.getComboRedes();
    this.getEmiter();
    this.getParams();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'dataAbertura': new FormControl(''),
      'descricao': new FormControl(''),
      'redes': new FormControl(''),
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

      if (item.type == 'membro-comp') {
        // console.log(item.data);
        this.membro = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
      }
      if (item.type == 'confirm-dialog-pessoa-rede') {
        this.membros.splice(item.data, 1);
      }
    });
  }

  adicionar() {
    if (!this.membro) {
      console.log(this.membro);
      this._notifierService.notify(AlertType.Error, "Por favor escolha uma membro.!");
      return false;
    }
    let membroAdicionado = this.membros.find(i => i.nome == this.membro.nome);
    if (membroAdicionado && membroAdicionado.nome == this.membro.nome) {
      this._notifierService.notify(AlertType.Error, "Membro já adiocionado.!");
      return false;
    }
    this.membros.push(this.membro);
    this.setEmiter();
  }


  save() {
    // console.log(this.obj());
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.clean();
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
      pessoas: this.membros,
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
      rede: this.form.controls['redes'].value,
      descricao: this.form.controls['descricao'].value
    }
  }

  setEmiter(): void {
    this._emitirEventoService.emitir("clear", "");
  }

  clean() {
    this.form.controls['nome'].patchValue('');
    this.form.controls['redes'].patchValue('');
    this.form.controls['descricao'].patchValue('');
    this.form.controls['dataAbertura'].patchValue('');
    this.igrejaSelecionada = "";
    this.membros = [];
    this.setEmiter();

  }

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
      this.form.controls['descricao'].patchValue(item.descricao);
      this.getIgreja(item.idIgreja)
      this.carregarPessoas(item.pessoas);
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

  dialogRemover(i,item) {
    const dialogRef = this._dialog.open(DialogConfirmPessoaComponent, {
      width: '600px',
      data: {
        id: Number.parseInt(this.id),
        idPessoa: item.id,
        controller: "rede",
        item:i
      }
    });
  }


}
