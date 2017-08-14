import { Component, OnInit } from '@angular/core';

import { Jedi } from '../shared/jedi.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-jedi-list',
  templateUrl: './jedi-list.component.html',
  styleUrls: ['./jedi-list.component.scss']
})
export class JediListComponent implements OnInit {

  jedis: Jedi[];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('heroes')
    .subscribe(data => this.jedis = data);
  }

}
