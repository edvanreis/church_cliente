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
  public label: string = "Membro";
  public nameIgreja;


  constructor(private _service: RedeService,
    private _notifierService: NotifierService,
    private _igrejaService: IgrejaService,
    private _emitirEventoService: EmitirEventoService,
    private _datePipe: DatePipe) { }

  ngOnInit() {
    this._buildForm();
    this.getComboRedes();
    this.getEmiter();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'dataAbertura': new FormControl(''),
      'descricao': new FormControl(''),
      'redes': new FormControl(''),
      'nomePastor': new FormControl({value:'', disabled: true})
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
      console.log(item.data);
      if (item.type == 'membro-comp') {
        this.membro = item.data;
      }
      if (item.type == 'igreja-comp') {
        this.igrejaSelecionada = item.data;
        console.log(item.data)
        this.form.controls['nomePastor'].patchValue(this.igrejaSelecionada.pastor.nomeCompleto);
      }
    });
  }

  adicionar() {
    if (!this.membro) {
      this._notifierService.notify(AlertType.Error, "Erro:campo membro em branco!");
      return false;
    }
    this.membros.push(this.membro);
    this.setEmiter(false);
  }


  remover(index): void {
    this.membros.splice(index, 1);
  }


  salvar() {
    console.log(this.obj());
    this._service.save(this.obj()).pipe(take(1)).subscribe(item => {
      this.clean();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  obj() {
    return {
      nome: this.form.controls['nome'].value,
      igreja: this.igrejaSelecionada,
      lideres: this.membros,
      dataAbertura: this._datePipe.transform(this.form.controls['dataAbertura'].value, 'dd/MM/yyyy'),
      rede: this.form.controls['redes'].value,
      descricao: this.form.controls['descricao'].value
    }
  }

  setEmiter(save): void {
    if (save) {
      this._emitirEventoService.emitir("save-ok", "");
    } else {
      this._emitirEventoService.emitir("rede", "");
    }

  }

  clean() {
    this.form.controls['nome'].patchValue('');
    this.form.controls['redes'].patchValue('');
    this.form.controls['descricao'].patchValue('');
    this.form.controls['dataAbertura'].patchValue('');
    this.form.controls['nomePastor'].patchValue('');
    this.igrejaSelecionada = [];
    this.nameIgreja = '';
    this.membros = [];
    this.setEmiter(true);

  }



}
