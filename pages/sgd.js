import { useEffect, useState } from "react";
import Image from "next/image";

import httpClient from "httpClient";
import List from "components/Home/List";

import bg from "assets/concierge-background.png";
import styles from "styles/Home.module.scss";

const corsHost = process.env.CORS_HOST || "localhost";
const corsPort = process.env.CORS_PORT || 8080;

function Home({ serviceLinks, movie, ratingType, genre, featureList }) {
	const [clientMovies, setClientMovies] = useState([]);
	const [ip, setIp] = useState(null);
	const [geoLoc, setGeoLoc] = useState(null);

	const getMovies = async () => {
		try {
			const { data } = await httpClient(
				`http://${corsHost}:${corsPort}/${serviceLinks?.movie}?page%5Bnumber%5D=2&page%5Bsize%5D=10`
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
				`http://${corsHost}:${corsPort}/${serviceLinks.geoLocationSearch}?geoSearch[ip]='${_ip}'&geoSearch[minRadius]=16100&geoSearch[maxRadius]=40234`
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
				<List title="Movie" data={[...movie, ...clientMovies]} />
				<List title="Rating type" data={ratingType} />
				<List title="Genre" data={genre} />
				<List title="Feature List" data={featureList} />
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
	const homeUrl = process.env.API_URL;
	const {
		data: {
			data: { links },
		},
	} = await httpClient(homeUrl);

	const mainLink = links[locale];

	const {
		data: {
			data: { links: serviceLinks },
		},
	} = await httpClient(mainLink);

	const {
		data: { data: movie },
	} = await httpClient(
		`${serviceLinks?.movie}?page%5Bnumber%5D=1&page%5Bsize%5D=10`
	);

	const {
		data: { data: ratingType },
	} = await httpClient(serviceLinks.ratingType);

	const {
		data: { data: genre },
	} = await httpClient(serviceLinks.genre);

	const {
		data: { data: featureList },
	} = await httpClient(
		`${serviceLinks.featureList}?filter=name%20eq%20%27home-carousel%27&include=items.imageContent,items.actions.items `
	);

	return {
		props: {
			mainLink,
			serviceLinks,
			movie,
			ratingType,
			genre,
			featureList,
		},
	};
}
