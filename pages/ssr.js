import httpClient from "httpClient";
import { useSelector } from "react-redux";

import List from "components/Home/List";
import Featured from 'components/home/Featured/Featured';
import { initializeStore } from "state/store";
import getLinks from 'utils/getLinks';
import queryBuilder from 'utils/queryBuilder';
import executeRequest from 'utils/executeRequest';
import styles from "styles/Home.module.scss";

function Home({ ip, geoLoc, links, queriesRountrip }) {
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
			<Featured />
			<div className="container">
				<List title="Movie" data={movies} />
				<List title="Rating type" data={ratingTypes} />
				<List title="Genre" data={genres} />
				<List title="Feature List" data={featureListAux} />
				<div className="rountrip">
					<div className="rountrip-titles">
						<h4>Queries</h4>
						<h4>Rountrip</h4>
					</div>
					<ul className="list">
						{queriesRountrip?.map(({ url, time }) => (
							<li key={url}>
								<div className="rountrip-row">
									<span className="rountrip-row__url">{url}</span>
									<span>{time} miliseconds</span>
								</div>
							</li>
						))}
					</ul>
				</div>
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
	const { links, responseData } = await getLinks();
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

	const featuredMovies = queryBuilder({
		filter: {
			id: {
				in: [1155,1029,1130]
			}
		},
		include: [
			'textContent', 
			'ragings',
			'ratingType',
			'genres',
			'imageContent'
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

	const {
		data: featuredData,
	} = await httpClient(
		`${links?.featureList}${featureQuery}`
	);

	const queriesRountrip = await Promise.all(
		[
			executeRequest(dispatch, links.ratingType), 
			executeRequest(dispatch, links.genre), 
			executeRequest(dispatch, `${links?.movie}${movieQuery}`),
			executeRequest(dispatch, `https://api.inventory.dev.external.hollywood.com/en-us/movie?filter=id%20in(1155,1029,1130)&include=textContent,ratings.ratingType,genres,imageContent`), 
			executeRequest(dispatch, `${links?.featureList}${featureQuery}`), 
	])

	responseData.forEach(r => queriesRountrip.push(r));

	return {
		props: {
			initialReduxState: reduxStore.getState(),
			ip,
			geoLoc,
			links,
			queriesRountrip
		},
	};
}
