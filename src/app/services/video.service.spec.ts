import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { VideoService } from "./video.service";

describe("VideoService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it("should be created", () => {
    const service: VideoService = TestBed.get(VideoService);
    expect(service).toBeTruthy();
  });

  it("should get data with limit", () => {
    const service: VideoService = TestBed.get(VideoService);
    const expectLength = 10;

    service.getVideos(expectLength).subscribe(data => {
      expect(data.length).toEqual(expectLength);
    });
  });
  
});
