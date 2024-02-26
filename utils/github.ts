type ContributionDay = {
	date: string;
	contributionCount: number;
	contributionLevel: string;
};

type Week = {
	contributionDays: ContributionDay[];
};

export const fetchGithubRepoInfo = defineCachedFunction(
	async (repo: string) => {
		const config = useRuntimeConfig();
		const APIKEY: string = config.apiSecret;
		const APIURL: string = config.public.apiBase;

		const result = await $fetch(`${APIURL}/${repo}`, {
			headers: {
				Authorization: `Bearer ${APIKEY}`,
			},
		});

		return {
			stars: result.stargazers_count,
			forks: result.forks_count,
			html_url: result.html_url,
			created_at: result.created_at,
			homepage: result.homepage,
		};
	},
	{
		maxAge: 60 * 60, // 1 hour
		name: "githubRepoInfo",
		getKey: (repo: string) => repo,
	},
);

export const fetchGitHubContributions = defineCachedFunction(
	async (login: string, apiSecret: string) => {
		const year = new Date().getFullYear();
		const query = `
        query {
            user(login: "${login}"){
                name
                avatarUrl
                contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                contributionLevel
                            }
                        }
                    }
                }
            }
        }`;

		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiSecret}`,
			},
			body: JSON.stringify({ query }),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch GitHub contributions");
		}

		const data = await response.json();

		return {
			name: data.data.user.name,
			avatarUrl: data.data.user.avatarUrl,
			totalContributions:
				data.data.user.contributionsCollection.contributionCalendar
					.totalContributions,
			contributions:
				data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
					(week: Week) =>
						week.contributionDays.map((day: ContributionDay) => ({
							date: day.date,
							contributionCount: day.contributionCount,
							contributionLevel: day.contributionLevel,
						})),
				),
		};
	},
	{
		maxAge: 60 * 60 * 24, // Cache for 1 day
		name: "githubContributions",
		getKey: (login: string) =>
			`contributions-${login}-${new Date().getFullYear()}`,
	},
);
