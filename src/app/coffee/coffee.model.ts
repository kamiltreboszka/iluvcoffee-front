export class Coffee {
  id: number;
  name: string;
  brand: string;
  recommendations: number;
  flavors: Flavor[];
}

export class Flavor {
  id: number;
  name: string;
}

export class uCoffee {
  name: string;
  brand: string;
  flavors: string[];
}