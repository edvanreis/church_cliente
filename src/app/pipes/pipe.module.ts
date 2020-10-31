import { NgModule } from '@angular/core';
import { KeyValuePipe } from './key-value.pipe';
import { GroupByPipe } from './group-by.pipe';
import { BooleanPipe } from './boolean.pipe';
import { CpfCnpjPipe } from './cpf-cnpj.pipe';

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
