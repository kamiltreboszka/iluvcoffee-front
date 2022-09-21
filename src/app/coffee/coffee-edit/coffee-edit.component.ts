import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee, Flavor, uCoffee } from '../coffee.model';
import { CoffeeService } from '../coffee.service';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.scss']
})
export class CoffeeEditComponent implements OnInit {

  idCoffee: number;
  coffee: Coffee;
  flavors: string[] = [];
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public coffeeService: CoffeeService,
  ) { }

  async ngOnInit() {
    this.coffee = new Coffee();
    this.initForm();

    this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('id')) {
        this.router.navigateByUrl('/coffees');
        return;
      }

      this.idCoffee = Number(paramMap.get('id'));
      console.log(this.idCoffee)

      this.getCoffee();

    })

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

  getCoffee() {
    this.coffeeService.getById(this.idCoffee).subscribe((res: Coffee) => {
      this.coffee = res;
      this.flavors = res.flavors.map( el => {
        return el.name;
      });
      console.log(res);
      console.log(this.flavors)

      this.form.setValue({
        name: res.name,
        brand: res.brand,
        flavor: null,
      })
    })
  }

  addFlavor() {
    console.log('FORM VALUE: ',this.form.value)
    const value = this.form.value;

    if(value.flavor != null) {
      this.flavors.push(value.flavor);
      
      this.form.patchValue({
        flavor: null
      })
    }

    console.log('Flavors: ',this.flavors)
  }

  removeFlavor(index: number) {
    this.flavors.splice(index, 1);
  }

  updateCoffee() {
    if (this.form.invalid) {
      console.log("Form check state - invaild");
      return;
    }

    const value = this.form.value;
    const update = new uCoffee();
    
    console.log(this.flavors)

    update.name = value.name;
    update.brand = value.brand;
    update.flavors = this.flavors;
    
    console.log(update);

    this.coffeeService.update(update, this.idCoffee).subscribe( () => {
      this.router.navigateByUrl('/coffees');
    });

  }

}
