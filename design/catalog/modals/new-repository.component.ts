import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'new-repository-modal',
  templateUrl: './new-project.component.html',
})
export class NewRepositoryModalComponent {

  @Output() name = new EventEmitter();

  projectName: string;

  constructor(private activeModal: NgbActiveModal, private toasterService: ToasterService) { }

  closeModal() {
    this.activeModal.close();
  }

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
