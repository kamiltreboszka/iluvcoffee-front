import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Coffee } from './coffee.model';
import { CoffeeService } from './coffee.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  coffee: Coffee[] = [];

  constructor(
    public coffeService: CoffeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    console.log(environment.api);

    this.getCoffee();
  }

  getCoffee() {
    this.coffeService.getAll().subscribe( (res) => {
      console.log(res)
      this.coffee = res;
      console.log('Coffees: ', this.coffee);
    }) 
  }

  deleteCoffee(id: number) {
    this.coffeService.delete(id).subscribe( () => {
        console.log('Coffee deleted');
        this.getCoffee();
      }
    )
  }

  editCoffee(row: Coffee) {
    this.router.navigate(['/coffees/edit/'+ row.id], { relativeTo: this.route });
  }

}
