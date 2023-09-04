import { Injectable } from '@angular/core';
import {  user } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import {Observable, concatMap, map, take} from 'rxjs'
import { AuthenticationService } from './authentication.service';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private firestore:Firestore,private authService:AuthenticationService) { }

  createChat(otherUser:UserProfile) : Observable<string>{
    const ref=collection(this.firestore,'chats');
    return this.authService.currentUser$.pipe(
      take(1),
      concatMap(user=>addDoc(ref,{
        userIds:[user?.uid,otherUser?.uid],
        users:[
          {
            displayName:user?.displayName ?? '',
            photoURL:user?.photoURL ?? ''
          },
          {
            displayName:otherUser?.displayName ?? '',
            photoURL:otherUser?.photoURL ?? ''
          }
        ]
      })),map(ref=>ref.id)
    )
  }
}
