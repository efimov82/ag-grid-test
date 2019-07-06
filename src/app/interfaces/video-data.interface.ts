export interface VideoData {
  id: {
    kind: string,
    videoId: string
  };
  snippet: {
    description: string,
    publishedAt: string,
    thumbnails: {
      default: {
        url: string
      }
    },
    title: string
  };
}
