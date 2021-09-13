import { Provider } from "react-redux";
import { useStore } from "state/store";
import Link from "next/link";
import httpClient from 'httpClient';
import apiKeyInterceptor from 'httpClient/apiKeyInterceptor';

import MetricsBar from 'components/common/Metrics/MetricsBar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "styles/globals.scss";

apiKeyInterceptor(httpClient);

export const dispatchMetricEvent = (metric) => {
  const event = new CustomEvent(`metric-event`, { detail: { value: metric?.label ? metric.value : metric.startTime, name: metric.name }});
  window?.dispatchEvent(event);
};

// Catch errors since some browsers throw when using the new `type` option.
// https://bugs.webkit.org/show_bug.cgi?id=209216
try {
  // Create the performance observer.
  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
			dispatchMetricEvent(entry.toJSON());
    }
  });
  // Start listening for `paint` entries to be dispatched.
	po.observe({ type: 'paint', buffered: true });
} catch (e) {
  // Do nothing if the browser doesn't support this API.
}

export function reportWebVitals(metric) {
	dispatchMetricEvent(metric);
}

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
			<MetricsBar />
		</Provider>
	);
}

export default MyApp;
