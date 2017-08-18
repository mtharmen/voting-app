import { Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit  {

  current: string

  constructor( ) { }

  ngOnInit(): void {
    this.current = localStorage.getItem('previous_tab') || 'my-stuff'
    localStorage.removeItem('previous_tab')
  }

  switch(val: string): void {
    this.current = val
  }
}
