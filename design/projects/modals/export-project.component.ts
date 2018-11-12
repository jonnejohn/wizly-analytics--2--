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
  selector: 'export-project-modal',
  templateUrl: './export-project.component.html',
})
export class ExportProjectModalComponent extends BaseSharedComponent {

  @Output() isExport = new EventEmitter();

  @Input() rowData: any[];

  gridOptionsRepo: GridOptions;
  columnDefsRepo: any[];

  constructor(private activeModal: NgbActiveModal, private toasterService: ToasterService) { 

    super();

    this.gridOptionsRepo = {

      enableSorting: true,
      rowSelection: 'multiple',
      suppressNoRowsOverlay: true,
      enableFilter: true,
      floatingFilter: true,
      enableStatusBar: true,
      enableRangeSelection: true,
      groupUseEntireRow: true,
      paginationAutoPageSize: true,
      enableColResize: true,
      toolPanelSuppressSideButtons: true,
      suppressMultiRangeSelection: true,
      suppressRowClickSelection: true,
      context: {
          componentParent: this
      },
      rowHeight: 30,
      onGridReady: () => {
          this.gridOptionsRepo.api.sizeColumnsToFit();
      }
  };

    this.columnDefsRepo = [
      {
          headerName: "ID",
          field: "ID",
          hide: true,
          filter: "text"
      },
      {
          headerName: "", field: "select",
          suppressFilter: true,
          suppressMenuFilterPanel: true,
          suppressMenuMainPanel: true,
          suppressMenuColumnPanel: true,
          suppressMenu: true,
          minWidth: 36,
          width: 36,
          pinned: "center",
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
          cellStyle: { "text-align": "center" },
      },
      {
          headerName: "Repository Name",
          field: "RepositoryName",
          hide: false,
          filter: "text"
      }
  ];

  }

  sizeToFitColumns(){
    this.fitSize(this.gridOptionsRepo);
  }

  autoSizeColumns(){
    let ignore = [];
    ignore.push('include');
    this.autoSize(ignore, this.columnDefsRepo, this.gridOptionsRepo);
  }

  closeModal() {
    this.activeModal.close();
  }

  passDataBack() {

    let rowDataRepoIDs: any[] = [];

    let rows = this.gridOptionsRepo.api.getSelectedRows();

    if (rows.length === 0) {
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Select at least one repository',
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
      return;
    }
    else {
        for (var i = 0; i < rows.length; i++) {
            rowDataRepoIDs.push(rows[i].ID);
        }
    }

    this.isExport.emit(rowDataRepoIDs);
    this.activeModal.close();
  }
}
