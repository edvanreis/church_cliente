import { Component, OnInit } from '@angular/core';
import { MembroService } from '../../../service/membro.service';
import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss']
})
export class EscolaridadeComponent implements OnInit {
  
  public comboEscolaridade = []
  public form: FormGroup;

  constructor(private _membroService: MembroService) { }

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
    this._membroService.carregarEscolaridade().subscribe(item => {
      this.comboEscolaridade = item;
      // console.log(item);
    });
  }
}
