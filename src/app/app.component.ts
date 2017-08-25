import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div id="wrapper">
      <app-header></app-header>
      <br>
      <div id="content" class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: []
})

export class AppComponent { }
