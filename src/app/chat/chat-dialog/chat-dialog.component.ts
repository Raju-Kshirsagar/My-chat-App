import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '.././../chat.service';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/scan';
import { scan } from 'rxjs/operators';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  public date: Date = null;
  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) {
   /*setInterval(() => {
             this.date = new Date();
           }, 1);*/
   }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val) ));
  }

  sendMessage() {
    this.date = new Date();
    this.chat.converse(this.formValue);
    this.formValue = '';
  }


}
