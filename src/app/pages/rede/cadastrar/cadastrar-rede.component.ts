import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RedeService } from '../../../service/rede.service';

@Component({
  selector: 'app-cadastrar-rede',
  templateUrl: './cadastrar-rede.component.html',
  styleUrls: ['./cadastrar-rede.component.scss']
})
export class CadastrarRedeComponent implements OnInit {

  public form: FormGroup;
  public comboRede = []

  constructor(private _service:RedeService) { }

  ngOnInit() {
    this._buildForm();
    this.getComboContatos();
  }

  private _buildForm(): void {
    this.form = new FormGroup({
      'nome': new FormControl(''),
      'dataAbertura': new FormControl(''),
      'observacao': new FormControl(''),
      'redes': new FormControl(''),
    });
  }

  getComboContatos() {
    this._service.tiposDeRedes().subscribe(item => {
      this.comboRede = item;
      // console.log(item);
    });
  }


}
