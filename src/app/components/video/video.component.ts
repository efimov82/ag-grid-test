import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"]
})
export class VideoComponent implements OnInit {
  public videos: Observable<Video[]>;
  public columnDefs = [];

  constructor(private videoService: VideoService) {
    this.columnDefs = [
      {
        headerName: "",
        field: "thumbnail",
        width: 100,
        cellRenderer: (params) => {
          return `<img src="${params.value}">`;
        }
      },
      {
        headerName: "Published on",
        field: "publishedAt",
        width: 150
      },
      {
        headerName: "Video Title",
        field: "videoId",
        width: 100,
        cellRenderer: (params) => {
          return `<a href="https://www.youtube.com/watch?v=${params.value}" target="_blank">Link</a>`;
        }
      },
      {
        headerName: "Description",
        field: "description",
        width: 350
      }
    ];
  }

  ngOnInit() {
    this.videos = this.videoService.getVideos();
  }
}
