import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video } from '../models/video';

// tslint:disable-next-line:max-line-length
const URL = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&type=video&part=snippet&q=john&maxResults=`;

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}

  public getVideos(countResults = 50): Observable<Video[]> {
    const url = URL + countResults;
    const key = 'items';

    return this.httpClient.get(url).pipe(
      map(data => data[key].map(
        row => {
          return new Video(row);
        }
      )),
    );
  }
}
