import styles from "styles/FeatureList.module.scss";

const FeatureList = ({ movies }) => {
	return (
		<ul className={styles.featuredList}>
			{movies.map((movie) => (
				<li key={movie.attributes.name}>
					{movie.id} - {movie.attributes.displayName}
				</li>
			))}
		</ul>
	);
};

export default FeatureList;
