import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/catch'

import { User } from './models/user.model'
import { ErrorService } from './misc/error.service'

// TODO: Move to config file
const base_url = 'http://127.0.0.1:8080'

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private es: ErrorService
  ) { }

  private get authHeader(): string {
    return `Bearer ${localStorage.getItem('access_token') || ''}`
  }

  private handleError(err: Response | any): Observable<any> {
    const errorMsg = err.error ? err.error.message : 'Unabled to complete request'
    return Observable.throw(errorMsg)
  }

  setError(error): void {
    this.es.setError(error)
    console.error(error)
    this.router.navigateByUrl('/error')
  }

  getStuff$(): Observable<any> {
    return this.http
      .get(base_url + '/api/stuff', {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  tokenTest(): Observable<User> {
    return this.http
      .get(base_url + '/api/token', {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  // TODO: Make more specific than any
  updateInfo$(info, field: string): Observable<any> {
    return this.http
      .put(base_url + `/api/update/${field}`, info, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  // TODO: Make more specific than any
  getUserInfo$(): Observable<User> {
    return this.http
      .get(base_url + '/api/getUserInfo', {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  getAllUsers$(): Observable<User[]> {
    return this.http
      .get(base_url + '/api/getAllUsers', {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  deleteUser$(id): Observable<string> {
    return this.http
      .delete(base_url + `/api/deleteUser/${id}`, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }
}