import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import  {  DomSanitizer, SafeUrl  }  from  '@angular/platform-browser';
import { BaseSharedComponent } from '../../../../pages/wizly-analytics/shared/base/base-shared.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
declare  var  $:  any;

@Component({
  selector: 'new-viewmodal',
  templateUrl: './new-view.component.html',
})
export class NewViewModalComponent extends BaseSharedComponent implements OnInit {

  handleError: any;
  @Input() modelid: string;
  @Input() objectid: string;
  @Input() view_id: string;

  @Output() name = new EventEmitter();

  frameview: any;
  url: string = this.baseSession().url;
  link: SafeUrl = null;
  sessionparameter: string;
  //setIFrameURL:any;
  projectName: string;
  iframeurl: any;
  result: any;
  var: any;
  this: any;
  i: any;
  // url:this.url;

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private activeModal: NgbActiveModal, private  sanitizer:  DomSanitizer, private toasterService: ToasterService) {
    super();
  }


  ngOnInit() {
    debugger;
    this.viewload();
    // this.setIFrameURL();
  }


  //For View Button
  viewload() {
    debugger;
    console.log("viewload");
    console.log(this.modelid);
    debugger;
    //this.baseSession().view_id.empty();
    //$("#view_menu_link").empty();
   // $.ajax({
    var url = this.url + "?PGPLUGIN&*44&uip=" + this.baseSession().uip + "&FMT=p&tpl=popup_viewsettings.tpl&LAN=en%2c1&MODELID=" + this.modelid + "&OBJECTID=" + this.objectid + "&ZOOM=&VIE=" + this.baseSession().view_id + "&SMI=&PERIOD=latestforall";
    //url: "../" + config['url_initial'] + "/Portal/QPR.Isapi.dll?PGPLUGIN&*44&SES=" + sessionStorage.getItem("SES") + "&FMT=p&tpl=popup_viewsettings.tpl&LAN=en%2c1&MODELID=" + config["model_id"] + "&OBJECTID=" + config['current_obj_id'] + "&ZOOM=&VIE=" + config["current_view"] + "&SMI=&PERIOD=latestforall", success: function (result) {
    //result = result("this.baseSession().view_id");
    //this.result = $(this.result).find("this.baseSession().view_id").children();

  //});
    // this.http.get(this.url)
    //   .toPromise()
    //   .then(response  =>  response.json()  as  string[])
    //   .catch(this.handleError);


    //   .subscribe((data: url) => this.url = {
    //     //heroesUrl: data['url'],
    //     //textfile:  data['textfile']
    // });

  }

  ngAfterViewInit() {
    debugger;
    $("body").on("click", ".viewclass", function () {
      debugger;
      var text = $(this).attr('value');
      $("#view_id").toggle();
    })


  }

}









