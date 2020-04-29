import { NgModule } from '@angular/core';
import { KeyValuePipe } from '../../pipes/key-value.pipe';
import { GroupByPipe } from '../../pipes/group-by.pipe';
import { BooleanPipe } from '../../pipes/boolean.pipe';
import { CpfCnpjPipe } from '../../pipes/cpf-cnpj.pipe';

@NgModule({
  declarations: [
    KeyValuePipe,
    GroupByPipe,
    BooleanPipe,
    CpfCnpjPipe
  ],
  imports: [

  ],
  exports: [
    KeyValuePipe,
    GroupByPipe,
    BooleanPipe,
    CpfCnpjPipe
  ]
})
export class PipeModule { }
