import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  // @ts-ignore
  user; contacts;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get('http://localhost:8000/api/user', {headers}).subscribe(
      result => {
        this.user = result;
      },
      error => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
    this.http.get('http://localhost:8000/api/users', {headers}).subscribe(
      result => {
        this.contacts = result;
      },
      error => {
        console.log('failed to retrieve users');
      }
    );
  }

}
