import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertType } from '../../../model/alert-type';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejaService } from '../../../service/igreja.service';
import { RedeService } from '../../../service/rede.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissoesService } from '../../../service/permissoes.service';
import { PessoaService } from '../../../service/pessoa.service';

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
    private _igejaService:IgrejaService,
    private _pessoaService:PessoaService) { }

  ngOnInit() {
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
      // console.log(item.data);
      if (item.type == 'membro-comp') {
        this.membro = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
      }
    });
  }

  adicionar() {
    if (!this.membro) {
      this._notifierService.notify(AlertType.Error, "Erro:campo membro em branco!");
      return false;
    }
    this.membros.push(this.membro);
    this.setEmiter();
  }


  remover(index): void {
    this.membros.splice(index, 1);
  }


  salvar() {
    console.log(this.obj());
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
      console.log(item)
      this.form.controls['nome'].patchValue(item.nome);
      this.form.controls['descricao'].patchValue(item.descricao);
      this.form.controls['redes'].patchValue(item.rede);
      this.getIgreja(item.idIgreja)
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }
  
  getIgreja(id) {
    this._igejaService.getIgreja(id).pipe(take(1)).subscribe(item => {
    this.igrejaSelecionada = item;
    this.emitirIgreja(item);
    this.getPessoas(item.id);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }
  voltar() {
    this._router.navigate(['/auth/rede/pesquisar']);
  }

  
  emitirIgreja(item): void {
    this._emitirEventoService.emitir('edit-igreja', item);
  }

  getPessoas(id) {
    this._pessoaService.pessoaRede(id).pipe(take(1)).subscribe(item => {
    this.membros = item;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.errors.message);
    });
  }


}
