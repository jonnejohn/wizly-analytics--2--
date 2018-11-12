import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectsComponent } from './projects.component';

import { AgGridModule } from "ag-grid-angular";
import { ProjectSelectCellComponent } from '../../shared/cell-components/project-select-cell.component';
import { ProjectPublishButtonCellComponent } from '../../shared/cell-components/project-publish-button-cell.component';
import { ProjectPublishCheckCellComponent } from '../../shared/cell-components/project-publish-check-cell.component';
import { ThemeModule } from '../../../../@theme/theme.module';
import { BaseSharedModule } from '../../shared/base/base-shared.module';
import { NewProjectModalComponent } from './modals/new-project.component';
import { DeleteProjectModalComponent } from './modals/delete-project.component';
import { PublishProjectModalComponent } from './modals/publish-project.component';
import { ExportProjectModalComponent } from './modals/export-project.component';
import { ImportProjectModalComponent } from './modals/import-project.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    AgGridModule.withComponents(
      [
        ProjectSelectCellComponent,
        ProjectPublishCheckCellComponent,
        ProjectPublishButtonCellComponent]
    ),
    BaseSharedModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectSelectCellComponent,
    ProjectPublishCheckCellComponent,
    ProjectPublishButtonCellComponent,
    NewProjectModalComponent,
    DeleteProjectModalComponent,
    PublishProjectModalComponent,
    ExportProjectModalComponent,
    ImportProjectModalComponent
  ],
  entryComponents: [
    ProjectSelectCellComponent,
    ProjectPublishCheckCellComponent,
    ProjectPublishButtonCellComponent,
    NewProjectModalComponent,
    DeleteProjectModalComponent,
    PublishProjectModalComponent,
    ExportProjectModalComponent,
    ImportProjectModalComponent
  ]
})
export class ProjectsModule { }
