import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  template: `
  <footer class="footer">
    <div class="container">
        <p><small>
            <a href="" target="_blank">Item 1</a> | 
            <a href="" target="_blank">Put Github Repo Link Here <i class="fa fa-github" aria-hidden="true"></i></a> | 
            <a href="http://fontawesome.io/" target="_blank">Font Awesome <i class="fa fa-font-awesome" aria-hidden="true"></i></a>
          </small></p>
    </div>
  </footer>
  `,
  styles: [`.footer {
              text-align: center;
            }
          `]
})
export class FooterComponent {

  constructor() { }

}
