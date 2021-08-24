import axios from "axios";

const APPLICATION_JSON = "application/json";
const CONTENT_TYPE = "Content-Type";
const API_KEY = "x-api-key";

const client = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		Accept: APPLICATION_JSON,
		[CONTENT_TYPE]: APPLICATION_JSON,
		[API_KEY]: process.env.API_KEY,
	},
});

export default client;
