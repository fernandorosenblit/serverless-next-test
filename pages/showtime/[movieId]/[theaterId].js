import { initializeStore } from "state/store";
import { RELS } from 'constants/entityRels';
import queryBuilder from 'utils/queryBuilder';
import getLinks from 'utils/getLinks';
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
  const links = await getLinks();
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

  await Promise.all([executeRequest(dispatch, `${links?.movie}${movieQuery}`), executeRequest(dispatch, `${links?.venue}${venueQuery}`)])

  return { props: { initialReduxState: reduxStore.getState(), pageProps: { initialReduxState: reduxStore.getState() } } }

}
