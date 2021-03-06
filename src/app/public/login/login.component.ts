import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }
  // tslint:disable-next-line:typedef
  submit(){
    const formData = this.form?.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'n3Vbcjr73Ffs2QH7hxWXws3O7m4IZ42WmGf8hrRc',
      scope: '*'
    };
    const op = {
      Accept: 'application/json'
    };
    const requestOptions = {
      headers: new HttpHeaders(op),
    };
    this.http.post('http://localhost:8000/api/token', data, requestOptions).subscribe(
      (result: any) => {
        // console.log('success');
        // console.log(result);
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['/secure']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
