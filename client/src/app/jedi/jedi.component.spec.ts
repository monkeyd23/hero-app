import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JediComponent } from './jedi.component';

describe('JediComponent', () => {
  let component: JediComponent;
  let fixture: ComponentFixture<JediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
