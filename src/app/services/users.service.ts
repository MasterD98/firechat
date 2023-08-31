import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile.model';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$():Observable<UserProfile|null>{
    return this.authService.currentUser$.pipe(
      switchMap((user)=>{
        if(!user?.uid){
          return of(null)
        }
        const ref=doc(this.firestore,'users',user?.uid)
        return docData(ref) as Observable<UserProfile>
      })
    )
  }

  get allUsers$():Observable<UserProfile[]>{
    const ref=collection(this.firestore,'users');
    const queryAll=query(ref);
    return collectionData(queryAll) as Observable<UserProfile[]>;
  }

  addUser(user:UserProfile):Observable<any>{
    const ref=doc(this.firestore,'users',user?.uid);
    return from(setDoc(ref,user));
  }

  updateUser(user:UserProfile):Observable<any>{
    const ref =doc(this.firestore,'users',user?.uid);
    return from(updateDoc(ref,{...user}))
  }

  constructor(private firestore: Firestore,
    private authService: AuthenticationService) { }
}
