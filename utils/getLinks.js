import httpClient from "httpClient";

export default async function getLinks() {
  const homeUrl = process.env.NEXT_PUBLIC_API_URL;
	const {
		data: {
			data: { links },
		},
		responseData: responseDataLocales
	} = await httpClient(homeUrl);

	const intLink = links["en-us"];

	const {
		data: {
			data: { links: serviceLinks },
		},
		responseData: responseDataLinks
  } = await httpClient(intLink);
  
  return { links: serviceLinks, responseData: [responseDataLocales, responseDataLinks] };
}
