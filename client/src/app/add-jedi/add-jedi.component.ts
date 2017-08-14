import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Jedi } from '../shared/jedi.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add-jedi',
  templateUrl: './add-jedi.component.html',
  styleUrls: ['./add-jedi.component.scss']
})
export class AddJediComponent implements OnInit {

  loading: Boolean = false;
  newJedi: Jedi;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onSubmit (form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);
    const jedi: Jedi = {
      name: formValues.name,
      rank: formValues.address,
      trainedBy: formValues.trainedBy,
      species: formValues.species,
      bio: formValues.bio,
      photoUrl: formValues.photo
    };

    this.api.post('jedis', jedi)
    .subscribe(data => {
      form.reset();
      this.loading = false;
      this.newJedi = data;
    });
  }
}
