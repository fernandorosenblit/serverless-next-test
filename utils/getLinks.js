import httpClient from "httpClient";

export default async function getLinks() {
  const homeUrl = process.env.API_URL;
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
  
  return serviceLinks;
}
