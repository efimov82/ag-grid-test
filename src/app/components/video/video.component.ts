import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/models/video';

enum ViewMode {
  'normal' = 'Normal mode',
  'selection' = 'Selection mode'
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public columnDefs = [];
  public currentMode: ViewMode = ViewMode.normal;
  public videos: Observable<Video[]>;
  public rowSelection = 'multiple';
  public statusBar;
  public countRecords = 50;

  private gridApi;
  private gridColumnApi;
  private youtubeUrl = 'https://www.youtube.com/watch?v=';

  constructor(private videoService: VideoService) {
    this.columnDefs = [
      {
        headerName: '',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        field: 'selection'
      },
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

    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'left'
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' }
      ]
    };
  }

  ngOnInit(): void {
    this.videos = this.videoService.getVideos(this.countRecords);
  }

  public reloadData(): void {
    this.videos = this.videoService.getVideos(this.countRecords);
  }

  public switchMode(): void {
    this.currentMode = (this.currentMode === ViewMode.normal)  ? ViewMode.selection : ViewMode.normal;
    this.setVisibleSelectionColumn();
  }

  public getTotalCount(): void {
    window.alert ('Total count of records: ' + this.gridApi.getDisplayedRowCount());
  }

  public getSelectedCount(): void {
    window.alert ('Selected records: ' + this.gridApi.getSelectedRows().length);
  }

  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setVisibleSelectionColumn();
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

  private setVisibleSelectionColumn(): void {
    this.gridColumnApi.setColumnVisible('selection', this.currentMode === ViewMode.selection);
  }
}
