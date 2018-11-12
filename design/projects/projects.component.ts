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
import { NewProjectModalComponent } from './modals/new-project.component';
import { DeleteProjectModalComponent } from './modals/delete-project.component';
import { PublishProjectModalComponent } from './modals/publish-project.component';
import { ExportProjectModalComponent } from './modals/export-project.component';
import { ImportProjectModalComponent } from './modals/import-project.component';

declare var $: any;

@Component({
  selector: 'page-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService, ProjectImportService, ProjectExportService, CatalogService, HostService, ModelImportService, GroupManagementService]
})

export class ProjectsComponent extends BaseSharedComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  isCancel: boolean = false;
  isProjectImportModal: boolean = false;
  isNoAccess1: boolean = false;
  isNoAccess: boolean = false;
  DeleteName: any;
  newProjectCreate: boolean;

  @ViewChild('autoShownModal') public autoShownModal: any;

  @ViewChild('agGrid') agGrid;
  subject: Subject<boolean>;

  public isModalShown: boolean = false;
  public isModalShown1: boolean = false;

  public isModalShownProject: boolean = false;
  public isModalShownInf: boolean = false;
  public isModalShownCreated: boolean = false;

  public isModalShownSaved: boolean = false;
  public isModalShownDelete: boolean = false;
  public isModalDeleteConfirmation: boolean = false;
  public isModalImport: boolean = false;
  public isModalImportError: boolean = false;
  public blankmodal: boolean = false;
  public samenamemodal: boolean = false;
  public isModalPrjExport: boolean = false;
  public isModalPrjSelect: boolean = false;
  public isModalTypeSelect: boolean = false;
  public isModalrepoalert: boolean = false;
  public blankprjname: boolean = false;
  public Saveconfirmation: boolean = false;
  public mdlIsImporting: boolean = false;
  public mdlIsImporting1: boolean = false;
  public ModalImportModel: boolean = false;
  public isModalGotoCatalog: boolean = false;
  public isModalDeleteError: boolean = false;
  public isModalRepoSelect: boolean = false;
  public isModalShownPublish: boolean = false;

  public isModalShownInfPublish: boolean = false;

  passvalue: string;
  rowno1: number;
  projectNameToCheck: string;
  isNavigate: boolean = false;
  newProjectName: string;
  updatedName: string;
  repoIDs: any[];
  catalogOutput: CatalogOutput;
  projects: project[];
  project: project;

  errorMessage: string;
  columnDefs: any[];
  columnDefsRepo: any[];
  rowDataRepoIDs: any[];
  rowData: any[];
  rowDataRepo: any[];
  gridOptions: GridOptions;
  gridOptionsRepo: GridOptions;
  deletedProjects: RowNode[];
  SelectedRepoIds: RowNode[];

  ProjectNameTxt: string;

  quickFilterTxt: string;
  newID: number;
  newName: string;
  newCreatedBy: number;
  newcreatedby: string;
  create: 'John smithss';
  projectName: string;
  newProjectID: string;
  public fileString;
  public checked: string;
  public prjID: string;
  ExporType: string;
  private _showName: boolean = false;
  counter: number;
  mdlStatusText: string = '';
  mdlStatusText1: string = '';
  public flag: boolean = false;

  models: ModelTemplate[];

  ModelIDs: ModelTemplate[];
  Repositories: Repository[];
  SubjectAreas: SubjectArea[];
  RepoId: number;
  SubjectAreaId: number;
  fileString1: string;


  gridOptionsPublish: GridOptions;
  rowDataPublish: any[];
  columnDefsPublish: any[];

  @HostListener('window:beforeunload', ['$event'])
  public doSomething($event) {
    return false;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.code === "Enter") {
      var currentCell = this.gridOptions.api.getFocusedCell();

      var finalRowIndex = this.gridOptions.api.paginationGetRowCount() - 1;

      // If we are editing the last row in the grid, don't move to next line
      if (currentCell.rowIndex === finalRowIndex) {
        return;
      }
      this.gridOptions.api.stopEditing();
      this.gridOptions.api.clearFocusedCell();

      this.gridOptions.api.startEditingCell({
        rowIndex: currentCell.rowIndex + 1,
        colKey: currentCell.column
      });
    }
  }

  constructor(public router: Router, private ProjectService : ProjectService, private ProjectImportService: ProjectImportService, private ProjectExportService: ProjectExportService, private catalogService: CatalogService,
    private hostService: HostService,
    private ModelImportService: ModelImportService, private _groupMgtService: GroupManagementService, private customModalService: NgbModal, private toasterService: ToasterService, private modalService: NgbModal) {

    super();

    localStorage.setItem("NameModified", "false");
    this.deletedProjects = [];
    this.rowDataRepoIDs = [];
    this.quickFilterTxt = "";
    this.ProjectNameTxt = "";
    this.counter = 1;
    this.fileString;
    this.samenamemodal = false;
    var chk = document.getElementsByClassName('myCheckbox');




    this.projectName = localStorage.getItem("projectName");

    if (!this.projectName || this.projectName == "") {
      this.projectName = "No Project Selected";
    }
    else {
      this.getDiagram();
    }




  }

  ngOnDestroy() {

  }

  ngAfterViewChecked() {

  }

  open() {
    const modalRef = this.customModalService.open(NewProjectModalComponent);
   
    modalRef.componentInstance.name.subscribe((value) => {
      this.onadd(value);
    });

   
  }

  //===================Project Import=====================================

  openfileDialog() {
    $("#fileInput").click();
  }


  onFileSelected($event): void {

    if ($event.target.files.length == 0) {
      return;
    }

    this.mdlStatusText = 'Importing the Project..';

    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = function (e) {

    }

    myReader.readAsText(file);

    myReader.onloadend = (e) => {

      this.fileString = myReader.result;


      if (this.fileString == undefined) {

        const toast: Toast = {
          type: this.toastTypes[4],
          title: 'Error',
          body: 'Please choose .prjafts file',
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
        return;
      }

      var pi: projectImport = new projectImport();
      pi.UserID = this.baseSession().userId;
      pi.FileContent = this.fileString;

      this.postProjectImport(pi);

    };


  }

  postProjectImport(projectImports: projectImport): void {

    const modalRef = this.customModalService.open(ImportProjectModalComponent);
    
    this.ProjectImportService.postProjectImport(projectImports, this.baseSession().dataApiUrl).subscribe(
      (res) => {
        if (res) {

          this.getProject();
          modalRef.close();
          const toast: Toast = {
            type: this.toastTypes[2],
            title: 'Operation Successful',
            body: '',
            timeout: 5000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
          };

          this.toasterService.clear();

          this.toasterService.popAsync(toast);

        }
      }

    );
  }
  //===========================================================================


  ngOnInit() {
    
    this.gridOptions = <GridOptions>{
      onGridReady: (params) => {
        params.api.sizeColumnsToFit();
        params.api.hideOverlay();
      },
      toolPanelSuppressSideButtons: true,
      rowSelection: 'single',
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
      getRowHeight: this.getheight,
      stopEditingWhenGridLosesFocus: true
    };


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
      context: {
        componentParent: this
      },
      rowHeight: 30,
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      }
    };

    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        hide: true,
        filter: "text"
      },
      {
        headerName: "UserID",
        field: "UserID",
        hide: true,
        filter: "text"
      },
      {
        headerName: "Select",
        field: "Load",
        cellRendererFramework: ProjectSelectCellComponent,
        minWidth: 50,
        width: 50,
        cellStyle: { "text-align": "center" },
        suppressFilter: true,
        suppressMenuFilterPanel: true,
        suppressMenuMainPanel: true,
        suppressMenuColumnPanel: true,
        suppressMenu: true,
      },
      {
        headerName: "Project Name",
        field: "Name",
        editable: true,
        filter: "text",
        newValueHandler: this.NewStringValueHandler.bind(this),
        cellStyle: { "white-space": "normal" },
        onCellValueChanged: (data) => {
          this.mSessionService.SetSessionIsModified(true);
        }
      },
      { headerName: "Access", field: "access", width: 120, minWidth: 45, cellRenderer: this.AccessRenderer, suppressFilter: true },
      { headerName: "Publish To", field: "publish", cellRendererFramework: ProjectPublishButtonCellComponent, suppressFilter: true, width: 80, minWidth: 45, cellStyle: { "text-align": "center" }, },
      { headerName: "Groups", field: "group", filter: 'text' },
      {
        headerName: "Last Modified Date",
        field: "LastModifiedDate", suppressFilter: true,
        comparator: this.dateComparator.bind(this),
        width: 120, minWidth: 45
      },
      { headerName: "Is Changed", field: "changed", hide: true }
    ];

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


    

    

    this.getProject();

  }

  publishProject: number;
  publishedNode: RowNode;
  PublishTo(node: RowNode, params) {

    this.publishedNode = node;

    this.publishProject = params;
    this._groupMgtService.getGroupsPublish(params, this.baseSession().dataApiUrl).subscribe(ret => {
      if (ret) {
        let published = ret as Group[];

        this.rowDataPublish = [];
        this.rowDataPublish = published.map(d => {
          return {
            group: d.Name,
            include: d.IsIncluded,
            id: d.ID
          };
        });

        const modalRef = this.customModalService.open(PublishProjectModalComponent);

        modalRef.componentInstance.rowData = this.rowDataPublish;
        modalRef.componentInstance.projectName = node.data.Name;
        modalRef.componentInstance.isPublish.subscribe((value) => {
          if (value) {
            this.Publish(value);
          }

        });

      }

    });

  }

  Publish(rowData:any[]) {
    let selected = rowData.filter(d => d.include == true).map(d => {
      return d.id;
    });

    this._groupMgtService.postGroupPublish(this.publishProject, selected, this.baseSession().dataApiUrl).subscribe(ret => {
      if (ret) {
        
        const toast: Toast = {
          type: this.toastTypes[2],
          title: 'Operation Successful',
          body: '',
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);

        let groups = rowData.filter(d => d.include == true).map(d => {
          return d.group;
        });

        this.publishedNode.setDataValue("group", groups.join(', '));
      }

    });

  }

  AccessRenderer(params) {

    if (params.value === 1) {
      return "Read";
    }
    else if (params.value === 2) {
      return "Read, Write";
    }
    else {
      return "Read, Write, Delete";
    }
  }

  sizeToFitColumns(gridNo){
    // projects grid
    if(gridNo == 1){
      this.fitSize(this.gridOptions);
    }
    // repo grid
    else if(gridNo == 2){

    }
  }

  autoSizeColumns(gridNo){
    let ignore = [];
    // if projects grid
    if(gridNo == 1){
      ignore.push('Load');
      this.autoSize(ignore, this.columnDefs, this.gridOptions);
    }
  }

  autoSizeAll1(): void {

    var g = document.getElementsByTagName("ag-grid-angular")[0].childNodes;
    var allColumnIds = [];
    this.columnDefsPublish.forEach(function (columnDef) {
      allColumnIds.push(columnDef.field);
    });
    this.gridOptionsPublish.columnApi.autoSizeColumns(allColumnIds);
  }

  public getRepoIDS(cell) {

    this.rowDataRepoIDs.push(cell);
  }

  public getAllRepoIDs() {
    this.rowDataRepoIDs = [];
    var model = this.gridOptionsRepo.api.getModel();

    for (var i = 0; i < model.getRowCount(); i++) {

      var row = model.getRow(i);

      this.rowDataRepoIDs.push(row.data.ID);

    }

    var t = this.rowDataRepoIDs;


  }

  public onRowClicked(e) {

    var check = localStorage.getItem("NameModified");
    if (check === "true") {
      this.SaveconfirmationshowModal();
    }


  }
  public RemoveRepoIDS(cell) {

    for (var i = 0; i < this.rowDataRepoIDs.length; i++) {



      if (cell === this.rowDataRepoIDs[i]) {
        var remove = this.rowDataRepoIDs[i];
        var index = i;
      }
    }

    if (index > -1) {
      this.rowDataRepoIDs.splice(index, 1);
    }

    var c = this.rowDataRepoIDs;
  }

  public methodfromparent1(cell) {
    this.showModal();
  }

  public setSelectedProject(id, name) {
    this.mSessionService.SetProject(+`${id}`, `${name}`);
    this.fillTable();

    const toast: Toast = {
      type: this.toastTypes[1],
      title: 'Project Loaded',
      body: `${name}`,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }


  public setPname(cell) {

    localStorage.setItem("projectName", `${cell}`);

    var model = this.gridOptions.api.getModel();

    for (var i = 0; i < model.getRowCount(); i++) {

      var row = model.getRow(i);
      var v = localStorage.getItem("projectName");
      if (v == row.data.Name) {
        this.newProjectID = row.data.ID;
      }
    }

  }

  public methodFromParent(cell) {

    localStorage.setItem("projectId", `${cell}`);

  }

  public methodfromparent2(cell) {
    console.log('asdasd');
    localStorage.setItem("projectId", null);
    this.showModal1();
  }

  sortPosition(): void {
    var sort = [
      { colId: 'ID', sort: 'asc' }
    ];
    this.gridOptions.api.setSortModel(sort);
  }

  fillTable(): void {

    let rowData: any[] = [];

    for (let i = 0; i < this.projects.length; i++) {

      if(this.projects[i].Name == this.baseSession().projectName){
        this.mSessionService.SetProject(this.projects[i].ID, this.projects[i].Name);
      }

      rowData.push({
        Load: this.projects[i].Name == this.baseSession().projectName ? true : false,
        ID: this.projects[i].ID,
        UserID: this.projects[i].UserID,
        Name: this.projects[i].Name,
        LastModifiedDate: this.projects[i].LastModifiedDate,
        access: this.projects[i].AccessType,
        group: this.projects[i].Groups
      });
    }

    this.rowData = rowData;

    this.sizeToFitColumns(1);
  }


  fillTable1(): void {

    var pname: string;
    pname = localStorage.getItem("projectName");
    var rowData: any[] = [];

    var model = this.gridOptions.api.getModel();

    //   var hosts: Host[] = [];
    var projects: project[] = [];
    for (var i = 0; i < model.getRowCount(); i++) {

      var row = model.getRow(i);
      var projectid: string;
      projectid = localStorage.getItem("projectId");

      rowData.push({
        Load: row.data.ID === projectid ? true : false,
        ID: row.data.ID,
        UserID: row.data.UserID,
        Name: row.data.Name,
        LastModifiedDate: row.data.LastModifiedDate,
        access: this.projects[i].AccessType

      });

    }

    this.rowData = rowData;
    this.gridOptions.api.hideOverlay();

    this.agGrid.api.sizeColumnsToFit();
    this.gridOptions.api.sizeColumnsToFit();
    this.sizeToFit();
  }


  onFilterChange(): void {
    this.gridOptions.api.setQuickFilter(this.quickFilterTxt);
  }


  onAddRoww(): void {
    this.gridOptions.api.insertItemsAtIndex(0, [(this.rowData)]);
  }


  ngAfterViewInit(): void {
    $(".search-label").on("click", (e) => {
      e.preventDefault();
      $(".search-text").toggleClass("collapsed");
      $(".search-text").focus();
    });

  }

  onRemoveSelected(): void {

    let selectedNodes = this.gridOptions.api.getSelectedNodes();

    if(selectedNodes.length < 1){
      return;
    }

    let row = selectedNodes[0];
    this.DeleteName = row.data.Name;
    if (row.data.access === 1 || row.data.access === 2) { this.isNoAccess = true; return }

    if (row.data.ID == this.baseSession().projectId) {
      const toast: Toast = {
        type: this.toastTypes[4],
        title: 'Error',
        body: 'Cannot delete an open Project. Please close the Project and try again.',
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
      return;
    }

    const modalRef = this.customModalService.open(DeleteProjectModalComponent);
   
    modalRef.componentInstance.projectName = row.data.Name;
    modalRef.componentInstance.isDelete.subscribe((value) => {
      if(value){
        this.onRemoveSelected1(row.data);
      }
     
    });

  }

  onRemoveSelected1(data): void {

    var projects: project[] = [];

    var p: project = new project();

      p.ID = data.ID;
      p.Name = data.Name;
      p.UserID = data.UserID;

      projects.push(p);

    this.deleteProject(projects);

  }



  rowdatacheck(): void {
    var model = this.gridOptions.api.getModel();

    for (var i = 0; i < model.getRowCount(); i++) {

      var row = model.getRow(i);
      if (this.newName.trim() != row.data.Name) { }

    }
  }


  onAddRow2(event, name): void {

    this.showProjectModal();

    var d = this.ProjectNameTxt.trim();

  }



  newadd(): void {

    var cb = this.ProjectNameTxt;

    this.newProjectName = this.ProjectNameTxt;
    if (this.ProjectNameTxt.trim() == "" || this.ProjectNameTxt.trim() == undefined) {
      this.hideProjectModal();
      this.showmodalblank();
    }
    else {
      //this.onadd();

      localStorage.setItem("newProjectCreate", "true");
    }

  }


  keyDownFunction(event): void {

    var a = event.code;
    if (a === "Enter") {
      if (this.ProjectNameTxt.trim() == "" || this.ProjectNameTxt.trim() == undefined) {
        this.hideProjectModal();
        this.showmodalblank();
      }
      else {
        //this.onadd();
      }
    }

  }


  onAddRow(name): void {

    this.hideProjectModal();
    var a = name;

    if (a == undefined || a == "") {


      //this.showmodalblank();

    }
    else {

      var newItem = this._createNewRowData(name);


      if (newItem != null) {

        this.gridOptions.api.insertItemsAtIndex(0, [newItem]);
        return newItem;

      }

      this.quickFilterTxt = "";
      return newItem;
    }
  }


  onEditCell(params: any): void {

    this.updateProject(params.data.Id, params.data.Name, params.data.UserID);

  }

  onadd(name): void {

    var test = this.onAddRow(name);

    if (test != null) {
      var model = this.gridOptions.api.getModel();
      var projects: project[] = [];
      for (var i = 0; i < model.getRowCount(); i++) {

        var row = model.getRow(i);
        var p: project = new project();

        p.ID = row.data.ID;


        if (row.data.id == "undefined") {
          p.ID = 0;
        }
        p.Name = row.data.Name;

        p.UserID = row.data.UserID;

        projects.push(p);
      }


      this.mSessionService.SetProject(0, name);
      this.postProject(projects, 'Created ' + this.baseSession().projectName);


    }
  }
  public NewStringValueHandler(params: any) {

    if (params.data.access === 1) {
      this.isNoAccess1 = true;
      return;
    }
    if (params.newValue.trim() === "") {
      this.blankprjname = true;
      params.api.startEditingCell(true);
      return;
    }
    var bc = params.oldValue;
    if (params.newValue.trim().toLowerCase() === params.oldValue.trim().toLowerCase()) {

      return;

    }
    params.data[params.colDef.field] = params.newValue;

    var model = params.api.getModel();
    var a = params.newValue.toLowerCase().trim();
    var count = params.node.childIndex;
    for (var i = 0; i < model.getRowCount(); i++) {
      var row = model.getRow(i);
      var c = (row.data.Name).toLowerCase().trim()
      if (i != count) {
        if (a == c) {

          this.samenamemodal = true;

          params.api.setFocusedCell(count, "Name");

          params.data[params.colDef.field] = "";
          var gridCell = this.gridOptions.api.getFocusedCell();

          params.api.rowRenderer.startEditingCell(gridCell, null, null);
          return;

        }

      }

    }

    params.data["changed"] = "1";


    return a;

  }

  onExport(): void {

    this.hideModalprjExport();
    var userId = +localStorage.getItem("UserID");

    this._showName = true;
    this.fillRepoGrid();
    this.getAllRepoIDs();


    var model = this.gridOptions.api.getModel();
    var projects: project[] = [];
    for (var i = 0; i < model.getRowCount(); i++) {
      var row = model.getRow(i);


      var cv = this.projectName;
      if (row.data.Name === this.projectName) {

        this.prjID = row.data.ID;

      }



    }

    let rows1 = this.gridOptionsRepo.api.getDisplayedRowCount();

    if (rows1 === 0) {
      this.isModalGotoCatalog = true;
      return;
    }


    let rows = this.gridOptionsRepo.api.getSelectedRows();

    if (rows.length === 0) {
      this.RepoalertshowModal();
      return;
    }
    else {

      this.rowDataRepoIDs = [];

      for (var i = 0; i < rows.length; i++) {

        var row2 = rows[i];
        this.rowDataRepoIDs.push(row2.ID);

      }
    }
    if (this.prjID === null) {
      if (this.prjID === null) {
        this.ExportPrjshowModal();
      }

    }
    else {
      this.ExporType = "1";//Exporting the complete Project
      this.hostService.getFirstHost().subscribe((res) => {

        if (res) {
          this.ProjectExportService.getData(userId, Number(this.prjID), Number(this.ExporType), this.rowDataRepoIDs, res.Address).subscribe((res) => {
            if (res) {

            }
          });

        }
      });
    }

  }

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  onSaveChanges(): void {

    var model = this.gridOptions.api.getModel();

    //   var hosts: Host[] = [];
    var projects: project[] = [];
    for (var i = 0; i < model.getRowCount(); i++) {
      var row = model.getRow(i);
      var p: project = new project();

      p.ID = row.data.ID;


      if (row.data.ID == "undefined") {
        p.ID = 0;
      }
      p.Name = row.data.Name;
      var vb = p.Name.trim();
      if (vb == "") {
        this.blankprjnameshowModal();
        return;
      }

      p.UserID = row.data.UserID;

      if (row.data.access < 2) {
        continue;
      }

      projects.push(p);
    }
    this.postProject(projects);


  }



  _createNewRowData(name): any {

    var model = this.gridOptions.api.getModel();

    if (model.getRowCount() == 0) {
    
      var newData = {

        id: "undefined",
        Name: name,
        CreatedBy: '',
        UserID: this.mSessionService.GetSessionInfo().userId,
        LastModifiedDate: "-",
        Load: true


      };


    }
    else {

      for (var i = 0; i < model.getRowCount(); i++) {

        var row = model.getRow(i);
        var userId = this.mSessionService.GetSessionInfo().userId;
        if (name.toLowerCase() != row.data.Name.toLowerCase()) {
          var newData = {

            id: "undefined",
            Name: name,
            CreatedBy: '',
            UserID: this.mSessionService.GetSessionInfo().userId,
            LastModifiedDate: "-",
            Load: true

          };

        }
        else {

         // this.showmodalsamename();
          return newData = null;
        }



      }

    }

    return newData;

  }






  getProject(): void {

    this.ProjectService.getProject(this.baseSession().userId, this.baseSession().dataApiUrl)
      .subscribe((res) => {
        if (res) {
debugger;

          this.projects = res;
          this.fillTable();
        }
      });

  }

  postProject(projects: project[], message = 'Changes have been saved.'): void {

    this.ProjectService.postProject(projects, this.baseSession().dataApiUrl).subscribe(
      (rs) => {
        if (rs) {

          this.getProject();

          const toast: Toast = {
            type: this.toastTypes[2],
            title: 'Operation Successful',
            body: message,
            timeout: 5000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
          };
          this.toasterService.popAsync(toast);
        }

      }

    );
  }

  GotoCatalog(): void {

    if (!this.projectName || this.projectName == "") {



    }
    else {

      this.router.navigate(['/as-catalog']);
    }

  }

  deleteProject(projects: project[]): void {

    this.ProjectService.deleteProject(projects, this.baseSession().dataApiUrl).subscribe((res) => {
      if (res) {
        
        const toast: Toast = {
          type: this.toastTypes[2],
          title: 'Operation Successful',
          body: 'Deleted ' + projects[0].Name,
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);

        this.getProject();
      }
    });
  }


  updateProject(id: number, name: string, CreatedBy: number): void {

    var h: project = new project();
    h.ID = id;
    h.Name = name;
    h.UserID = CreatedBy;

    this.ProjectService.update(h).subscribe();

  }

  getDiagram(): void {

    if(this.baseSession().projectId == 0){
      return;
    }

    this.catalogService.getDiagram(this.baseSession().projectId, this.baseSession().dataApiUrl)
      .subscribe((res) => {
        if (res) {

          this.catalogOutput = res;

          var rowData: any[] = [];

          for (var i = 0; i < this.catalogOutput.Repositories.length; i++) {

            var repository = this.catalogOutput.Repositories[i];

            rowData.push({
              ID: repository.ID,
              RepositoryName: repository.Name,
            });

          }

          const modalRef = this.customModalService.open(ExportProjectModalComponent);

          modalRef.componentInstance.rowData = rowData;
          modalRef.componentInstance.isExport.subscribe((value) => {
            
            this.ProjectExportService.getData(this.baseSession().userId, this.baseSession().projectId, 1, value, this.baseSession().dataApiUrl).subscribe((res) => {
              if (res) {

              }
            });
          });
        }
      });
  }



  createDiagram(): void {


    for (var i = 0; i < this.catalogOutput.Repositories.length; i++) {

      var repository = this.catalogOutput.Repositories[i];

    }
  }

  createSubjectArea(subjAreas: SubjectArea[], relatedId: string): any[] {

    var retObj = [];
    for (var i = 0; i < subjAreas.length; i++) {

      var subjArea = subjAreas[i];

    }

    return retObj;
  }

  onModelChange() {

    var t = this.RepoId;

    for (var i = 0; i < this.catalogOutput.Repositories.length; i++) {

      var repository = this.catalogOutput.Repositories[i];

      if (this.RepoId == this.catalogOutput.Repositories[i].ID) {

        this.SubjectAreas = this.catalogOutput.Repositories[i].SubjectAreas;

      }
    }
  }

  onModelChangeSubArea() {
    var v = this.SubjectAreaId;
  }


  openfileDialog1() {
    if (this.RepoId === undefined || this.SubjectAreaId == undefined) {
      this.isModalRepoSelect = true;
      return;
    }
    var check = <HTMLInputElement>document.getElementById("fileInput1");
    check.value = "";
    $("#fileInput1").click();
  }


  changeListener1($event): void {
    this.mdlStatusText1 = 'Uploading the content..';
    this.mdlIsImporting1 = true;
    this.readThis1($event.target);
  }

  readThis1(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var fileType = inputValue.parentElement.id;
    myReader.onloadend = function (e) {

    }

    myReader.readAsText(file);

    myReader.onloadend = (e) => {

      this.fileString1 = myReader.result;





      if (this.fileString1 == undefined) {

        return;
      }

      var projId = localStorage.getItem("projectId");
      var parsedId = parseInt(projId);
      var p: ModelImport = new ModelImport();
      p.UserID = Number(localStorage.getItem("UserID"));
      p.FileContent = this.fileString1;
      p.SubjectAreaID = this.SubjectAreaId;
      p.ProjectID = parsedId;

      this.postModelImport(p);

    }


  }


  postModelImport(modelImports: ModelImport): void {


    this.hostService.getFirstHost().subscribe((res) => {

      if (res) {

        this.ModelImportService.postModelImport(modelImports, res.Address).subscribe(
          (res) => {
            if (res === "Success") {

              this.mdlStatusText1 = "File Uploaded Successfully!";
              this.mdlIsImporting1 = false;

            }
            else {
              this.mdlStatusText1 = "Uploading Failed Try Again!";
              this.mdlIsImporting1 = false;

            }

          }


        );
      }
    });
  }


  fillRepoGrid(): void {


    var rowData: any[] = [];

    for (var i = 0; i < this.catalogOutput.Repositories.length; i++) {

      var repository = this.catalogOutput.Repositories[i];
      var bn = repository.ID;
      var fb = repository.Name;

      rowData.push({

        ID: repository.ID,

        RepositoryName: repository.Name,


      });




    }
    this.rowDataRepo = rowData;
    setTimeout(() => {

      this.sizeToFitColumns(2);
    }, 500);

  }


  checkall(): void {

    this.checked = "1";
    var rowData: any[] = [];


    for (var i = 0; i < this.catalogOutput.Repositories.length; i++) {
      this._showName = true;

      var repository = this.catalogOutput.Repositories[i];
      var bn = repository.ID;
      var fb = repository.Name;

      rowData.push({

        ID: repository.ID,

        RepositoryName: repository.Name,


      });




    }
    this.rowDataRepo = rowData;


  }




  toggleName(): void {

    this._showName = !this._showName;
    if (this._showName == true) {

      this.fillRepoGrid();
      this.getAllRepoIDs();
    }
    else {
      this.fillRepoGrid();
    }
  }

  public showModal(): void {
    localStorage.removeItem("sun");
    localStorage.removeItem('rankInput');
    localStorage.removeItem("mdl");
    localStorage.removeItem("all");
    localStorage.removeItem("fourBoxInput");
    localStorage.removeItem("CDFarr");
    localStorage.removeItem("corr");
    localStorage.removeItem("arr");
    localStorage.removeItem("con");
    localStorage.removeItem("Parr");
    localStorage.removeItem("mapp");
    localStorage.removeItem("output");
    localStorage.removeItem("Sarr");
    localStorage.removeItem("val");
    localStorage.removeItem("arrInf");
    localStorage.removeItem("semanticInput");
    localStorage.removeItem("Barr");
    localStorage.removeItem("LstCon");
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();

    let userId = +localStorage.getItem('UserID');
    let projectId = +localStorage.getItem('PROJECTID');

    this.hostService.getFirstHost().subscribe((res) => {

      if (res) {
        this._groupMgtService.getAccess(userId, projectId, res.Address).subscribe(ret => {
          if (ret) {

            localStorage.setItem('AccessType', ret);
            this.router.navigate(['/as-catalog']);
          }

        });
      }
    });



  }


  public onHidden(): void {
    this.isModalShown = false;

  }

  public onHiddenPublish(): void {
    this.isModalShownPublish = false;

  }


  public showModal1(): void {
    this.isModalShown1 = true;
  }

  public hideModal1(): void {
    this.autoShownModal.hide();
  }

  public onHidden1(): void {
    this.isModalShown1 = false;

  }

  showStaticModal() {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Create Project';
    activeModal.componentInstance.modalContent = `<div class="col-sm-4 input-group-border-only">
                <input class="form-control form-control-wizly searchbar" id="inputSearch" placeholder="Search" type="text" 
                       [(ngModel)]="quickFilterTxt" (ngModelChange)="onFilterChange()">
              </div>`;
  }



  public showProjectModal(): void {

    this.isModalShownProject = true;
    setTimeout(() => {
      document.getElementById('nameprj').focus();
    }, 500);
  }

  public hideProjectModal(): void {
    //this.autoShownModal.hide();
    this.ProjectNameTxt = "";

  }

  public onProjectHidden(): void {
    this.isModalShownProject = false;

  }

  inputNameFocus() {


  }



  public showModalInf(): void {
    this.isModalShownInf = true;
    setTimeout(() => {
      document.getElementById("okbtnID").focus();
    }, 500);

  }

  public onHiddenInf(): void {
    this.isModalShownInf = false;
  }


  public hideModalInf(): void {
    this.autoShownModal.hide();
    this.router.navigate(['/as-catalog']);
  }

  public hideModalInfPublish(): void {
    this.isModalShownInfPublish = false;
  }



  public showModalInf1(): void {
    this.isModalShownCreated = true;
    setTimeout(() => {
      document.getElementById('successbtn').focus();
    }, 500);

  }

  public onHiddenInf1(): void {
    this.isModalShownCreated = false;

  }


  public hideModalInf1(): void {
    //this.chk();
    this.autoShownModal.hide();

    var check = localStorage.getItem("newProjectCreate");
    if (check === "true") {

      let userId = +localStorage.getItem('UserID');
      let projectId = +localStorage.getItem('PROJECTID');

      this.hostService.getFirstHost().subscribe((res) => {

        if (res) {
          this._groupMgtService.getAccess(userId, projectId, res.Address).subscribe(ret => {
            if (ret) {

              localStorage.setItem("newProjectCreate", "false");
              localStorage.setItem('AccessType', ret);
              this.router.navigate(['/as-catalog']);
            }

          });
        }
      });


    }

  }




  public showModalInf2(): void {
    this.isModalShownSaved = true;

    setTimeout(() => {
      document.getElementById('success1').focus();
    }, 500);

  }

  public onHiddenInf2(): void {
    this.isModalShownSaved = false;

  }


  public hideModalInf2(): void {
    this.autoShownModal.hide();
  }



  public showModalInf3(): void {
    this.isModalShownDelete = true;//success2
    setTimeout(() => {
      document.getElementById('success2').focus();
    }, 500);
  }

  public onHiddenInf3(): void {
    this.isModalShownDelete = false;

  }


  public hideModalInf3(): void {
    this.autoShownModal.hide();
  }


  public showModalInf4(): void {
    this.isModalDeleteConfirmation = true;


  }

  public onHiddenInf4(): void {
    this.isModalDeleteConfirmation = false;

  }


  public hideModalInf4(): void {
    this.autoShownModal.hide();

  }



  public showModalInf5(): void {
    this.isModalImport = true;


  }

  public onHiddenInf5(): void {
    this.isModalImport = false;

  }


  public hideModalInf5(): void {
    this.autoShownModal.hide();
  }



  public showModalInf6(): void {
    this.isModalImportError = true;


  }

  public onHiddenInf6(): void {
    this.isModalImportError = false;
  }


  public hideModalInf6(): void {
    this.autoShownModal.hide();
  }


  public showmodalblank(): void {
    this.blankmodal = true;



  }

  public onHiddenblank(): void {
    this.blankmodal = false;


  }


  public hideModalblank(): void {

    this.autoShownModal.hide();
    this.showProjectModal();

  }






  public showmodalsamename(): void {
    this.samenamemodal = true;
    setTimeout(() => {
      document.getElementById('s1').focus();
    }, 500);



  }

  public onHiddensamename(): void {

    this.samenamemodal = false;
    if (this.flag === true) {
      this.showProjectModal();
    }
    this.flag = false;

  }


  public hideModalsamename(): void {
    this.autoShownModal.hide();
  }


  public showmodalprjExport(): void {

    var projId = localStorage.getItem("projectId");
    if (projId === "" || projId === null) {
      this.ExportPrjshowModal();
    }
    else {
      this._showName = false;
      this.getDiagram();
      this.fillRepoGrid();
      this.rowDataRepoIDs = [];
      this.isModalPrjExport = true;
    }
  }

  public onHiddenprjExport(): void {

    this.isModalPrjExport = false;

  }


  public hideModalprjExport(): void {
    //this.rowDataRepoIDs=[];
    this.autoShownModal.hide();

  }


  public ExportPrjshowModal(): void {
    this.isModalPrjSelect = true;
    setTimeout(() => {
      document.getElementById('mdbtn1').focus();
    }, 500);


  }

  public ExportPrjhideModal(): void {
    this.autoShownModal.hide();
    this.showmodalprjExport();

  }

  public ExportPrjonHidden(): void {
    this.isModalPrjSelect = false;

  }



  public ExportTypeshowModal(): void {
    this.isModalTypeSelect = true;


  }

  public ExportTypehideModal(): void {
    this.autoShownModal.hide();
    this.showmodalprjExport();

  }

  public ExportTypeonHidden(): void {
    this.isModalTypeSelect = false;

  }

  public RepoalertshowModal(): void {
    this.isModalrepoalert = true;


  }

  public RepoalerthideModal(): void {
    this.autoShownModal.hide();
    this.showmodalprjExport();

  }

  public RepoalertonHidden(): void {
    this.isModalrepoalert = false;

  }

  public blankprjnameshowModal(): void {
    this.blankprjname = true;


  }

  public blankprjnamehideModal(): void {
    this.autoShownModal.hide();


  }

  public blankprjnameonHidden(): void {
    this.blankprjname = false;
    // this.SaveconfirmationshowModal();
  }
  //onHiddenSaveconfirmation

  callmodel() {
    this.SaveconfirmationshowModal();
  }

  GotoonSaveChanges(): void {
    this.SaveconfirmationhideModal();
    this.onSaveChanges();

  }


  public SaveconfirmationshowModal(): void {
    this.Saveconfirmation = true;


  }

  public SaveconfirmationhideModal(): void {
    this.autoShownModal.hide();


  }

  public onHiddenSaveconfirmation(): void {
    this.Saveconfirmation = false;

  }

  public showModalImportModel(): void {
    var projId = localStorage.getItem("projectId");
    if (projId === "" || projId === null) {
      this.ExportPrjshowModal();
    }
    else {
      this.ModalImportModel = true;
      this.mdlStatusText1 = "";
      this.RepoId = undefined;
      this.SubjectAreaId = undefined;
    }


  }

  public onHiddenModalImportModel(): void {
    this.ModalImportModel = false;

  }

  public changeRowColor(params) {


    if (params.node.childIndex % 2 !== 0) {
      return { 'background-color': '#dae4ec !important;' };

    }

  }

  public getheight(params) {

    if (params.data.Name.length < 48) {
      return 50;
    }
    else if (params.data.Name.length <= 96 && params.data.Name.length >= 48) {
      return 60;
    }
    else if (params.data.Name.length <= 144 && params.data.Name.length > 96) {
      return 80;
    }
    else {
      return 90;
    }
  }

  sizeToFit(): void {

    setTimeout(() => {
      this.gridOptions.api.sizeColumnsToFit();
    }, 500);

  }

  sizeToFit1(): void {

    this.gridOptionsPublish.api.sizeColumnsToFit();


  }

  callfunction() {

  }
  GoToModalHidden(): void {
    this.isModalGotoCatalog = false;
  }

  GoToModalHide() {
    this.isModalGotoCatalog = false;
    this.router.navigate(['/as-catalog']);
  }

  DeleteHidden() {
    this.isModalDeleteError = false;

  }

  RepoModalHide() {
    this.isModalRepoSelect = false;
  }

  action(value: boolean) {
    this.isModalShown1 = false;

    this.subject.next(value);
    this.subject.complete();
  }

  HideAccess() {
    this.isNoAccess = false;
  }

  HideAccess1() {
    this.isNoAccess1 = false;
  }

  dateComparator(date1, date2) {
    debugger;
    var date1Number = this.monthToComparableNumber(date1);
    var date2Number = this.monthToComparableNumber(date2);

    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }

    return date1Number - date2Number;
  }

  // eg 29/08/2004 gets converted to 20040829
  monthToComparableNumber(date) {

    var chk = date.split(" ");


    var yearNumber = chk[2];
    var monthNumber = chk[1];
    if (chk[1] == "January") {
      monthNumber = "1";
    }
    else if (chk[1] == "February") {
      monthNumber = "2";
    }
    else if (chk[1] == "March") {
      monthNumber = "3";
    }
    else if (chk[1] == "April") {
      monthNumber = "4";
    }
    else if (chk[1] == "May") {
      monthNumber = "5";
    }
    else if (chk[1] == "June") {
      monthNumber = "6";
    }
    else if (chk[1] == "July") {
      monthNumber = "7";
    }
    else if (chk[1] == "August") {
      monthNumber = "8";
    }
    else if (chk[1] == "September") {
      monthNumber = "9";
    }
    else if (chk[1] == "October") {
      monthNumber = "10";
    }
    else if (chk[1] == "November") {
      monthNumber = "11";
    }
    else if (chk[1] == "December") {
      monthNumber = "12";
    }


    var dayNumber = chk[0];

    var result = (yearNumber * 10000) + (monthNumber * 100) + dayNumber;
    return result;
  }


  hideImport() {
    this.isCancel = true;

  }

  ShowImport() {
    this.isProjectImportModal = true;
  }

  Test4() {

  }

  HideCancel() {
    this.isCancel = false;
  }

  YesCancel() {
    this.isCancel = false;
    this.isProjectImportModal = false;
  }
}

