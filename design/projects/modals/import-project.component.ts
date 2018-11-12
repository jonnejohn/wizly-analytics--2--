import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'import-project-modal',
  templateUrl: './import-project.component.html',
})
export class ImportProjectModalComponent {

  constructor(private activeModal: NgbActiveModal, private toasterService: ToasterService) { }

  closeModal() {
    this.activeModal.close();
  }
  
  closeModalToast(){
    const toast: Toast = {
      type: 'info',
      title: 'Import in progress',
      body: '',
      timeout: 0,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);

    this.activeModal.close();
  }
}
