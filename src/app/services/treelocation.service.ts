import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BaseService } from './base.service';
import { Ajax } from '../helpers/ajax';

@Injectable()
export class TreelocationService extends BaseService {

  private treeLocationUrl: string;

  private locations = [
    { lat: -23.437717, ltn: -51.917825 },
    { lat: -23.437323 , ltn: -51.921258 },
    { lat: -23.437481 , ltn: -51.913877 },
    { lat: -23.437481 , ltn: -51.913877 },
    { lat: -23.448741 , ltn: -51.919541 },
    { lat: -23.443387 , ltn: -51.954732 },
    { lat: -23.443387 , ltn: -51.954732 },
    { lat: -23.459450 , ltn: -51.917653 },
    { lat: -23.463938 , ltn: -51.894565 }
  
  ];

  constructor(protected appAjax: Ajax.Request, @Inject('TreeLocationServiceUrl') treeLocationUrl) {

    super(appAjax);
    this.treeLocationUrl = treeLocationUrl;
  }



  // public get(): Observable<any> {

  //   const url = this.treeLocationUrl;
  //   // return this.SendRequest(url, Ajax.MethodType.GET);
  //   return this.locations;

  // }

   public get():  Observable<any> {

    return Observable.of(this.locations);

  }

}
