import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TopicsComponent } from './topics.component';

import { TopicPageRoutingModule } from './topic-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicPageRoutingModule
  ],
  declarations: [TopicsComponent]
})
export class TopicPageModule {}
