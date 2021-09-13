import * as AxiosLogger from "axios-logger";

const HOLLYWOOD_DOMAIN_REGEX = /.*hollywood.com/g;
const API_KEY = "x-api-key";
const apiKey = process.env.API_KEY;
const corsHost = process.env.CORS_HOST || "localhost";
const corsPort = process.env.CORS_PORT || 8080;

export default (client) => {
	client.interceptors.request.use((config) => {
		config.meta = config.meta || {};
		config.meta.requestStartedAt = new Date().getTime();

		if (config.url && config.url.match(HOLLYWOOD_DOMAIN_REGEX)) {
			config.headers = { ...config.headers, [API_KEY]: apiKey };

			if (process.env.NODE_ENV === "development") {
				config.url = `http://${corsHost}:${corsPort}/${config.url}`;
			}
		}

		return config;
	});

	client.interceptors.response.use(async (response) => {
		response.responseData = {
			url: response.config.url,
			time: new Date().getTime() - response.config.meta.requestStartedAt,
		};
		return response;
	});

	client.interceptors.request.use(AxiosLogger.requestLogger);
	client.interceptors.response.use(AxiosLogger.responseLogger, {
		dateFormat: "HH:MM:ss",
		status: false,
		data: false,
		headers: false,
	});
};
