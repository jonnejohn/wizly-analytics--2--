import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../../../../@theme/theme.module';
import { Pipe, PipeTransform } from '@angular/core';
//import { NewHeaderModalComponent } from './modals/new-header.component';
// import { ImportHeaderModalComponent } from './modals/import-header.component';
import { SearchObjectService } from './shared/services/searchobject.service';
import { SearchComponent1 } from './search.component';
import { AgGridModule } from "ag-grid-angular"; 
  

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ThemeModule,
AgGridModule  
    
    ],
    declarations: [
        //HeaderComponent,
        //ewHeaderModalComponent,
        SearchComponent1 
    ],
    entryComponents: [
        // ProjectSelectCellComponent,
        // ProjectPublishCheckCellComponent,
        // ProjectPublishButtonCellComponent,
        //NewHeaderModalComponent
        // DeleteProjectModalComponent,
        // PublishProjectModalComponent,
        // ExportProjectModalComponent,
        SearchComponent1 
        // ImportProjectModalComponent
      ]
    
})

export class SearchModule1 { }

