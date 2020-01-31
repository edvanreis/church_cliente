import { NgModule } from '@angular/core';
import { KeyValuePipe } from '../../pipes/key-value.pipe';
import { GroupByPipe } from '../../pipes/group-by.pipe';
import { BooleanPipe } from '../../pipes/boolean.pipe';

@NgModule({
  declarations: [
    KeyValuePipe,
    GroupByPipe,
    BooleanPipe
  ],
  imports: [

  ],
  exports: [
    KeyValuePipe,
    GroupByPipe,
    BooleanPipe
  ]
})
export class PipeModule { }
