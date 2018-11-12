import {
  Component, OnInit, AfterViewInit, ViewChild,
  OnDestroy, AfterViewChecked, HostListener
} from '@angular/core';
import  {  DomSanitizer, SafeUrl  }  from  '@angular/platform-browser';
import { ModelImportService } from '../shared/services/ModelImport.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NewDemoModalComponent } from './modals/new-demo.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { NewDemoSearchModalComponent } from '../../../modals/new-demosearch.component';
import { UserService } from '../../../@core/data/users.service';
import { QPRQueryObject } from '../shared/models/QPRQueryObject';

import { QPRQueryObjectService } from './shared/services/qprQueryObject.service';
import { BaseSharedComponent } from '../../../pages/wizly-analytics/shared/base/base-shared.component';
import { NewViewModalComponent } from './modals/new-view.component';
import { NewProcessModalComponent } from './modals/new-process.component';
import { QPRService } from '../../../login/qpr.service';
import { MyProcessObject } from '../shared/models/MyProcessObject';
import { OrganizationUnitObject } from '../shared/models/OrganizationUnitObject';
import { OrganizationUnitObjectService } from './shared/services/OrganizationUnit.service';
import { MyProcessObjectService } from './shared/services/myprocess.service';
import { MergeObject } from '../shared/models/MergeObject';
//import { GridOptions } from 'ag-grid';
import { GridOptions, RowNode } from "ag-grid";
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'page-projects',
  templateUrl: './myprocesses.component.html',
  styleUrls: ['./myprocesses.component.scss'],
  providers: [ModelImportService, QPRQueryObjectService, QPRService, MyProcessObjectService, OrganizationUnitObjectService]
})


export class MyProcessesComponent extends BaseSharedComponent {

  x: any[];
  check: any;
  password: string;
  username: any;
  url: string = this.baseSession().url;
  public modelid: string = "this.baseSession().modelid";
  
  sessionparameter: string;
  public objectid: string = "0";
  //public showchild:boolean=false;
  public portalurl: string = this.url + "/QPR2017-1/Portal/QPR.Isapi.dll";
  link: SafeUrl = null;
  nodeID: any;
  // activatedRoute: any;
  quickFilterTxt;
  frameview: any;
  public iframeurl: string;
  public heirarchyData: any;
  public heirarchyDat: any;
  //view_id :any;
  public view_id: string = this.baseSession().view_id;
  columnDefs: any[];
  rowData: any[];
  gridOptions: GridOptions;
  b: MergeObject[];
  // var rowSrc = []; 
  @Input() dataforrowdata:any[];
  @Output() ID = new EventEmitter();
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];


  constructor(private activatedRoute: ActivatedRoute, private qprService: QPRService, private qprqueryObjectService: QPRQueryObjectService, private OrganizationUnitObjectService: OrganizationUnitObjectService, private MyProcessObjectService: MyProcessObjectService, private  sanitizer:  DomSanitizer, private ModelImportService: ModelImportService, private userService: UserService, private customModalService: NgbModal) {



    super();
  }

  //For search Function

  viewload() {
    debugger;
    const modalRef = this.customModalService.open(NewViewModalComponent);
    //      modalRef.componentInstance.modelid=this.modelid;
    //      modalRef.componentInstance.objectid=this.objectid;
    //      modalRef.componentInstance.view_id=this.view_id;



    //     this.getviewload();


    //    }
    //    getviewload(): void {
    //      debugger;
    //      this.qprService.getviewload(this.username, this.password,this.baseSession().apiurl,this.baseSession().webservice,this.baseSession().view_id).then((res) => {
    //  debugger;
    //  console.log(res);  
    //      })
  }




  //For hiererchy tree 
  view() {
    debugger;


    var obj = new QPRQueryObject();
    debugger;
    console.log(this.baseSession());
    obj.username = this.baseSession().userId; //demo
    obj.password = this.baseSession().password;   //qpr
    //obj.attributes = "name,typename";
    obj.sortby = "name";
    obj.criteria = "";
    obj.options = "";
    obj.query = "PG." + this.baseSession().modelid;
    console.log(obj);

    //this.qprqueryObjectService.postQPRQueryObject(obj,"http://localhost:62377/").subscribe((res)=> 
    this.qprqueryObjectService.getCustomAttributes(obj.username, obj.password, obj.query, this.baseSession().webservice, this.baseSession().apiurl).then((res) => {
      debugger;
      console.log('Demo Data>>>>>>>' + res);
      this.heirarchyData = res;
      const modalRef = this.customModalService.open(NewDemoModalComponent);
      modalRef.componentInstance.heirarchyData = this.heirarchyData;
      modalRef.componentInstance.ID.subscribe((value)  =>  {

        // for (var i = 0; i < hierarchy.length; i++) {
        //   var n = this.attr.filter(t => t.ID === node[i].ID)[0];
        //   var j = n.EnumGrpID === 0 ? "" : this.enumGrp.filter(x => x.ID === n.EnumGrpID)[0].Name;
        //   rowSrc.push({
        //   ID: n.ID,
        //   Name: n.Name.trim(),
        //   type: n.DataType,
        //   AG: n.Grp,
        //   Enumid: j,
        //   changed: 0
        //   })
          
        //   }
          
          // this.rowData = rowSrc; 

        if (value) {



          debugger;
          var ids = value.split(".");//here u will get the selected ID
          this.modelid = ids[1];
          this.objectid = ids[2];

          debugger;
          var url = this.baseSession().url
          this.modelid = this.baseSession().modelid;


          // this.setIFrameURL();
        }
      })
    }
    )

  }

  processview() {
   // debugger;


    var obj = new MyProcessObject();
    //  b= new merge();
    //debugger;
    console.log(this.baseSession());
    obj.username = this.baseSession().userId; //demo
    obj.password = this.baseSession().password;   //qpr
    //obj.attributes = "name,typename";
    obj.sortby = "name";
    obj.criteria = "";
    obj.options = "";
    obj.query = "PG." + this.baseSession().modelid;
    obj.name = ""; 
    obj.id="";
    obj.typename="";
    obj.description="";
    console.log(obj);
    //var b= new this.merge;
    //this.qprqueryObjectService.postQPRQueryObject(obj,"http://localhost:62377/").subscribe((res)=> 
    this.MyProcessObjectService.getCustomAttributes(obj.username, obj.password, obj.query, this.baseSession().webservice, this.baseSession().apiurl).then((res) => {
      // this.b=res;
      //debugger;
      console.log('Demo Data>>>>>>>' + res);
     // debugger;

      this.heirarchyData = res;
      //this.rowData = this.heirarchyData;

      //this.rowData = res;
     // debugger;
      // const modalRef = this.customModalService.open(NewProcessModalComponent);

      // modalRef.componentInstance.heirarchyData = this.heirarchyData;
      //modalRef.componentInstance.b = this.b;
      //debugger;
     
    }
    )


    var objc = new OrganizationUnitObject();
//  b= new merge();
//debugger;
console.log(this.baseSession());
objc.username = this.baseSession().userId; //demo
objc.password = this.baseSession().password;   //qpr
//obj.attributes = "name,typename";
objc.sortby = "name";
objc.criteria ="";
objc.options ="";
objc.query ="PG."+this.baseSession().modelid;
objc.name = ""; 
objc.id="";
objc.typename="";
objc.description="";
console.log(objc);
//var b= new this.merge;
//this.qprqueryObjectService.postQPRQueryObject(obj,"http://localhost:62377/").subscribe((res)=> 
this.OrganizationUnitObjectService.getCustomAttributes(objc.username,objc.password,objc.query,this.baseSession().webservice,this.baseSession().apiurl).then((resa)=> 

{
// this.b=res;
//debugger;
console.log('Demo Data>>>>>>>'+resa);
//debugger;
this.heirarchyDat = resa;
//debugger;
//const modalRef = this.customModalService.open(NewProcessModalComponent);
const modalRef = this.customModalService.open(NewProcessModalComponent);

      modalRef.componentInstance.heirarchyData = this.heirarchyData;
modalRef.componentInstance.heirarchyDat = this.heirarchyDat;
//modalRef.componentInstance.b = this.b;
//debugger;
modalRef.componentInstance.ID.subscribe((value) => {
 //debugger;

  if(value){

  
   
   //debugger;
    var ids =value.split(".");//here u will get the selected ID
     this.modelid=ids[1];
      this.objectid=ids[2];
     
      //debugger;
      var url =this.baseSession().url
      this.modelid= this.baseSession().modelid;
      

    // this.setIFrameURL();
   }
})
}
)
    


  }


  ngOnInit() {
    //this.processview();
    //debugger;
    this.dataforrowdata;
    this.activatedRoute.params.subscribe((params: Params) => {
     // debugger;
      var str = params['id'];
      if(str=undefined){

      var ids = str.split("-");
      if(ids=undefined){

      
      this.modelid = ids[0];
      this.objectid = ids[1];
      // this.setIFrameURL();
      }
    }
    });


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
      //getRowHeight: this.getheight,
      stopEditingWhenGridLosesFocus: true
    };



    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        //editable: true,
        filter: "text",
        //newValueHandler: this.NewStringValueHandler.bind(this),
        cellStyle: { "white-space": "normal" },
      },
      {
        headerName: "Name",
        field: "name",
        //editable: true,
        filter: "text",
        //newValueHandler: this.NewStringValueHandler.bind(this),
        cellStyle: { "white-space": "normal" },
      },
      {
        headerName: "Typename",
        field: "typename",
        //editable: true,
        filter: "text",
        //newValueHandler: this.NewStringValueHandler.bind(this),
        cellStyle: { "white-space": "normal" },
      },
      {
        headerName: "Description",
        field: "description",
        //editable: true,
        filter: "text",
        //newValueHandler: this.NewStringValueHandler.bind(this),
        cellStyle: { "white-space": "normal" },
      },

    ];
  }
  fillTable(): void {

    
    debugger;
    //this.rowData = this.check.push;
    this.rowData = this.dataforrowdata;
    //this.ID.emit(this.rowData);
    //this.isDelete.emit(true);
   // this.rowData = this.res;
    debugger;

    //this.sizeToFitColumns(1);
  }
  

  passDataBack() {
    this.ID.emit(this.rowData);
    
  }
  // setIFrameURL() {
  //   console.log(this.baseSession());

  //   this.iframeurl = this.url + "?PGPLUGIN&*10&uip=" + this.baseSession().uip + "&FMT=p&LAN=en%2c1&MODELID=" + this.modelid + "&OBJECTID=" + this.objectid + "&SMI=&PERIOD=latestforall&ZOOM=fs&VIE=" + this.baseSession().view_id + "&DEP=1";
  //   this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeurl);

  // }
}
