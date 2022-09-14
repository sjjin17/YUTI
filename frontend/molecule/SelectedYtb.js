import YoutuberImage from '../atom/YoutuberImage';

export default function selectedYtb({ imageUrl }) {
  return (
    <span>
      <YoutuberImage imageUrl={imageUrl} youtuberName="name"></YoutuberImage>
    </span>
  );
}
