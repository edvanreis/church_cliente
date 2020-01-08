import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MembroService } from '../../../../service/membro.service';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';


@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss']
})
export class EscolaridadeComponent implements OnInit {
  
  public form: FormGroup;
  public comboEscolaridade = []

  constructor(private _membroService: MembroService, private _emitirEventoService: EmitirEventoService) { }

  ngOnInit() {
    this._buildForm();
    this.getComboEscolaridade();
  }

  
  private _buildForm(): void {
    this.form = new FormGroup({
      'escolaridade': new FormControl(''),
      'curso': new FormControl(''),
    });
  }

  getComboEscolaridade() {
    this._membroService.carregarEscolaridade().subscribe(item => {
      this.comboEscolaridade = item;
      // console.log(item);
    });
  }
}
