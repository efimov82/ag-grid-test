import { Video } from './video';
import { url } from 'inspector';

describe('Video', () => {
  it('should create an instance', () => {
    const description = 'Video description';
    const videoId = '23ewr23w';
    const publishedAt = '2019-02-20';
    const videoUrl = 'http://youtube.com';
    const title = 'Video tite';

    const data = {
      id: {
        kind: 'test',
        videoId
      },
      snippet: {
        description,
        publishedAt,
        thumbnails: {
          default: {
            url: videoUrl
          }
        },
        title
      }
    };

    const video = new Video(data);

    expect(video).toBeTruthy();
    expect(video.description).toEqual(description);
    expect(video.publishedAt).toEqual(publishedAt);
    expect(video.thumbnail).toEqual(videoUrl);
    expect(video.title).toEqual(title);
  });
});
