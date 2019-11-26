import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarCelulaComponent } from './pesquisar-celula.component';

describe('PesquisarCelulaComponent', () => {
  let component: PesquisarCelulaComponent;
  let fixture: ComponentFixture<PesquisarCelulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarCelulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarCelulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
