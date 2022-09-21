import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coffee, uCoffee } from './coffee.model';
import { QueryParams } from '../_helpers/queryParams.model';
import { Utils } from '../_helpers/utils';

const url = environment.api;

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  coffee: Coffee[];

  constructor(
    private http: HttpClient,
  ) { }


  getAll() {
    return this.http.get<Coffee[]>(`${url}coffees`);
  }

  getById(id: number) {
    return this.http.get<Coffee>(`${url}coffees/${id}`);
  }

  create(coffee: Coffee) {
    return this.http.post(url + 'coffees', coffee);
  }

  update(coffee: uCoffee, id: number) {
    return this.http.patch(`${url}coffees/${id}`, coffee);
  }

  delete(id: number) {
    return this.http.delete(`${url}coffees/${id}`);
  }

  getFiltred(queryParams: QueryParams) {
    return this.http.get<Coffee[]>(`${url}coffees`, { params: Utils.httpParams(queryParams)});
  }
}
