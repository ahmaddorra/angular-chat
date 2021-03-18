import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // @ts-ignore
  @ViewChild('appendElm') elm: ElementRef;
  // @ts-ignore
  form: FormGroup; socket;
  // @ts-ignore
  private routeSub: Subscription;
  // @ts-ignore
  user; recipient; messages; lastDate; appendMessages;
  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      inputmessage: ''
    });
    let id;
    this.routeSub = this.route.params.subscribe(params => {
      id = params.id;
    });
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get('http://localhost:8000/api/getuser/' + id, {headers}).subscribe(
      result => {
        this.recipient = result;
      },
      error => {
        console.log('failed to retrieve recipient user');
      }
    );
    this.http.get('http://localhost:8000/api/user', {headers}).subscribe(
      result => {
        this.user = result;
      },
      error => {
        console.log('failed to retrieve user');
      }
    );
    this.http.get('http://localhost:8000/api/chat/user/' + id, {headers}).subscribe(
      result => {
        this.messages = result;
        // @ts-ignore
        this.lastDate = result[result.length - 1].created_at;
        console.log(this.lastDate);
      },
      error => {
        console.log('failed to retrieve chat');
      }
    );
    // @ts-ignore
    // tslint:disable-next-line:typedef
    setInterval(() => {
      this.http.get('http://localhost:8000/api/chat/user/' + this.recipient.id + '?lastDate=' + this.lastDate , {headers}).subscribe(
        result => {
          this.appendMessages = result;
          // tslint:disable-next-line:prefer-for-of
          for ( let i = 0; i < this.appendMessages.length; i++){
            if ( this.appendMessages[i].from_id === this.user.id){
              this.elm.nativeElement.insertAdjacentHTML('beforeend', '<div class="row text-end mt-2"><div class="col-12"><div class="message sent float-right"><p>' + this.appendMessages[i].text + '</p></div> </div> </div>');
            }
            else{
              this.elm.nativeElement.insertAdjacentHTML('beforeend', '<div class="row text-start mt-2"><div class="col-12"><div class="message received"><p>' + this.appendMessages[i].text + '</p></div> </div> </div>');
            }
          }
          console.log(this.appendMessages);
        },
        error => {
          console.log('failed to retrieve chat');
        }
      );
    }, 5000);
  }

  submit(): void{
    const formData = this.form?.getRawValue();
    const data = {
      text: formData.inputmessage,
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    this.http.post('http://localhost:8000/api/chat/user/' + this.recipient.id, data, {headers}).subscribe(
      (result: any) => {
        this.form.reset();
        console.log('message sent');
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );

  }
}
