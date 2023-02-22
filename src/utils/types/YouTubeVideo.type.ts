export interface IYouTubeVideoThumbnail {
  width: number;
  height: number;
  url: string;
}

export interface IYouTubeVideo {
  video: {
    channelId: string;
    channelName: string;
    lengthText: string;
    publishedTimeText: string;
    thumbnails: IYouTubeVideoThumbnail[];
    title: string;
    videoId: string;
    viewCountText: string;
  };
}
