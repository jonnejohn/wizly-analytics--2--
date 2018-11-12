import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { CatalogService } from '../../../shared/services/catalog.service';
import { BaseSharedComponent } from '../../../shared/base/base-shared.component';
import { CatalogOutput } from '../../../shared/models/catalog/catalog-output';
import { Category } from '../../../shared/models/catalog/category';
import { SubjectArea } from '../../../shared/models/catalog/subject-area';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'repository-modal',
  templateUrl: './repository.component.html',
  styles: [`
    .height-400 { height:400px; }
  `],
  providers: [CatalogService]
})
export class RepositoryModalComponent extends BaseSharedComponent implements AfterViewInit {
  
  @Output() emitter = new EventEmitter();

  catalogOutput: CatalogOutput;
  nodesHolder: any[];
  edgesHolder: any[];
  treeOptions: any;

  categoryId: number = 0;

  constructor(private catalogSvc: CatalogService,
    private activeModal: NgbActiveModal, private toasterService: ToasterService) {

    super();

  }
  
  ngAfterViewInit(): void {

    this.treeOptions = {
      isExpandedField: 'expanded',
      useVirtualScroll: true,
      nodeHeight: 50
    };
    this.getDiagram();
  }

  onActivate($event): void {
    
    let type = $event.node.data.id.charAt(0);
    if(type == 'c'){
      this.categoryId = +$event.node.data.id.substr(1);
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  passDataBack(){
    if(this.categoryId == 0){
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'Select a category',
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
    }
    else{

      this.emitter.emit(this.categoryId);
      this.activeModal.close();
    }
    
  }

  getDiagram(): void {

    this.catalogSvc.getDiagram(this.baseSession().projectId, this.baseSession().dataApiUrl)
      .subscribe((res) => {
        if (res) {
          this.catalogOutput = res;
          this.createDiagram();

         
        }
      });
  }

  createDiagram(): void {

    this.nodesHolder = [];
    this.edgesHolder = [];

    let nodes: any[] = [];

    for (var i = 0; i < this.catalogOutput.Repositories.length; i++) {

        var repository = this.catalogOutput.Repositories[i];

        var treeNodeObj = {
            expanded: false,
            parentid: 'p' + localStorage.getItem("projectId"),
            id: 'r' + repository.ID,
            name: repository.Name,
            children: this.createSubjectArea(repository.SubjectAreas, 'r' + repository.ID)
        };

        nodes.push(treeNodeObj);
    }

    this.nodesHolder = nodes;
}

  createSubjectArea(subjAreas: SubjectArea[], relatedId: string): any[] {

    var retObj = [];
    for (var i = 0; i < subjAreas.length; i++) {

        var subjArea = subjAreas[i];

        var treeNodeObj = {
            expanded: false,
            parentid: relatedId,
            id: 's' + subjArea.ID,
            name: subjArea.Name,
            children: this.createCategory(subjArea.Categories, 's' + subjArea.ID)
        };

        retObj.push(treeNodeObj);
    }

    return retObj;
}

  createCategory(categories: Category[], relatedId: string, isParent: boolean = true, parentId: string = "c0"): any[] {

    var retObj = [];
    for (var i = 0; i < categories.length; i++) {

        var category = categories[i];

        var treeNodeObj = {
            expanded: false,
            parentid: 'c' + category.ID,
            id: 'c' + category.ID,
            name: category.Name,
            subjid: relatedId.substr(1),
            isparent: isParent,
            children: this.createCategory(category.SubCategories, relatedId, false, 'c' + category.ID)
        };

        retObj.push(treeNodeObj);
    }

    return retObj;

}

}
