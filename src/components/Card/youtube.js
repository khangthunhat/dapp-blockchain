import React from 'react';
import { getYouTubeVideoId } from '../../utils/utils';

const YouTubeEmbed = ({ videoUrl }) => {

  const embedId = getYouTubeVideoId(videoUrl)
  return (
    <iframe
      width="100%"
      height="350px"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
};

export default YouTubeEmbed;
