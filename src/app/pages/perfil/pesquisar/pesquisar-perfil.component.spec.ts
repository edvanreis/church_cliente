import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarPerfilComponent } from './pesquisar-perfil.component';

describe('PesquisarPerfilComponent', () => {
  let component: PesquisarPerfilComponent;
  let fixture: ComponentFixture<PesquisarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
