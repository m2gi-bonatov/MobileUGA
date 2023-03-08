import { Component, OnInit } from '@angular/core';
import { Topic } from '../models/topic';
import { Post } from '../models/post';
import { TopicService } from '../services/topic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPostComponent } from '../modal-post/modal-post.component';
import { ModalUpdatePostComponent } from '../modal-update-post/modal-update-post.component';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  myTopic: Topic|undefined;
  public id: string|undefined;

  constructor(private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id){
        this.topicService.getOneById(this.id).subscribe(res => this.myTopic = res);
      }
    });
  }

  deletePostOfTopic(post :Post){
    if(this.myTopic != undefined){
      this.topicService.deletePostOfTopic(this.myTopic.id, post.id);
    }
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ModalPostComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role === 'confirm'){
      if(this.id != undefined){
        this.topicService.addPostToTopic(this.id, data.value.name, data.value.description);
      }
    }
  }

  async openModalUpdate(post :Post){
    const modal = await this.modalCtrl.create({
      component: ModalUpdatePostComponent,
      componentProps: {
        myPost: post
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role === 'confirm'){
      if(this.id != undefined){
        this.topicService.updatePostOfTopic(this.id,  post, data.value.name, data.value.description);
      }
    }
  }

}
