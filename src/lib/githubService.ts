export interface Repo {
  id: string;
  name: string;
  language: string;
  stars: number;
  commits: number;
  date: string;
  abandoned: boolean;
  codeSnippet?: string;
}

export const fetchGithubData = async (username: string): Promise<Repo[]> => {
  try {
    const res = await fetch(`/api/github/repos?username=${encodeURIComponent(username)}`);
    if (!res.ok) {
      throw new Error('GitHub user or repos not found');
    }
    const data = await res.json();
    type GithubRepoApi = {
      id: number;
      name: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      size: number;
      created_at: string;
      pushed_at: string;
    };
    const repos: Repo[] = (data as GithubRepoApi[]).slice(0, 60).map((r) => {
      const pushed = new Date(r.pushed_at);
      const oneYear = 365 * 24 * 60 * 60 * 1000;
      const abandoned = Date.now() - pushed.getTime() > oneYear;
      const commitsApprox = Math.max(5, Math.round((r.size / 10) + r.stargazers_count + r.forks_count));
      return {
        id: String(r.id),
        name: r.name,
        language: r.language || 'other',
        stars: r.stargazers_count || 0,
        commits: commitsApprox,
        date: r.created_at,
        abandoned,
      } as Repo;
    });
    return repos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error('GitHub fetch error:', error);
    throw error;
  }
};
