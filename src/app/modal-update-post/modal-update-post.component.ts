import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Post } from '../models/post';

@Component({
  selector: 'app-modal-update-post',
  templateUrl: './modal-update-post.component.html',
  styleUrls: ['./modal-update-post.component.scss'],
})
export class ModalUpdatePostComponent implements OnInit {
  myPost: Post | undefined;

  form: FormGroup;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.myPost?.name , Validators.required),
      description: new FormControl(this.myPost?.description, Validators.required),
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.form, 'confirm');
  }

}
