import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/users';
import { selectUserState } from '../../store/selectors/user.selector';
import { Comment } from './../../interfaces/comment';

@Component({
  selector: 'app-commentbox',
  standalone: false,
  templateUrl: './commentbox.component.html',
  styleUrl: './commentbox.component.css'
})
export class CommentboxComponent {
  @Input() comments: Comment[] | undefined;
  @Output() addComment = new EventEmitter<Comment>(); // Emit new comment

  user$: Observable<User>;
  user: User|undefined;
  newComment: { message: string; urgency: "Low" | "Medium" | "High" } = {
    message: '',
    urgency: 'Low'
  };

  constructor(private  store: Store){
    this.user$ = this.store.select(selectUserState);
     this.user$.subscribe((userdata) => {
      this.user = userdata;
    });

  }

  validateComment() {
    return this.newComment.message.length > 255;
  }

  // Method to handle comment submission
  submitComment() {
    if (this.newComment.message.length > 255) {
      return;
    }

    const comment :Comment = {
      id: Date.now().toString(),
      senderId: this.user!.id,
      senderName:  this.user!.name,
      senderType:  this.user!.userType,
      recieverType:"",
      recieverName:"",
      recieverId:'',
      message: this.newComment.message,
      urgency: this.newComment.urgency,
      timestamp: new Date(),
      status: 'approved',

    };

    this.addComment.emit(comment);

    this.newComment.message = '';
    this.newComment.urgency = 'Low';
  }
}
