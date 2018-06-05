import { Component, OnInit, EventEmitter, ViewContainerRef } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: ['video'],
  outputs: ['updateVideoEvent', 'deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {
  video: any;

  private editTitle: boolean = false;
  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();
  
  constructor(private popup: Popup, 
              private toastr: ToastsManager, 
              private vcr: ViewContainerRef ) { 

    this.toastr.setRootViewContainerRef(vcr);          
  }

  ngOnInit() {
    this.popup.options = {
      cancleBtnClass: "btn btn-default", 
      confirmBtnClass: "btn btn-default",
      color: "#4180ab",
      header: "Enter Password "
    }
  }

  onTitleClick() {
    this.editTitle = true;
  }

  ngOnChanges() {
    this.editTitle = false;
  }

  updateVideo() {
    console.log("trying to show popup");

    this.popup.show();    
  }

  deleteVideo() {
    this.deleteVideoEvent.emit(this.video);
  }

  password:string;
  checkPassword(){
    if(this.password === this.video.password) {
      this.toastr.success('Password matched. updating.....');
      this.updateVideoEvent.emit(this.video);
      this.popup.hide();
    }else{
      this.toastr.error("Password doesn't match - try again....");
      this.popup.hide();
    }
  }

}
