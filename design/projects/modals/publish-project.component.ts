import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { GridOptions } from 'ag-grid/dist/lib/entities/gridOptions';
import { ProjectPublishCheckCellComponent } from '../../../shared/cell-components/project-publish-check-cell.component';
import { BaseSharedComponent } from '../../../shared/base/base-shared.component';

@Component({
  selector: 'publish-project-modal',
  templateUrl: './publish-project.component.html',
})
export class PublishProjectModalComponent extends BaseSharedComponent {

  @Output() isPublish = new EventEmitter();

  @Input() rowData: any[];
  @Input() projectName:string;

  gridOptionsPublish: GridOptions;
  columnDefsPublish: any[];

  constructor(private activeModal: NgbActiveModal, private toasterService: ToasterService) { 

    super();

    this.gridOptionsPublish = <GridOptions>{
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      },
      toolPanelSuppressSideButtons: true,
      rowSelection: 'multiple',
      suppressNoRowsOverlay: true,
      enableFilter: true,
      floatingFilter: true,
      enableStatusBar: true,
      enableRangeSelection: true,
      groupUseEntireRow: true,
      paginationAutoPageSize: true,
      enableColResize: true,
      enableSorting: true,
      context: {
        componentParent: this
      },
      suppressRowClickSelection: true,

    };

    this.columnDefsPublish = [
      {
        headerName: "Group",
        field: "group",
        filter: 'text'
      },
      {
        cellStyle: { "text-align": "center" },
        suppressFilter: true,
        suppressMenuFilterPanel: true,
        suppressMenuMainPanel: true,
        suppressMenuColumnPanel: true,
        suppressMenu: true,
        minWidth: 20,
        width: 20,
        pinned: "left",
        headerName: "",
        field: "include",
        cellRendererFramework: ProjectPublishCheckCellComponent
      },
      {
        cellStyle: { "text-align": "center" },
        suppressFilter: true,
        suppressMenuFilterPanel: true,
        suppressMenuMainPanel: true,
        suppressMenuColumnPanel: true,
        suppressMenu: true,
        minWidth: 20,
        width: 20,
        pinned: "left",
        headerName: "",
        field: "id",
        hide: true
      }

    ];

  }

  sizeToFitColumns(){
    this.fitSize(this.gridOptionsPublish);
  }

  autoSizeColumns(){
    let ignore = [];
    ignore.push('include');
    this.autoSize(ignore, this.columnDefsPublish, this.gridOptionsPublish);
  }

  closeModal() {
    this.activeModal.close();
  }

  passDataBack() {
    this.isPublish.emit(this.rowData);
    this.activeModal.close();
  }
}
