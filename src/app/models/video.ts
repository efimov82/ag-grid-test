import { VideoData } from '../interfaces';

export class Video {
  public description = '';
  public publishedAt = '';
  public videoId = '';
  public thumbnail = '';
  public title = '';

  constructor(data: VideoData) {
    const snippet = data.snippet;

    this.videoId =     data.id.videoId;
    this.description = snippet.description;
    this.publishedAt = snippet.publishedAt;
    this.thumbnail =   snippet.thumbnails.default.url;
    this.title =       snippet.title;
  }
}
