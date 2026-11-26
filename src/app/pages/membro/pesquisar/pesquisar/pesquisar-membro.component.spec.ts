import { MatDialog } from '@angular/material';
import '../../../../abstract/abstract-service';
import { EmitirEventoService } from '../../../../service/emitir-evento.service';
import { DialogAprovarReprovarMembroComponent } from '../../../dialog/dialog-aprovar-reprovar-membro/dialog-aprovar-reprovar-membro.component';
import { PesquisarMembroComponent } from './pesquisar-membro.component';

describe('PesquisarMembroComponent - aprovação', () => {
  let component: PesquisarMembroComponent;
  let eventos: EmitirEventoService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    eventos = new EmitirEventoService();
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    component = new PesquisarMembroComponent(eventos, null, null, null, null, null, null, dialog, null);
  });

  it('abre a confirmação de aprovação para o membro selecionado', () => {
    component.dialogAprovarMembro(42);

    expect(dialog.open).toHaveBeenCalledWith(DialogAprovarReprovarMembroComponent, {
      width: '600px',
      data: { id: 42, aprovar: true, reprovar: false, aprovarReprovado: false }
    });
  });

  it('atualiza a pesquisa após a aprovação, mas não para eventos não relacionados', () => {
    spyOn(component, 'pesquisar');
    component.getEmiter();

    eventos.emitir('outro-evento', '');
    expect(component.pesquisar).not.toHaveBeenCalled();

    eventos.emitir('dialog-aprovar-reprovar-membro', '');
    expect(component.pesquisar).toHaveBeenCalledTimes(1);
  });
});
