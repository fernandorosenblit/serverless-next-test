import React from 'react';
import { useSelector } from "react-redux";
import Slider from 'react-slick';

import { RELS } from 'constants/entityRels';

import FeaturedMovie from './FeaturedMovie/FeaturedMovie';

const query = {
  include: [RELS.movie.imageContent, { [RELS.movie.ratings]: RELS.movieRating.ratingType }]
};

const ids = [1155,1029,1130];

const Featured = () => {
  let movies = [];
  let moviesImageContent = [];
  const { movie, movieImageContent } = useSelector(store => store.api);
	Object.keys(movie).forEach((key => {
    if(ids.includes(Number(key))) {
      movies.push(movie[key]);
    }
  }));
  Object.keys(movieImageContent).forEach((key => {
    moviesImageContent.push(movieImageContent[key]);
  }));
  

  let slidesToShow = 2;

  const carouselSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    centerMode: false,
    swipeToSlide: true
  };

  return (
    <div className="featured">
      <Slider {...carouselSettings}>
        {movies?.map(movie => {
          const featuredId = movie?.relationships?.imageContent?.data && movie?.relationships?.imageContent?.data[0]?.id;
        return (
          <FeaturedMovie 
            key={movie.id} 
            movie={movie} 
            featuredImageContent={moviesImageContent.find( image => image.id == featuredId)} 
          />
        )
        
        }
        )}
      </Slider>
    </div>
  );
};

export default Featured;
