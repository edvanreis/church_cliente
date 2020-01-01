import { NgModule } from '@angular/core';
import { KeyValuePipe } from '../../pipes/key-value.pipe';
import { GroupByPipe } from '../../pipes/group-by.pipe';

@NgModule({
  declarations: [
    KeyValuePipe,
    GroupByPipe],
  imports: [

  ],
  exports: [
    KeyValuePipe,
    GroupByPipe]
})
export class PipeModule { }
