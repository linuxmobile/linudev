export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const APIKEY: string = config.apiSecret;
	const APIURL: string = config.public.apiBase;

	const repo: string = event.context.params.repo;

	try {
		const result = await $fetch(`${APIURL}/${repo}`, {
			headers: {
				Authorization: `Bearer ${APIKEY}`,
			},
		});
		const filteredResult = {
			stars: result.stargazers_count,
			forks: result.forks_count,
			html_url: result.html_url,
			created_at: result.created_at,
			homepage: result.homepage,
		};

		return filteredResult;
	} catch (error) {
		console.error(error);
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
		});
	}
});