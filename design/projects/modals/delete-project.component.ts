import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'delete-project-modal',
  templateUrl: './delete-project.component.html',
})
export class DeleteProjectModalComponent {

  @Output() isDelete = new EventEmitter();

  @Input() projectName: string;

  constructor(private activeModal: NgbActiveModal, private toasterService: ToasterService) { }

  closeModal() {
    this.activeModal.close();
  }

  passDataBack() {
    this.isDelete.emit(true);
    this.activeModal.close();
  }
}
