import {
  Component, OnInit, AfterViewInit, ViewChild,
  OnDestroy, AfterViewChecked, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { GridOptions, RowNode } from "ag-grid";

import { Host } from '../../shared/models/host';
import { project } from '../../shared/models/project';
import { projectImport } from '../../shared/models/projectimport';
import { CatalogOutput } from '../../shared/models/catalog/catalog-output';
import { SubjectArea } from "../../shared/models/catalog/subject-area";
import { Repository } from "../../shared/models/catalog/repository";
import { ModelImport } from "../../shared/models/ModelImport";
import { ModelTemplate } from "../../shared/models/model-template";
import { Group } from '../../shared/models/usermanagement/group';

import { CatalogService } from '../../shared/services/catalog.service';
import { HostService } from '../../shared/services/host.service';
import { ProjectService } from '../../shared/services/project.service';
import { ProjectImportService } from '../../shared/services/projectImport.service';
import { ProjectExportService } from '../../shared/services/ProjectExport.service';
import { ModelImportService } from '../../shared/services/ModelImport.service';
import { GroupManagementService } from '../../shared/services/group-management.service';

import { ProjectSelectCellComponent } from '../../shared/cell-components/project-select-cell.component';
import { ProjectPublishButtonCellComponent } from '../../shared/cell-components/project-publish-button-cell.component';
import { ProjectPublishCheckCellComponent } from '../../shared/cell-components/project-publish-check-cell.component';

import { BaseSharedComponent } from '../../shared/base/base-shared.component';
import { ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../ui-features/modals/modal/modal.component';
import { RepositoryModalComponent } from './modals/repository.component';
import { AttributeItem } from '../../shared/models/attribute';
import { EnumGrpService } from '../../shared/services/enumgroup.Service';
import { AttributeItemService } from '../../shared/services/attributeItem.service';

declare var $: any;

@Component({
  selector: 'page-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [ProjectService, ProjectImportService, ProjectExportService, CatalogService, HostService, ModelImportService, GroupManagementService, EnumGrpService, AttributeItemService]
})

export class CatalogComponent extends BaseSharedComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  dataHeight: number = 300;

  attr: AttributeItem[];
  //enumGrp: EnumGrp[];

  categoryId: number;

  constructor(public router: Router, private enumGrpService: EnumGrpService, private AttrItmSrvce: AttributeItemService,
    private customModalService: NgbModal, private toasterService: ToasterService, private modalService: NgbModal) {

    super();
  }

  ngAfterViewInit(): void {
    $('#div-data').resizable({
      stop: (e, ui) => {
        this.dataHeight = ui.size.height;

      }
    });
  }
  
  ngOnInit(): void {
   
    this.columnDefs = [];
    this.rowData = [];
    this.gridOptions = <GridOptions>{
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
      },
      toolPanelSuppressSideButtons: true,
      suppressLoadingOverlay: true,
      rowSelection: 'single',
      overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 1px solid rgb(0,0,127); border-radius: 5px;\">Load a category</span>",
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
      stopEditingWhenGridLosesFocus: true
    };
  }

  ngOnDestroy() {

  }

  ngAfterViewChecked() {

  }

  showRepositories(){
    const modalRef = this.customModalService.open(RepositoryModalComponent);
   
    modalRef.componentInstance.name.subscribe((value) => {
      this.loadCategory(value);
    });
  }

  loadCategory(categoryId) {
    this.categoryId = categoryId;
  }

  getAttributes() {
    this.AttrItmSrvce.getAttributes(this.categoryId, this.baseSession().dataApiUrl)
                        .subscribe((res) => {
                            if (res) {
                                this.attr = res;
                                this.getEnum();
                            }
                        });
  }

  getEnum(): void {
    this.enumGrpService.getCategAttributes(this.baseSession().projectId, this.baseSession().userId, this.categoryId, this.baseSession().dataApiUrl).
      subscribe((res) => {
        if (res) {
        }

      });
  }

}

