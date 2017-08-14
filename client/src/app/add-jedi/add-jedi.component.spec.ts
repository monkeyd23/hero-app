import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJediComponent } from './add-jedi.component';

describe('AddContactComponent', () => {
  let component: AddJediComponent;
  let fixture: ComponentFixture<AddJediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
