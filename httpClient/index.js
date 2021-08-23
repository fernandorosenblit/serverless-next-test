import axios from "axios";

const APPLICATION_JSON = "application/json";
const CONTENT_TYPE = "Content-Type";
const API_KEY = "x-api-key";

const client = axios.create({
	baseURL: "https://api.dev.external.hollywood.com",
	headers: {
		Accept: APPLICATION_JSON,
		[CONTENT_TYPE]: APPLICATION_JSON,
		[API_KEY]: "kiC7PB8QCRio6XqFJmj3PiH6sbAsBhxYre6bSH9t",
	},
});

export default client;
