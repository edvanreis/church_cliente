import { Component, OnInit } from '@angular/core';
import { MembroService } from '../../../service/membro.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PessoaService } from '../../../service/pessoa.service';




@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss']
})
export class EscolaridadeComponent implements OnInit {
  
  public comboEscolaridade = []
  public form: FormGroup;

  constructor(private _pessoaService: PessoaService) { }

  ngOnInit() {
    this.getComboEscolaridade();
    this._buildForm();
  }


  private _buildForm(): void {
    this.form = new FormGroup({
      'escolaridade': new FormControl(''),
      'curso': new FormControl(''),
    });
  }

  getComboEscolaridade() {
    this._pessoaService.carregarEscolaridade().subscribe(item => {
      this.comboEscolaridade = item;
      // console.log(item);
    });
  }
}
