import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStuffComponent } from './new-stuff.component';

describe('NewStuffComponent', () => {
  let component: NewStuffComponent;
  let fixture: ComponentFixture<NewStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
