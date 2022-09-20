import { Component, OnInit } from '@angular/core';
import { Coffee, Flavor } from '../coffee.model';
import { CoffeeService } from '../coffee.service';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-coffee-add',
  templateUrl: './coffee-add.component.html',
  styleUrls: ['./coffee-add.component.scss']
})
export class CoffeeAddComponent implements OnInit {

  newCoffee: Coffee = new Coffee();
  newFlavors: Flavor[] = [];
  form: FormGroup;

  constructor(
    public coffeeService: CoffeeService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  addCoffee() {
    if (this.form.invalid) {
      console.log("Form check state - invaild");
      return;
    }

    const value = this.form.value;

    this.newCoffee.name = value.name;
    this.newCoffee.brand = value.brand;
    this.newCoffee.flavors = this.newFlavors;
    
    console.log(this.newCoffee);

    this.coffeeService.create(this.newCoffee).subscribe();

  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      brand: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      flavor: new FormControl(null),
    });
  }

  addFlavor() {
    console.log(this.form.value)
    const value = this.form.value;
    this.newFlavors.push(value.flavor);

    this.form.patchValue({
      flavor: null
    })
  }

  removeFlavor(index: number) {
    this.newFlavors.splice(index, 1);
  }

}
