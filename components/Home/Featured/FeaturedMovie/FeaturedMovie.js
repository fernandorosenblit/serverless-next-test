import React from 'react';
import { array, shape, string } from 'prop-types';
import Link from "next/link";
import Image from 'next/image'

import { FEATURED_MOVIE_ASPECT_RATIO } from 'constants/constants';
import AspectRatioContainer from 'components/common/AspectRatioContainer/AspectRatioContainer';

const FeaturedMovie = ({
  movie,
  featuredImageContent
}) => {
  const { attributes: { displayName, urlName }, ratings, runtime } = movie;

  let imgUrl = featuredImageContent?.attributes?.image.url;
  imgUrl = featuredImageContent?.attributes?.image.url?.replace('{height}', 700);
  imgUrl = imgUrl.replace('{width}', 1400);

  return (
    <div className="featured-movie">
      <AspectRatioContainer aspectRatio={FEATURED_MOVIE_ASPECT_RATIO}>
        <img
          src={imgUrl}
          layout='fill'
        />
      </AspectRatioContainer>
      <div className="featured-overlay">
        <div>
          <span className="featured-movie-title">{displayName}</span>
          <div>
            {/* <MovieRating rating={ratings?.[0].ratingType.name} className="featured-movie-info" />
            <MovieRuntime runtime={runtime} className="featured-movie-info" /> */}
          </div>
        </div>
        <Link href={`/showtime/${urlName}`} className="btn btn--primary btn--outlined get-tickets">
          Get tickets
        </Link>
      </div>
    </div>
  );
};

FeaturedMovie.propTypes = {
  movie: shape({
    featuredImageContent: array,
    displayName: string
  })
};

export default FeaturedMovie;
