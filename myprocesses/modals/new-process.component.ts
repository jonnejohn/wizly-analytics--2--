import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TreeModel, NodeEvent } from 'ng2-tree';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MergeObject } from '../../shared/models/MergeObject';
import { SelectedPreferencesObject } from '../../shared/models/SelectedPreferncesObject';
import { SelectedObject } from '../../shared/models/SelectedObject';
import { ITreeOptions, IActionMapping } from 'angular-tree-component';
//import { Component } from '@angular/core';
import { TreeviewItem, TreeviewConfig, DownlineTreeviewItem, TreeviewEventParser, OrderDownlineTreeviewEventParser } from "ngx-treeview/src";
import { BaseSharedComponent } from '../../../../pages/wizly-analytics/shared/base/base-shared.component';
import { PreferencesObject } from '../../shared/models/PreferencesObject';
import { SelectedPreferenceService } from '../shared/services/SelectedPreference.service';


@Component({
  selector: 'new-process-modal',
  templateUrl: './new-process.component.html',
  providers: [SelectedPreferenceService]
  // styles: [`.selected {
  //   background-color: #CFD8DC !important;
  //   color: white;
  // }
  // .heroes {
  //   margin: 0 0 2em 0;
  //   list-style-type: none;
  //   padding: 0;
  //   width: 15em;
  // }
  // .heroes li {
  //   cursor: pointer;
  //   position: relative;
  //   left: 0;
  //   // background-color: #EEE;
  //   margin: .5em;
  //   padding: .3em 0;
  //   height: 1.6em;
  //   border-radius: 4px;
  // }
  // .heroes li.selected:hover {
  //   background-color: #BBD8DC !important;
  //   color: white;
  // }
  // .heroes li:hover {
  //   color: #607D8B;
  //   background-color: #DDD;
  //   left: .1em;
  // }
  // .heroes .text {
  //   position: relative;
  //   top: -3px;
  // }
  // .heroes .badge {
  //   display: inline-block;
  //   font-size: small;
  //   color: white;
  //   padding: 0.8em 0.7em 0 0.7em;
  //   background-color: #607D8B;
  //   line-height: 1em;
  //   position: relative;
  //   left: -1px;
  //   top: -4px;
  //   height: 1.8em;
  //   margin-right: .8em;
  //   border-radius: 4px 0 0 4px;
  // }`]
})


@Injectable()
export class NewProcessModalComponent extends BaseSharedComponent {
  //SelectedPreferenceService: any;
  x: SelectedPreferencesObject[];
  y: SelectedObject[];
  nodesss: SelectedPreferencesObject[];
  nodesc: SelectedObject[];
//public node:any;
  //public var name = event.node.data;
  //selectednode: any;
  //selectedTreeList: string[];
  //   getSelectedChange(): any[] {
  //     const checkedItems = checkedItems;
  //     if (!_.isNil(checkedItems)) {
  //         return checkedItems.map(item => item.value);
  //     }

  //     return [];
  // }
  //}

  //@Input() treeData: any[];
  //@Input() hasCheckbox: boolean = false;
  //@Input() hasActions: boolean = false;
  //@Output() edit = new EventEmitter();
  //@Output() delete = new EventEmitter();
  //@Output() selected = new EventEmitter();
  //x= new SelectedPreferencesObject();
  //resArray: any = [];
  //push:any[];
  //orgArray: any = [];
  //charAt: any = [];
  order: any;
  display: any[];
  i: any;
  k:any;
  nodes: any[];
public node: any[];
dataforrowdata:any[];

  itemsAttr: TreeviewItem[] = [];
  nodesHolder: any[];
  nodeID: number;
  marketing: string = '';
  config: any;
 // public node:any;
  //this.baseSession().strg = this.marketing;
  //ob.strg=this.baseSession().strg;
  //actionMapping : any;
  @Input() heirarchyData: string[];
  @Input() heirarchyDat: any[];
  //@Input() b:MergeObject[];
  @Output() ID = new EventEmitter();
  @Output() ID1 = new EventEmitter();
  //options: any = {
  //actionMapping: this.actionMapping,
  //isExpandedField: 'expanded',
  //useVirtualScroll: true,
  //nodeHeight: 25,
  //useCheckbox: true,
  //optionsChecked : false

  //options: ITreeOptions = {
  //actionMapping: this.actionMapping
  //};
  //};

  onFilterChange(): void {
    //this.gridOptions.api.setQuickFilter(this.marketing);
    // this.nodes.filterNodes("text", true);
  }

  options: ITreeOptions = {
    useCheckbox: true
  };

  optionsDisabled: ITreeOptions = {
    useCheckbox: true,
    useTriState: false
  };


  //link:SafeUrl=null; 

  projectName: string;
  //@ViewChild('iframe') iframe: ElementRef;

  doc: any;
  iframe
  hierarchy
  link
  SelectedIDs: any;
  constructor( private SelectedPreferenceService : SelectedPreferenceService,private activeModal: NgbActiveModal, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private toasterService: ToasterService) {
    super();
    //this.SelectedIDs = [];
  }




  //   toggleChildren(node: any) {
  //     node.visible = !node.visible;
  // }

  // editCategory(category){
  //     this.edit.emit(category);
  // }

  // deleteCategory(category) {
  //     this.delete.emit(category);
  // }

  // selectedCategory(category, event) {
  //     this.selected.emit({category, event});
  // }

  event() {
    //nodeid
    //nodeid.emit
  }
  

  onSelectedChange1(e) {
    debugger;
    //if(e.id.emit.checked){ 
    this.ID.emit(e.node.data.id);

    //}
  }

  //   onSelectedChange(params: DownlineTreeviewItem[]): void {

  //     this.SelectedIDs = [];
  //     for (var j = 0; j < params.length; j++) {
  //         this.SelectedIDs.push(params[j]);
  //     }
  //     var test = this.SelectedIDs;
  // }


  // onSelectedChange1(params: DownlineTreeviewItem[]): void {

  //   this.SelectedIDs = [];
  //   for (var j = 0; j < params.length; j++) {
  //       this.SelectedIDs.push(params[j]);
  //   }
  //   var test = this.SelectedIDs;
  // }




  treeClick(event) {


    this.ID.emit(event.node.data.id);

    this.activeModal.close(); //To Close the Modal
  }
  // treeClick(event)
  // {
  //   

  //   this.ID.emit(event.node.data.id);
  //   
  //   this.activeModal.close(); //To Close the Modal

  // }  
  treeClick1(event) {


    this.ID1.emit(event.node.data.id);

    this.activeModal.close(); //To Close the Modal

  }
  closeModal() {
    this.activeModal.close();
  }


  ngOnInit() {
   
    this.nodesss = [];
    this.nodesc = [];
    // this.config = {
    //   hasAllCheckBox: false,
    //   hasFilter: false,
    //   hasCollapseExpand: false,
    //   hasDivider: false,
    //   maxHeight: 500
    // };


    this.heirarchyData;
    this.heirarchyDat;
    //this.b;
    //console.clear();
    //console.log(this.heirarchyData);
    // this.hierarchy = "http://vishal/QPR2017-1/Portal/QPR.Isapi.dll?QPRPORTAL&*prsev&SES=&FMT=p&TXT="+this.objectid+"&LAN=en%2c1&PGPLUGIN=1&TYPESPGPLUGIN=011110111&TYPESSCPLUGIN=000&TYPESQPRPORTAL=&QPRPortal=&SCPlugin=&AllDiagramsOnly=1&CurrentModelsOnly=1&SELMODELS=PGPLUGIN%3D%26SCPLUGIN%3D"
    // this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.hierarchy); 
    this.nodes = [];
    this.nodes = this.heirarchyData;
    //this.nodes=this.b;
    // alert();

    // this.display = [];
    // this.display=this.heirarchyDat;
    this.display = [];
    this.display = this.heirarchyDat;
    return;

  }


  //   initview() {
  //     for (var x = 0; x<this.order.display.length; x++) {
  //         this.heirarchyDat[this.nodes[x]] = true;
  //     }
  // }
  // handleSelected(option, event) {
  //   this.heirarchyDat[option] = event.target.checked;
  // }
  //  selectedCategory(category, event) {
  //   this.selected.emit(event);
  // }
  //for organization tree selection
  onSelect(event) {
    //this.nodesss = [];
     debugger;
    var name = event.node.data;
    this.nodesss.push(name)
debugger;
    // var p = new SelectedPreferencesObject();
    // //this.x =[]; 
    // debugger;
    // if (this.x != undefined || this.x != null) {
    //   for (var i = 0; i < this.x.length; i++) {
    //     debugger;



    //     if (this.x[i] == event.node.data.id) {
    //       debugger;
    //       break;
    //     }
    //     else {
    //       debugger;
    //       p.id = event.node.data.id;
    //       debugger;
    //       p.name = event.node.data.id;
    //       debugger;
    //       this.x.push(p);
    //       debugger;

    //     }


    //   }
    // }

    // else {
    //   this.x = [];
    //   debugger;
    //   p.id = event.node.data.id;
    //   debugger;
    //   p.name = event.node.data.id;
    //   debugger;
    //   this.x.push(p);
    //   debugger;

    // }

  }
  //for resource tree selection
  onSelecte(event) {
    debugger;
    var name = event.node.data;
    this.nodesc.push(name)
    debugger;
    // var n = new SelectedObject();
    // //this.x =[]; 
    // debugger;
    // if (this.y != undefined || this.y != null) {
    //   for (var i = 0; i < this.y.length; i++) {
    //     debugger;


    //     if (this.y[i] == event.node.data.id) {
    //       debugger;
    //       break;
    //     }
    //     else {
    //       debugger;
    //       n.id = event.node.data.id;
    //       debugger;
    //       n.name = event.node.data.id;
    //       debugger;
    //       this.y.push(n);
    //       debugger;
    //     }




    //   }
    // }

    // else {
    //   this.y = [];
    //   debugger;
    //   n.id = event.node.data.id;
    //   debugger;
    //   n.name = event.node.data.id;
    //   debugger;
    //   this.y.push(n);
    //   debugger;

    // }

  }










  selectedprefernce() {
    //   console.log(this.nodes)
    // this.nodes;
    // alert();
    //this.baseSession().strg = this.marketing;
    //this.rowdata=this.x;
    //this.x = [];
    debugger;

  var p = new SelectedPreferencesObject();
p.id="";
p.name="";
p.typename="";
p.description="";
  //public node:any[];
  //node:any[];
  // this.nodesss = [];

  //var  name = this.node;
  
  
    //this.x =[]; 
    debugger;
    if (this.x != undefined || this.x != null) {
      for (var i = 0; i < this.x.length; i++) {
        debugger;



        if (this.x[i].id == this.nodesss[i+1]) {
          debugger;
          break;
        }
        else {
          debugger;
          p.id = this.nodesss[i+1].id;
          debugger;
          p.name = this.nodesss[i+1].name;
          debugger;
          this.x.push(p);
          debugger;

        }


      }
    }

    else {
      this.x = [];
      debugger;
      p.id = this.nodesss[0].id;
      debugger;
      p.name = this.nodesss[0].name;
      debugger;
      this.x.push(p);
      debugger;

    }



    //this.x;
    //debugger;
    //alert();
    //this.y;
    //debugger;
    //this.onSelect;
   var  n = new SelectedObject();
    debugger;
    n.id="";
n.name="";
n.typename="";
n.description="";
    // //this.x =[]; 
     debugger;
    if (this.y != undefined || this.y != null) {
      for (var i = 0; i < this.y.length; i++) {
        debugger;
        if (this.y[i].id == this.nodesc[i+1]) {
          debugger;
          break;
        }
        else {
          debugger;
          n.id = this.nodesc[i+1].id;
          debugger;
          n.name = this.nodesc[i+1].name;
          debugger;
          this.y.push(n);
          debugger;

        }


      }
    }

    else {
      this.y = [];
      debugger;
      n.id = this.nodesc[0].id;
      debugger;
      n.name = this.nodesc[0].name;
      debugger;
      this.y.push(n);
      debugger;

    }

    var obj = new PreferencesObject();
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
  debugger;
    //this.qprqueryObjectService.postQPRQueryObject(obj,"http://localhost:62377/").subscribe((res)=> 
    this.SelectedPreferenceService.getCustomAttributes(obj.username, obj.password, obj.query, this.baseSession().webservice, this.baseSession().apiurl).then((res) => {
      debugger;
      console.log('Demo Data>>>>>>>' + res);
    debugger;
  //this.rowdata = res;
  this.dataforrowdata = res;
  //this.ID.emit(this.rowData);

  }

  



    )}
}
