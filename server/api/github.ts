import { fetchGitHubContributions } from "~/utils/github";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const login = "linuxmobile";
	try {
		const userInfo = await fetchGitHubContributions(login, config.apiSecret);
		return userInfo;
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			statusMessage: "An error occurred while fetching GitHub contributions",
		});
	}
});
