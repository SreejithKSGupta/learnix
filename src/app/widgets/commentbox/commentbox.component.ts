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
  @Output() addComment = new EventEmitter<Comment>();

  user$: Observable<User>;
  user: User | undefined;
  newComment = { message: '', urgency: 'Low' as 'Low' | 'Medium' | 'High' };

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUserState);
    this.user$.subscribe((userdata) => (this.user = userdata));
  }

  validateComment() {
    return this.newComment.message.length > 255;
  }

  submitComment() {
    if (this.validateComment() || !this.newComment.message.trim()) {
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      senderId: this.user!.id,
      senderName: this.user!.name,
      senderType: this.user!.userType,
      senderImg: this.user!.imageUrl,
      recieverType: "",
      recieverName: "",
      recieverId: "",
      message: this.newComment.message.trim(),
      urgency: this.newComment.urgency,
      timestamp: new Date(),
      status: 'approved',
    };

    this.addComment.emit(comment);
    this.newComment = { message: '', urgency: 'Low' };
  }
}
