import {Component, OnInit} from '@angular/core';
import {Image} from '../models/image';
import {ImageServiceService} from '../service/image-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DetailsComponent} from '../details/details.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  option: any = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
  };
  lstImages: Image[] = [];

  constructor(
    private service: ImageServiceService,
    private spinner: NgxSpinnerService,
    private modal: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.getList().subscribe(res => {
      if (res.message === 'success') {
        this.lstImages = res.data;
      }
    });
  }

  delete(id: number) {
    this.spinner.show();
    this.service.delete(id).subscribe(res => {
      this.spinner.hide();
      if (res.message === 'success') {
        this.getList();
      } else {
        alert(res.message);
      }
    });
  }

  details(id:number) {
    const modalRef = this.modal.open(DetailsComponent,this.option);
    modalRef.componentInstance.data = this.lstImages;
    modalRef.componentInstance.index = id;
    modalRef.result.then(res => {
      // console.log(res);
    });
  }
}
