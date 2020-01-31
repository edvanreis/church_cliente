import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarVisitanteComponent } from './pesquisar-visitante.component';

describe('PesquisarVisitanteComponent', () => {
  let component: PesquisarVisitanteComponent;
  let fixture: ComponentFixture<PesquisarVisitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarVisitanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
