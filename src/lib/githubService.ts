export interface Repo {
  id: string;
  name: string;
  language: string;
  stars: number;
  commits: number;
  date: string;
  abandoned: boolean;
  code?: string;
}

const MOCK_DATA: Repo[] = [
  { id: '1', name: 'my-first-repo', language: 'javascript', stars: 10, commits: 50, date: '2019-03-14', abandoned: false },
  { id: '2', name: 'data-science-tool', language: 'python', stars: 150, commits: 200, date: '2020-05-20', abandoned: false },
  { id: '3', name: 'smart-contracts', language: 'solidity', stars: 1200, commits: 80, date: '2021-11-02', abandoned: false },
  { id: '4', name: 'high-perf-engine', language: 'rust', stars: 500, commits: 450, date: '2022-08-15', abandoned: false },
  { id: '5', name: 'web-framework', language: 'typescript', stars: 8500, commits: 1200, date: '2023-01-10', abandoned: false },
  { id: '6', name: 'old-project', language: 'ruby', stars: 5, commits: 10, date: '2018-01-01', abandoned: true },
];

export const fetchGithubData = async (username: string): Promise<Repo[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // In a real app, this would be:
    // const response = await fetch(`https://api.github.com/users/${username}/repos`);
    // if (!response.ok) throw new Error('Failed to fetch GitHub data');
    // return response.json();
    
    // For now, return mock data
    return MOCK_DATA;
  } catch (error) {
    console.error('GitHub fetch error:', error);
    throw error;
  }
};
