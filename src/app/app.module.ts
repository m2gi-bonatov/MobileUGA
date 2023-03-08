import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {ModalPostComponent} from './modal-post/modal-post.component';
import {ModalUpdatePostComponent} from './modal-update-post/modal-update-post.component'

import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {environment} from 'src/environments/environment';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {RouteReuseStrategy} from "@angular/router";

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
    provideStorage(() => getStorage())
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
