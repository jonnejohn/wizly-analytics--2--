import { Component,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser'; 
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MergeObject } from '../../shared/models/MergeObject';
import { MyProcessObject } from '../../shared/models/MyProcessObject';
import { OrganizationUnitObject } from '../../shared/models/OrganizationUnitObject';


@Component({
  selector: 'new-process-modal',
  templateUrl: './new-process.component.html',
  styles:[`.selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    // background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }`]
})
export class NewProcessModalComponent {


  nodes: any[];
  //node: any[];
  nodesHolder: any[];
  nodeID: number;
  @Input() heirarchyData:string[];
  @Input() heirarchyDat:string[];
  //@Input() b:MergeObject[];
  @Output() ID = new EventEmitter();
  options: any = {
    isExpandedField: 'expanded',
    useVirtualScroll: true,
    nodeHeight: 25
  };

  //link:SafeUrl=null; 

  projectName: string;
  //@ViewChild('iframe') iframe: ElementRef;

  doc: any;
  iframe
  hierarchy
  link
  
  constructor(private activeModal: NgbActiveModal,private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer , private toasterService: ToasterService) { }

  event(){
    //nodeid
    //nodeid.emit
  }
       
treeClick(event)
{
  debugger;
  
  this.ID.emit(event.node.data.id);
  
  this.activeModal.close(); //To Close the Modal

}  
  closeModal() {
    this.activeModal.close();
  }

  
  ngOnInit(){
    debugger;
    this.heirarchyData;
    this.heirarchyDat;
    //this.b;
    console.clear();
    //console.log(this.heirarchyData);
    // this.hierarchy = "http://vishal/QPR2017-1/Portal/QPR.Isapi.dll?QPRPORTAL&*prsev&SES=&FMT=p&TXT="+this.objectid+"&LAN=en%2c1&PGPLUGIN=1&TYPESPGPLUGIN=011110111&TYPESSCPLUGIN=000&TYPESQPRPORTAL=&QPRPortal=&SCPlugin=&AllDiagramsOnly=1&CurrentModelsOnly=1&SELMODELS=PGPLUGIN%3D%26SCPLUGIN%3D"
    // this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.hierarchy); 
    
   
    this.nodes = [];
    this.nodes=this.heirarchyData;
    console.log("name is name the");
    //this.node = [];
    //this.node=this.heirarchyDat;
    //this.nodes=this.b;
    // alert();
    return;
       
      }
    }
      
 
  
    

  

