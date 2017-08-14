import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Jedi } from '../shared/jedi.model';

@Component({
  selector: 'app-jedi',
  templateUrl: './jedi.component.html',
  styleUrls: ['./jedi.component.scss']
})
export class JediComponent implements OnInit {

  @Input() jedi: Jedi;

  @HostBinding('class') columnClass = 'four wide column';
  constructor() { }

  ngOnInit() {
  }

}
