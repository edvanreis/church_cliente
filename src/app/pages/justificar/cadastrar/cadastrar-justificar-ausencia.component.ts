import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JustificativaService } from '../../../service/justificativa.service';
import { NotifierService } from 'angular-notifier';
import { take, startWith, map } from 'rxjs/operators';
import { JustificativaAusenciaService } from '../../../service/justificativa-ausencia.service';
import { AlertType } from '../../../model/alert-type';
import { HelperChurch } from '../../../helper/helper.church';

@Component({
  selector: 'app-cadastrar-justificar-ausencia',
  templateUrl: './cadastrar-justificar-ausencia.component.html',
  styleUrls: ['./cadastrar-justificar-ausencia.component.scss']
})
export class CadastrarJustificarAusenciaComponent implements OnInit {

  public justificativas= [];
  public form: FormGroup;
  public faltas = [];
  public faltasStr:string;
  public pesquisa:boolean = false;
  public id;
  public faltaId;
  public justificativaAusencia = {} as any;
  public jutificativaSelecionada:any;

  constructor(private _router: Router,
    private _avRoute: ActivatedRoute,
    private _notifierService: NotifierService,
    private _service:JustificativaAusenciaService,
    private _serviceJustificativa:JustificativaService) { }

  ngOnInit() {
   this._buildForm();
   this.carregarJustificativas();
   this.getParams();

  }

  carregarJustificativas() {
    this._serviceJustificativa.getList().subscribe(item => {
      this.justificativas = item;
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'justificativas': new FormControl('',Validators.required),
      'observacao': new FormControl(''),
    });
  }
  voltar() {
    // console.log(id)
    this._router.navigate(['/auth/justificar/pesquisar'], {
      queryParams: {
        pesquisa: "pesquisa"
      },
      skipLocationChange: true
    });
  }

  getParams() {
    if (this._avRoute.snapshot.queryParamMap.get("id")) {
       this.id = this._avRoute.snapshot.queryParamMap.get("id");
       this.getJustificativaAusencia();
    }
    if (this._avRoute.snapshot.queryParamMap.get("faltaId")) {
      this.faltaId = this._avRoute.snapshot.queryParamMap.get("faltaId");
    }
    if (this._avRoute.snapshot.queryParamMap.get("faltas")) {
      this.faltasStr = this._avRoute.snapshot.queryParamMap.get("faltas");
      this.splitListaFaltastr();
      this.pesquisa = true;
    }
  }

  splitListaFaltastr() {
    if (this.faltasStr) {
      if (this.faltasStr.indexOf(",") != -1) {
        this.faltas = this.faltasStr.split(",");
      } else {
        this.faltas.push(this.faltasStr);
      }
    }
  }

  salvar(){
    if(this.id){
      this.updade()
    }else{
      this.save();
    }
  }

 
  save() {
    this.setObj();
    if(!this.validFields()){
      return;
    }
    // console.log(this.justificativaAusencia)
    this._service.save(this.justificativaAusencia).pipe(take(1)).subscribe(item => {
      this.voltar();
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }


  updade() {
    this.setObj();
    if(!this.validFields()){
      return;
    }
    this._service.update(this.justificativaAusencia).pipe(take(1)).subscribe(item => {
      this._notifierService.notify(AlertType.Success, item.value);
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }

  setObj(){
    // console.log(this.justificativaAusencia)
    this.justificativaAusencia.observacao = HelperChurch.isNull(this.form.controls['observacao'].value);
    if(this.form.controls['justificativas'].value){
      let justificativa = this.form.controls['justificativas'].value;
      this.justificativaAusencia.justificativa = {id:justificativa.id};
    }
    if(this.id){
      this.justificativaAusencia.id = this.id;
    }
  }

  validFields():boolean{
    if(!this.justificativaAusencia.justificativa){
      this._notifierService.notify(AlertType.Error, "Por favor selecione uma justificativa!");
      return false;
    }

    if(this.jutificativaSelecionada == 'Outros' && !this.justificativaAusencia.observacao){
      this._notifierService.notify(AlertType.Error, "Este tipo de jutificatova exige uma observação");
      return false;
    }
    return true;
  }

  onSelectionClick(option){
    // console.log(option);
    this.jutificativaSelecionada = option;
  }

  getJustificativaAusencia(){
    this._service.getJustificativaAusencia(this.id).pipe(take(1)).subscribe(item => {
    // console.log(item);
     this.form.controls['observacao'].patchValue(item.observacao);
     this.form.controls['justificativas'].patchValue(this.justificativas.find(i=>i.id == item.justificativa.id));
    }, error => {
      this._notifierService.notify(AlertType.Error, error.message);
    });
  }
  
}
