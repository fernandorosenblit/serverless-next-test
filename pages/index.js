import httpClient from "httpClient";
import FeatureList from "components/Home/FeatureList/FeatureList";
import Image from "next/image";
import bg from "assets/concierge-background.png";

import styles from "styles/Home.module.scss";

function Home({ featureList }) {
	return (
		<div className={styles.container}>
			<h1>Hollywood web</h1>
			<Image src={bg} alt="Image from S3" />
			<FeatureList movies={featureList} />
		</div>
	);
}

export default Home;

export async function getServerSideProps() {
	const homeUrl = "https://api.dev.external.hollywood.com";
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
		`${serviceLinks?.featureList}?filter=name%20eq%20%27home-carousel%27&include=items.imageContent,items.actions.items`
	);

	https: return {
		props: {
			mainLink: intLink,
			serviceLinks,
			featureList: data?.included?.filter(
				(item) => item.type === "featuredListItemImageContent"
			),
		},
	};
}
