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
import { NewDemoSearchModalComponent } from './modals/new-demosearch.component';
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
import { SearchObject } from '../shared/models/SearchObject';
//import { SearchObjectService } from '../../../../shared/services/searchobject.service';
@Component({
  selector: 'page-projects',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  providers: [ModelImportService, QPRQueryObjectService, QPRService, MyProcessObjectService, OrganizationUnitObjectService]
})


export class DemoComponent extends BaseSharedComponent {

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
  public search: any;
  //view_id :any;
  public view_id: string = this.baseSession().view_id;

  b: MergeObject[];
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];


  constructor(private activatedRoute: ActivatedRoute, private qprService: QPRService, private qprqueryObjectService: QPRQueryObjectService, private OrganizationUnitObjectService: OrganizationUnitObjectService, private MyProcessObjectService: MyProcessObjectService, private  sanitizer:  DomSanitizer, private ModelImportService: ModelImportService, private userService: UserService, private customModalService: NgbModal) {



    super();
  }

  //For search Function
  open() {
    debugger;
    //const modalRef = this.customModalService.open(NewDemoSearchModalComponent);
    //modalRef.componentInstance.quickFilter = this.quickFilterTxt;

  }
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

        if (value) {



          debugger;
          var ids = value.split(".");//here u will get the selected ID
          this.modelid = ids[1];
          this.objectid = ids[2];

          debugger;
          var url = this.baseSession().url
          this.modelid = this.baseSession().modelid;


          this.setIFrameURL();
        }
      })
    }
    )

  }

  processview() {
    debugger;


    var obj = new MyProcessObject();
    //  b= new merge();
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
    //var b= new this.merge;
    //this.qprqueryObjectService.postQPRQueryObject(obj,"http://localhost:62377/").subscribe((res)=> 
    this.MyProcessObjectService.getCustomAttributes(obj.username, obj.password, obj.query, this.baseSession().webservice, this.baseSession().apiurl).then((res) => {
      // this.b=res;
      debugger;
      console.log('Demo Data>>>>>>>' + res);
      debugger;
      this.heirarchyData = res;
      debugger;
      const modalRef = this.customModalService.open(NewProcessModalComponent);

      modalRef.componentInstance.heirarchyData = this.heirarchyData;
      //modalRef.componentInstance.b = this.b;
      debugger;
      modalRef.componentInstance.ID.subscribe((value)  =>  {
        debugger;

        if (value) {



          debugger;
          var ids = value.split(".");//here u will get the selected ID
          this.modelid = ids[1];
          this.objectid = ids[2];

          debugger;
          var url = this.baseSession().url
          this.modelid = this.baseSession().modelid;


          this.setIFrameURL();
        }
      })
    }
    )
    var objc = new OrganizationUnitObject();
    //  b= new merge();
    debugger;
    console.log(this.baseSession());
    objc.username = this.baseSession().userId; //demo
    objc.password = this.baseSession().password;   //qpr
    //obj.attributes = "name,typename";
    objc.sortby = "name";
    objc.criteria = "";
    objc.options = "";
    objc.query = "PG." + this.baseSession().modelid;
    console.log(objc);
    //var b= new this.merge;
    //this.qprqueryObjectService.postQPRQueryObject(obj,"http://localhost:62377/").subscribe((res)=> 
    this.OrganizationUnitObjectService.getCustomAttributes(objc.username, objc.password, objc.query, this.baseSession().webservice, this.baseSession().apiurl).then((resa) => {
      // this.b=res;
      debugger;
      console.log('Demo Data>>>>>>>' + resa);
      debugger;
      this.heirarchyDat = resa;
      debugger;
      const modalRef = this.customModalService.open(NewProcessModalComponent);

      modalRef.componentInstance.heirarchyDat = this.heirarchyDat;
      //modalRef.componentInstance.b = this.b;
      debugger;
      modalRef.componentInstance.ID.subscribe((value)  =>  {
        debugger;

        if (value) {



          debugger;
          var ids = value.split(".");//here u will get the selected ID
          debugger;
          this.modelid = ids[1];
          debugger;
          this.objectid = ids[2];

         debugger;
          var url = this.baseSession().url
          this.modelid = this.baseSession().modelid;


          this.setIFrameURL();
        }
      })
    }
    )

  }


  ngOnInit() {
    debugger;
    this.activatedRoute.params.subscribe((params: Params) => {
      debugger;
      var str = params['id'];
      debugger;
      var ids = str.split("-");
      debugger;
      this.modelid = ids[0];
      debugger;
      this.objectid = ids[1];
      debugger;
      this.setIFrameURL();
    });

  }
  setIFrameURL() {
    console.log(this.baseSession());

    this.iframeurl = this.url + "?PGPLUGIN&*10&uip=" + this.baseSession().uip + "&FMT=p&LAN=en%2c1&MODELID=" + this.modelid + "&OBJECTID=" + this.objectid + "&SMI=&PERIOD=latestforall&ZOOM=fs&VIE=" + this.baseSession().view_id + "&DEP=1";
    // http://localhost/QPR2017-1/Portal/QPR.Isapi.dll?    PGPLUGIN&*10     &FMT=p&LAN=en%2c1&MODELID=655625500&OBJECTID=45&ZOOM=fs&VIE=0&SMI=&DPMODE=0
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeurl);

  }
}
