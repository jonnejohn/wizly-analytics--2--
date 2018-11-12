import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import  {  DomSanitizer, SafeUrl  }  from  '@angular/platform-browser';
import { BaseSharedComponent } from '../../../../pages/wizly-analytics/shared/base/base-shared.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';


@Component({
  selector: 'new-viewmodal',
  templateUrl: './new-view.component.html',
})
export class NewViewModalComponent extends BaseSharedComponent implements OnInit,AfterViewInit {

 // handleError: any;
  @Input() modelid: string;
  @Input() objectid: string;
 // @Input() view_id: string;

  @Output() name = new EventEmitter();

  frameview: any;
  url: string = this.baseSession().url;
  view_id: string = this.baseSession().view_id;
  link: SafeUrl = null;
  sessionparameter: string;
  abc : any;
  //setIFrameURL:any;
  //this.modelid= this.baseSession().modelid;

  projectName: string;
  iframeurl: any;
  result: any;
  var: any;
  handleError: any;
  i: any;
  //declare var $: any; 

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private activeModal: NgbActiveModal, private  sanitizer:  DomSanitizer, private toasterService: ToasterService) {
    super();
  }

  ngOnInit()
  {
    this.viewload();
  }

  


  //For View Button
  myres:any = "";
  viewload() {
    debugger;
    this.modelid = this.baseSession().modelid;
    this.objectid = this.baseSession().objectid;
    var abc = this.url + "?PGPLUGIN&*44&uip=" + this.baseSession().uip + "&FMT=p&tpl=popup_viewsettings.tpl&LAN=en%2c1&MODELID=" + this.modelid + "&OBJECTID=" + this.objectid + "&ZOOM=&VIE=" + this.baseSession().view_id + "&SMI=&PERIOD=latestforall";
//     let headers = new Headers({ 'Content-Type': 'text/html' });
//         let options = new RequestOptions({ headers: headers });
//     this.http
//   .get(url).subscribe(res=> this.myres = res.toString());
//   var result = this.myres.find("#VIE").children();

  //   var zen = this.http.get(abc)
  //  .toPromise()
  //   .then(response  =>  response.json()  as  string[]).subscribe(data => {this.payoutReport = data; console.log(this.payoutReport);});
  //  .catch(this.handleError);

  //var zen = this.http.get(abc)
   //.toPromise()
  //  .then(response  =>  response.json())
  // .catch(this.handleError);
   //return 
   this.http.get(abc)
               .map(response => {
                  
                   return response;
               }); 
   
  //  return this.http.get(_url, options)
  //              .map(response => {
  //                  var responseAsObject = response.json();
  //                  return responseAsObject;
  //              }); 
   
//   this.result = $(this.result).find("#VIE").children();
//   debugger;
//   for (var i = 0; i < this.result.length; i++) {
//       debugger;
//       var isHTMLCreated;
//       var drpview;
//       var liview;

//       if (this.result[i].value == this.view_id)
     
//           $("#view_menu_link").append("<li><a class='viewclass active' id='VIE" + this.result[i].value + "'  value='" + this.result[i].value + "'>" + this.result[i].innerText + "</a></li>");
      
     
//           else
      
//           $("#view_menu_link").append("<li><a class='viewclass' id='VIE" + this.result[i].value + "'  value='" + this.result[i].value + "'>" + this.result[i].innerText + "</a></li>");
// debugger;
//   }



  }  

// private extractData(res: Response) {
//   debugger;
//    let body = res.text();  // If response is a JSON use json()
//    if (body) {
//        return body;
//     } else {
//        return {};
//     }
// }

// private handleError(error: any) {
//    // In a real world app, we might use a remote logging infrastructure
//    // We'd also dig deeper into the error to get a better message
//    let errMsg = (error.message) ? error.message :
//    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//         console.error(errMsg); // log to console instead
//         return "";
//         //return Observable.throw(errMsg);
// }
  ngAfterViewInit() {
this.viewload();
    $("body").on("click", ".viewclass", function () {

      var text = $(this).attr('value');
      $("#view_id").toggle();
    })


  }

}


 