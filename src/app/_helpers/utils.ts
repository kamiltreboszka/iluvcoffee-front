import { HttpParams } from "@angular/common/http";

export class Utils {

  public static httpParams<T>(httpParams: T) {

    let params = new HttpParams();

    Object.entries(httpParams).forEach(([key, value]) => {
      if (value === undefined || value === null ) return;
      
      params = params.set(key, value.toString());
    });

    return params
  }

}