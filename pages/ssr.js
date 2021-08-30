import httpClient from "httpClient";
import { useSelector } from "react-redux";

import List from "components/Home/List";
import { initializeStore } from "state/store";
import getLinks from 'utils/getLinks';
import queryBuilder from 'utils/queryBuilder';
import executeRequest from 'utils/executeRequest';
import styles from "styles/Home.module.scss";

function Home({ ip, geoLoc }) {
	const movies = [];
	const ratingTypes = [];
	const genres = [];
	const featureListAux = [];
	const apiReducer = useSelector(store => store.api);
	const { movie, ratingType, genre, featureList } = useSelector(store => store.api);
	Object.keys(movie).forEach((key => {
    movies.push(movie[key]);
	}));
	Object.keys(ratingType).forEach((key => {
    ratingTypes.push(ratingType[key]);
	}));
	Object.keys(genre).forEach((key => {
    genres.push(genre[key]);
	}));
	Object.keys(featureList).forEach((key => {
    featureListAux.push(featureList[key]);
	}));

	return (
		<div className={styles.container}>
			<div className="container">
				<List title="Movie" data={movies} />
				<List title="Rating type" data={ratingTypes} />
				<List title="Genre" data={genres} />
				<List title="Feature List" data={featureListAux} />
				<div>
					<h4>IP</h4>
					<p>{ip}</p>

					<h4>GeoLoc</h4>
					<p>{JSON.stringify(geoLoc)}</p>
				</div>
			</div>
		</div>
	);
}

export default Home;

export async function getServerSideProps(context) {
	const links = await getLinks();
  const reduxStore = initializeStore()
	const { dispatch } = reduxStore;

	const movieQuery = queryBuilder({
		pagination: {
			number: 2,
			size: 20
		}
	});

	const featureQuery = queryBuilder({
		filter: {
			name: {
				eq: 'home-carousel'
			}
		},
		include: [
			'items.imageContent', 
			'items.actions.items',
		]
	});

	const ip = context?.req?.headers?.["x-forwarded-for"] ?? "0.0.0.0";

	const geoQuery = queryBuilder({
		geoSearch: {
			ip,
			minRadius: 16100,
			maxRadius: 40234
		}
	});


	const {
		data: { data: geoLoc },
	} = await httpClient(
		`${links.geoLocationSearch}${geoQuery}`
	);

	await Promise.all(
		[
			executeRequest(dispatch, links.ratingType), 
			executeRequest(dispatch, links.genre), 
			executeRequest(dispatch, `${links?.movie}${movieQuery}`), 
			executeRequest(dispatch, `${links?.featureList}${featureQuery}`), 
	])

	return {
		props: {
			initialReduxState: reduxStore.getState(),
			ip,
			geoLoc,
		},
	};
}
