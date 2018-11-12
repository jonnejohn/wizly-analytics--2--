
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser'; 

@Component({
  selector: 'new-demomodal',
  templateUrl: './new-demosearch.component.html',
})
export class NewDemoSearchModalComponent implements OnInit {
 

  @Input() quickFilter:string;
  @Output() name = new EventEmitter();


  link:SafeUrl=null; 
  projectName: string;
  search: string;
  constructor(private activeModal: NgbActiveModal,private sanitizer: DomSanitizer , private toasterService: ToasterService) { }

  ngOnInit(){
    debugger;

    //commit
    //this.search = "http://vishal/QPR2017-1/Portal/QPR.Isapi.dll?QPRPORTAL&*prsev&SES=&FMT=p&TXT="+this.quickFilter+"&LAN=en%2c1&PGPLUGIN=1&TYPESPGPLUGIN=011110111&TYPESSCPLUGIN=000&TYPESQPRPORTAL=&QPRPortal=&SCPlugin=&AllDiagramsOnly=1&CurrentModelsOnly=1&SELMODELS=PGPLUGIN%3D%26SCPLUGIN%3D"
    //this.link=this.sanitizer.bypassSecurityTrustResourceUrl(this.search); 
      }
  closeModal() {
    this.activeModal.close();
  }
  //this.quickFilterTxtRepo = quickFilterTxt;
  // modalRef.componentInstance.quickFilterTxt = quickFilterTxt;
  passDataBack(){
    if(this.projectName && this.projectName.trim() != ''){
      this.name.emit(this.projectName.trim());
      this.activeModal.close();
    }
    else{

      this.projectName = '';
      
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Enter a valid name',
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
    }
    
  }

 


}
