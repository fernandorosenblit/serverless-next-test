const Movie = ({ data, title }) => {
	return (
		<div>
			<h4>{title}</h4>
			<ul className="list">
				{data?.map((el) => (
					<li key={el.attributes.name}>
						{el.id} - {el.attributes.displayName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Movie;
