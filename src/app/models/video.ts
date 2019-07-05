import { VideoData } from '../interfaces';

export class Video {
  public description: string = '';
  public publishedAt: string = '';
  public videoId:     string = '';
  public thumbnail:   string = '';
  public title:       string = '';

  constructor(data: VideoData) {
    const snippet = data.snippet;

    this.videoId =     data.id.videoId;
    this.description = snippet.description;
    this.publishedAt = snippet.publishedAt;
    this.thumbnail =   snippet.thumbnails.default.url;
    this.title =       snippet.title;
  }
}
