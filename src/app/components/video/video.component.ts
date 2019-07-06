import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public videos: Observable<Video[]>;
  public columnDefs = [];
  public gridOptions;
  private gridApi;
  private gridColumnApi;
  private youtubeUrl = 'https://www.youtube.com/watch?v=';

  constructor(private videoService: VideoService) {
    this.columnDefs = [
      {
        headerName: '',
        field: 'thumbnail',
        width: 100,
        cellRenderer: (params) => {
          return `<img src="${params.value}">`;
        }
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        width: 150
      },
      {
        headerName: 'Video Title',
        field: 'videoId',
        width: 100,
        cellRenderer: (params) => {
          return `<a href="${this.youtubeUrl}${params.value}">Link</a>`;
        }
      },
      {
        headerName: 'Description',
        field: 'description',
        width: 350
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public getContextMenuItems(params) {
    let result = [];
    if (params.column.colId === 'videoId') {
      result = [
        {
          name: 'Open in New Tab',
          checked: true,
          action: () => {
            window.open('https://www.youtube.com/watch?v=' + params.value);
          }
        }
      ];
    }

    return result;
  }

  ngOnInit() {
    this.videos = this.videoService.getVideos();
  }
}
