import { NgModule } from '@angular/core';
import { KeyValuePipe } from '../../pipes/key-value.pipe';

@NgModule({
  declarations: [KeyValuePipe],
  imports: [],
  exports: [KeyValuePipe]
})
export class PipeModule { }
