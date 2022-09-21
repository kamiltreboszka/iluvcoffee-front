import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { QueryParams } from '../_helpers/queryParams.model';
import { Coffee } from './coffee.model';
import { CoffeeService } from './coffee.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {

  coffee: Coffee[] = [];
  queryParams: QueryParams;

  limit = new FormControl('');
  offset = new FormControl('');

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

  getFiltredCoffee() {
    console.log('Limit', this.limit.value, 'Offset', this.offset.value)
    this.queryParams = {
      limit: this.limit.value ? parseInt(this.limit.value) : null,
      offset: this.offset.value ? parseInt(this.offset.value) : null,
    }

    console.log(this.queryParams)

    this.coffeService.getFiltred(this.queryParams).subscribe( (res) => {
      console.log('Filtred coffee');
      this.coffee = res;
    })
  }

}
