import styles from "styles/FeatureList.module.scss";

const FeatureList = ({ movies }) => {
	return (
		<div>
			{movies.map((movie) => (
				<div key={movie?.attributes?.image?.urlAltText}>
					<img
						className={styles.movie}
						src={movie?.attributes?.image?.url}
						alt={movie?.attributes?.image?.urlAltText}
					/>
					<p>{movie?.attributes?.image?.urlAltText}</p>
				</div>
			))}
		</div>
	);
};

export default FeatureList;
