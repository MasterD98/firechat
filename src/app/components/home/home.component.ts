import { Component } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile.model';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user$=this.usersService.currentUserProfile$;
  searchControl=new FormControl('');

  users$ = combineLatest([
    this.usersService.allUsers$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, searchString]) => {
      if(!searchString) return users
      return users.filter((u) =>
        u.displayName?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
  );
  
  constructor(private usersService:UsersService ,private chatService : ChatsService){
    this.usersService.currentUserProfile$
  }

  createChat(otherUser:UserProfile){
    this.chatService.createChat(otherUser).subscribe();
  }

}
