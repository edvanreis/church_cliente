import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarMembroComponent } from './pesquisar-membro.component';

describe('PesquisarMembroComponent', () => {
  let component: PesquisarMembroComponent;
  let fixture: ComponentFixture<PesquisarMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
