import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { TopicsComponent } from './Pages/topics/topics.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageModule } from './Pages/login/login.module';

import { ModalPostComponent } from './modal-post/modal-post.component';
import { ModalUpdatePostComponent } from './modal-update-post/modal-update-post.component'

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, ModalPostComponent, ModalUpdatePostComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(
      environment.firebaseConfig
    )),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
