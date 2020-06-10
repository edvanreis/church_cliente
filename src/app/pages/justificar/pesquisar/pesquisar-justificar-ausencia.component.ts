import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pesquisar-justificar-ausencia',
  templateUrl: './pesquisar-justificar-ausencia.component.html',
  styleUrls: ['./pesquisar-justificar-ausencia.component.scss']
})
export class PesquisarJustificarAusenciaComponent implements OnInit {

  constructor(private _router: Router,
    private _avRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  cadastrar() {
    // localStorage.setItem("pesquisar", JSON.stringify(this.statusSelecionado));
    this._router.navigate(['/auth/justificar/cadastrar'], {
      queryParams: {
        janela: 'Nova',
      },
      skipLocationChange: true
    });
  }

}
