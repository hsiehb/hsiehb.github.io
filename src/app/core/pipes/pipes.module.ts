import { NgModule } from '@angular/core';
import { KeysPipe } from './keys/keys.pipe';
import { SearchFilterPipe } from './search-filter/search-filter.pipe';

@NgModule({
    declarations: [
      KeysPipe,
      SearchFilterPipe
    ],
    exports: [
      KeysPipe,
      SearchFilterPipe
    ]
})
export class PipesModule { }
