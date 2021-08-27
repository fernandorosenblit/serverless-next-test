import { Provider } from "react-redux";
import { useStore } from "state/store";
import Link from "next/link";

import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);

	return (
		<Provider store={store}>
			<nav>
				<Link activeClassName="active" href="/">
					Static Generation without data
				</Link>
				<Link activeClassName="active" href="/sgd">
					Static Generation with data
				</Link>
				<Link activeClassName="active" href="/ssr">
					Server-side Rendering
				</Link>
			</nav>
			<div className="layout">
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
