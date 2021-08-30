import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

import { initializeStore } from "state/store";
import { RELS } from 'constants/entityRels';
import queryBuilder from 'utils/queryBuilder';
import executeRequest from 'utils/executeRequest';

function ShowtimePage({ Component, pageProps }) {

	return (
		<div>
      <h1>Showtime Page</h1>
    </div>
	);
}

export default ShowtimePage;

export async function getServerSideProps({ params }) {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore;

  const movieQuery = queryBuilder({
    filter: {
      urlName: { eq: params?.movieId }
    },
    include: [
      RELS.movie.imageContent,
      { [RELS.movie.ratings]: RELS.movieRating.ratingType },
      RELS.movie.textContent,
      RELS.movie.genres
    ]
  });

  const venueQuery = queryBuilder({
    filter: {
      urlName: { eq: params?.theaterId  }
    },
    include: [RELS.venue.imageContent]
  });

  await Promise.all([executeRequest(dispatch, `https://api.inventory.dev.external.hollywood.com/en-us/movie${movieQuery}`), executeRequest(dispatch, `https://api.inventory.dev.external.hollywood.com/en-us/venue${venueQuery}`)]);

  return { props: { initialReduxState: reduxStore.getState(), pageProps: { initialReduxState: reduxStore.getState() } } }

}
