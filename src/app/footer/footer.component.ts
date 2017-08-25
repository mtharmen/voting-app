import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  template: `
  <footer class="footer text-center">
    <div class="container">
      <p><small>
        <a href="https://www.freecodecamp.com/challenges/build-a-voting-app" target="_blank">FCC Voting App</a> | 
        <a href="https://github.com/mtharmen/voting-app" target="_blank">GitHub Repo <i class="fa fa-github" aria-hidden="true"></i></a> | 
        <a href="http://fontawesome.io/" target="_blank">Font Awesome <i class="fa fa-font-awesome" aria-hidden="true"></i></a> | 
        <a href="http://www.chartjs.org/" target="_blank">Charts from Chartjs</a>
      </small></p>
    </div>
  </footer>
  `,
  styles: []
})
export class FooterComponent {
  constructor() { }
}
