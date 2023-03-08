import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  topics: Topic[] = [];
  name: string;

  constructor(private topicService: TopicService) { }

  ngOnInit() {
    //this.topics = this.topicService.getAll();
    this.topicService.findAll().subscribe(res => {
      console.log(res);
      this.topics = res;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm')
  }

  delete(topic: Topic){
    this.topicService.delete(topic);
  }

  onWillDismiss(event: Event){
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      if(this.name != "" && this.name != undefined){
        this.topicService.addTopic(this.name);
      }
    }
    this.name = "";
  }
}
