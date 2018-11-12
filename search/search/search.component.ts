import {
  Component, OnInit, AfterViewInit, ViewChild,
  OnDestroy, AfterViewChecked, HostListener
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { UserService } from '../../../@core/data/users.service';
//import { BaseSharedComponent } from '../../../pages/wizly-analytics/shared/base/base-shared.component';

import { BaseSharedComponent } from '../../../../pages/wizly-analytics/shared/base/base-shared.component';

import { GridOptions, RowNode } from "ag-grid";
import { SearchObjectService } from './shared/services/searchobject.service';
//import { SearchObject } from './shared/models/SearchObject';
import { SearchObject } from '../../shared/models/SearchObject';
@Component({
  selector: 'search-components',
  templateUrl: './search.component.html',
  //styleUrls: ['./myprocesses.component.scss'],
  providers: [SearchObjectService]
})

export class SearchComponent1 extends BaseSharedComponent {

  id: any;
  columnDefs: any[];
  rowData: any[];
  gridOptions: GridOptions;
  //router: any;
  search: any;
  mark:any;
  marketing: string = '';
  //strg : string = "";
  public strg: string = "this.baseSession().strg";
  public modelid: string = "this.baseSession().modelid";
  sessionparameter: string;
  public objectid: string = "0";
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private SearchObjectService: SearchObjectService) {
    super();
  }
  open1() {
    var ob = new SearchObject();
    debugger;
    ob.username = this.baseSession().userId; //demo
    ob.password = this.baseSession().password;   //qpr
    ob.query ="PG."+this.baseSession().modelid;
    ob.name = ""; 
   //ob.id = this.baseSession().password;
   ob.id="";
   ob.typename="";
   ob.description="";
   ob.strg=this.baseSession().strg;

   this.baseSession().strg = this.marketing;// for searching
 
    this.SearchObjectService.getCustomAttributes(ob.username,ob.password,ob.query,this.baseSession().webservice,ob.strg,this.baseSession().apiurl).then((res)=> {
     debugger;
      this.rowData = res;   
debugger;
//this.baseSession().strg = quickfiltertxt;

  //this.strg= this.search;
     

     this.id.subscribe((value)  =>  {
      if (value) {
        debugger;
        var ids = value.split(".");//here u will get the selected ID
        debugger;
        this.modelid = ids[1];
        this.objectid = ids[2];
        debugger;
        var url = this.baseSession().url
        this.gridOptions.getRowNodeId = function(data) {
          return data.id;
      };
        //this.setIFrameURL();
      }
    })
     
    }
 
      //this.router.navigate(['/pages/wizly-analytics/search']);
  )
 
  }



  ngOnInit() {

   
  
   // this.search;
   //this.open1();
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
    this.rowData = this.search;
    debugger;

    //this.sizeToFitColumns(1);
  }
  onSelectionChanged(event: any) {
    debugger;
    let rowsSelection = this.gridOptions.api.getSelectedRows();
    console.log(rowsSelection);
   // var rowNode = api.getRowNode('1');
    this.id = rowsSelection[0].id;//you need to breadk the id to your formant modelid-o
   
    
      if (this.id) {
        debugger;
        var ids = this.id.split(".");//here u will get the selected ID
        debugger;
        this.modelid = ids[1];
        debugger;
        this.objectid = ids[2];
        
        debugger;
       this.router.navigate(['/pages/demo/'+this.modelid+'-'+this.objectid]);
      
       debugger;
    
  }
  
}


}

2