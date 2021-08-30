import { useEffect, useState } from "react";
import Image from "next/image";
import httpClient from "httpClient";
import { useSelector } from "react-redux";


import { initializeStore } from "state/store";
import getLinks from 'utils/getLinks';
import List from "components/Home/List";
import queryBuilder from 'utils/queryBuilder';
import executeRequest from 'utils/executeRequest';
import { RELS } from 'constants/entityRels';

import bg from "assets/concierge-background.png";
import styles from "styles/Home.module.scss";

const {
	featuredList,
	featureImageContent
} = RELS;

const corsHost = process.env.CORS_HOST || "localhost";
const corsPort = process.env.CORS_PORT || 8080;

function Home({ links }) {
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
	const [clientMovies, setClientMovies] = useState([]);
	const [ip, setIp] = useState(null);
	const [geoLoc, setGeoLoc] = useState(null);

	const getMovies = async () => {
		try {
			const { data } = await httpClient(
				`http://${corsHost}:${corsPort}/${links?.movie}?page%5Bnumber%5D=2&page%5Bsize%5D=10`
			);
			setClientMovies(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getUserIp = async () => {
		try {
			const {
				data: { ip },
			} = await httpClient(
				`http://${corsHost}:${corsPort}/https://api.ipify.org/?format=json`
			);
			setIp(ip);
		} catch (error) {
			console.log(error);
		}
	};

	const getUserGeoLoc = async () => {
		const _ip = "65.214.128.177";
		try {
			const {
				data: { data },
			} = await httpClient(
				`http://${corsHost}:${corsPort}/${links.geoLocationSearch}?geoSearch[ip]='${_ip}'&geoSearch[minRadius]=16100&geoSearch[maxRadius]=40234`
			);
			setGeoLoc(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMovies();
		getUserIp();
	}, []);

	useEffect(() => {
		getUserGeoLoc();
	}, [ip]);

	return (
		<div className={styles.container}>
			<h1>Hollywood web</h1>
			<Image src={bg} alt="Image from S3" />

			<h2></h2>
			<div className="container">
				<List title="Movie" data={[...movies, ...clientMovies]} />
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

export async function getStaticProps({ locale }) {
	const links = await getLinks();
  const reduxStore = initializeStore()
	const { dispatch } = reduxStore;

	const movieQuery = queryBuilder({
		pagination: {
			number: 1,
			size: 10
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

	await Promise.all(
		[
			executeRequest(dispatch, links.ratingType), 
			executeRequest(dispatch, links.genre), 
			executeRequest(dispatch, `${links?.movie}${movieQuery}`), 
			executeRequest(dispatch, `${links?.featureList}${featureQuery}`), 
	])

	return { props: { initialReduxState: reduxStore.getState(), links} };
}
