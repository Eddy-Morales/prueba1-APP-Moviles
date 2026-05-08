import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = 'https://api.jikan.moe/v4/top/anime';

  constructor(private http: HttpClient) { }

  getTopAnime(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
