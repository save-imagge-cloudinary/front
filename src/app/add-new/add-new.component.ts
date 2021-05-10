import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageServiceService} from '../service/image-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  @ViewChild('imageFile', {static: false}) imageFile: ElementRef;

  image: File;
  imageMin: File;

  constructor(
    private service: ImageServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  processChange(event: any) {
    this.image = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (res: any) => {
      this.imageMin = res.target.result;
    };
    fr.readAsDataURL(this.image);
  }

  reset() {
    this.image = null;
    this.imageMin = null;
    this.imageFile.nativeElement.value = '';
  }

  upload() {
    this.spinner.show();
    this.service.upload(this.image).subscribe(res => {
        this.spinner.hide();
        if (res.message === 'success') {
          this.router.navigate(['/']);
        } else {
          alert(res.message);
        }
      },
      error => {
        this.spinner.hide();
        alert(error.console.error().message);
        this.reset();
      });
  }
}
