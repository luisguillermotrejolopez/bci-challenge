import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { lastValueFrom, map } from "rxjs";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  public getNbaPlayers(): Promise<any> {
    const params = new HttpParams()
      .set('page', 0)
      .set('per_page', 25);

    return lastValueFrom(this._httpClient.get(`${environment.apiUrl}/players`, { params }).pipe(
      map((response: any) => {
        return response.data;
      })
    ))
  }
}
