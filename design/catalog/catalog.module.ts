import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatalogComponent } from './catalog.component';

import { AgGridModule } from "ag-grid-angular";
import { ProjectSelectCellComponent } from '../../shared/cell-components/project-select-cell.component';
import { ProjectPublishButtonCellComponent } from '../../shared/cell-components/project-publish-button-cell.component';
import { ProjectPublishCheckCellComponent } from '../../shared/cell-components/project-publish-check-cell.component';
import { ThemeModule } from '../../../../@theme/theme.module';
import { BaseSharedModule } from '../../shared/base/base-shared.module';
import { RepositoryModalComponent } from './modals/repository.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    AgGridModule.withComponents(
      []
    ),
    BaseSharedModule,
    TreeModule
  ],
  declarations: [
    CatalogComponent,
    RepositoryModalComponent
  ],
  entryComponents: [
    RepositoryModalComponent
  ]
})
export class CatalogModule { }
