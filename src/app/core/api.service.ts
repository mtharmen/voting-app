import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/catch'

import { User } from './models/user.model'
import { Poll } from './models/poll.model'
import { ErrorService } from './misc/error.service'

import { base_url } from './config'

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
    console.error(error)
    window.location.href = base_url + '/error'
    // this.es.setError(error)
    // this.router.navigateByUrl('/error')
  }

  getAllPolls$(id?: string): Observable<any> {
    return this.http
      .get(base_url + `/api/get-all-polls/${id || ''}`)
      .catch(this.handleError)
  }

  getPoll$(id: string): Observable<any> {
    return this.http
      .get(base_url + '/api/get-poll/' + id)
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

  makeNewPoll$(poll: Poll): Observable<any> {
    return this.http
      .post(base_url + '/api/make-poll', poll, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  voteOnPoll$(id: string, index: number) {
    return this.http
      .put(base_url + '/api/poll-vote/' + id, { index })
      .catch(this.handleError)
  }

  addOption$(id: string, newOption: string) {
    return this.http
      .put(base_url + '/api/poll-add-option/' + id, { newOption }, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }

  deletePoll$(id: string): Observable<any> {
    return this.http
      .delete(base_url + '/api/delete-poll/' + id, {
        headers: new HttpHeaders().set('Authorization', this.authHeader)
      })
      .catch(this.handleError)
  }
}
