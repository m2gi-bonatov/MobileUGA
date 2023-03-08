import { Injectable } from '@angular/core';
import { Topic } from '../models/topic';
import { Post } from '../models/post';
import { Firestore, collection, collectionData, doc, docData, addDoc, setDoc, DocumentReference, deleteDoc, CollectionReference } from '@angular/fire/firestore';
import { from, Observable, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TopicService {

  constructor(private firestore: Firestore) { }

  addTopic(name: string): void{
    //this.topics.push({id: this.id, name: name, posts: []});
    //this.id++;
    const docRef = addDoc(collection(this.firestore, 'topics'), {
      name: name
    });
  }

  delete(topic: Topic): void{
    const documentRef = doc(this.firestore, `topics/${topic.id}`) as DocumentReference<Topic>;
    deleteDoc(documentRef);
  }

  getOneById(id: string): Observable<Topic>{
      const documentRef = doc(this.firestore, `topics/${id}`) as DocumentReference<Topic>;
      const collectionRef = collection(this.firestore, `topics/${id}/posts`) as CollectionReference<Post>;
      return docData<Topic>(documentRef, {idField: 'id'}).pipe(
        switchMap(topic => collectionData(collectionRef, {idField: 'id'}).pipe(
          map(posts => ({
            ...topic,
            posts
          }))
        ))
      );
    }

  deletePostOfTopic(idTopic: string, idPost: string): void{
    const documentRef = doc(this.firestore, `topics/${idTopic}/posts/${idPost}`) as DocumentReference<Topic>;
    deleteDoc(documentRef);
  }

  updatePostOfTopic(idTopic: string, post: Post, namePost: string, description: string): void{
    const documentRef = setDoc(doc(this.firestore, `topics/${idTopic}/posts/${post.id}`), {
      name: namePost,
      description
    });
  }

  addPostToTopic(idTopic: string, namePost: string, description: string): void{
    const documentRef = addDoc(collection(this.firestore, `topics/${idTopic}/posts`), {
      name: namePost,
      description
    });
  }

  getById(id: number): Topic|undefined{
    return undefined;
  }



  findAll(): Observable<any[]>{
    const collectionRef = collection(this.firestore, 'topics');
    return collectionData(collectionRef, {idField: 'id'});
  }

}
