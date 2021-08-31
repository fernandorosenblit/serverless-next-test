import React from 'react';

import { FEATURED_MOVIE_ASPECT_RATIO } from 'constants/constants';
import TextSkeleton from 'components/common/TextSkeleton/TextSkeleton';
import ButtonSkeleton from 'components/common/Button/ButtonSkeleton';
import AspectRatioContainer from 'components/common/AspectRatioContainer/AspectRatioContainer';

const FeaturedMovieSkeleton = () => {
  return (
    <div className="featured-movie skeleton">
      <AspectRatioContainer aspectRatio={FEATURED_MOVIE_ASPECT_RATIO} />

      <div className="featured-overlay skeleton">
        <div className="skeleton-info-container">
          <TextSkeleton width="50%" />
          <TextSkeleton width="50%" />
        </div>
        <ButtonSkeleton />
      </div>
    </div>
  );
};

export default FeaturedMovieSkeleton;
