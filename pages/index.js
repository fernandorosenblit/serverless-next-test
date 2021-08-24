import { useEffect, useState } from "react";
import httpClient from "httpClient";
import FeatureList from "components/Home/FeatureList/FeatureList";
import Image from "next/image";
import bg from "assets/concierge-background.png";

import styles from "styles/Home.module.scss";

const corsHost = process.env.CORS_HOST || "localhost";
const corsPort = process.env.CORS_PORT || 8080;

function Home({ ssrMovies, serviceLinks }) {
	const [clientMovies, setClientMovies] = useState([]);
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

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div className={styles.container}>
			<h1>Hollywood web</h1>
			<Image src={bg} alt="Image from S3" />
			<FeatureList movies={[...ssrMovies.data, ...clientMovies]} />
		</div>
	);
}

export default Home;

export async function getServerSideProps() {
	const homeUrl = process.env.API_URL;
	const {
		data: {
			data: { links },
		},
	} = await httpClient(homeUrl);

	const intLink = links["en-us"];

	const {
		data: {
			data: { links: serviceLinks },
		},
	} = await httpClient(intLink);

	const { data } = await httpClient(
		`${serviceLinks?.movie}?page%5Bnumber%5D=1&page%5Bsize%5D=10`
	);

	https: return {
		props: {
			mainLink: intLink,
			serviceLinks,
			ssrMovies: data,
		},
	};
}
