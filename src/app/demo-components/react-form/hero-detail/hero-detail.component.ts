import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { states } from 'app/demo-components/react-form/data-model';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      secretLairs: this.fb.array([])
    });

    const addresses = [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ];

    const addressesGroups = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressesGroups);

    this.heroForm.setControl('secretLairs', addressFormArray);

    console.log(this.heroForm.get('secretLairs'));
  }

  get secretLairs() {
    return this.heroForm.get('secretLairs') as FormArray;
  }
}
