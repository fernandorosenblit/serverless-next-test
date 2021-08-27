import httpClient from "httpClient";
import List from "components/Home/List";

import styles from "styles/Home.module.scss";

function Home({ movie, ratingType, genre, featureList, ip, geoLoc }) {
	return (
		<div className={styles.container}>
			<div className="container">
				<List title="Movie" data={movie} />
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

export async function getServerSideProps(context) {
	const homeUrl = process.env.API_URL;
	const {
		data: {
			data: { links },
		},
	} = await httpClient(homeUrl);

	const mainLink = links[context.locale];
	const {
		data: {
			data: { links: serviceLinks },
		},
	} = await httpClient(mainLink);

	const {
		data: { data: movie },
	} = await httpClient(
		`${serviceLinks?.movie}?page%5Bnumber%5D=2&page%5Bsize%5D=20`
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

	const ip = context?.req?.headers?.["x-forwarded-for"] ?? "0.0.0.0";

	const {
		data: { data: geoLoc },
	} = await httpClient(
		`${serviceLinks.geoLocationSearch}?geoSearch[ip]='${ip}'&geoSearch[minRadius]=16100&geoSearch[maxRadius]=40234`
	);

	return {
		props: {
			mainLink,
			serviceLinks,
			movie,
			ratingType,
			genre,
			featureList,
			ip,
			geoLoc,
		},
	};
}
