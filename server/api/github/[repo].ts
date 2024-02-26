import { fetchGithubRepoInfo } from "~/utils/github";
export default defineEventHandler(async (event) => {
	const repo: string = event.context.params.repo;

	try {
		const result = await fetchGithubRepoInfo(repo);
		return result;
	} catch (error) {
		console.error(error);
		return createError({
			statusCode: 500,
			statusMessage: "Internal Server Error",
		});
	}
});
