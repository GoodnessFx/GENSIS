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

const MOCK_DATA: Repo[] = [
  { 
    id: '1', 
    name: 'my-first-repo', 
    language: 'javascript', 
    stars: 10, 
    commits: 50, 
    date: '2019-03-14', 
    abandoned: false,
    codeSnippet: 'function helloWorld() {\n  console.log("Starting my journey...");\n  const tools = ["git", "js", "html"];\n  return tools.map(t => `Learning ${t}`);\n}'
  },
  { 
    id: '2', 
    name: 'data-science-tool', 
    language: 'python', 
    stars: 150, 
    commits: 200, 
    date: '2020-05-20', 
    abandoned: false,
    codeSnippet: 'import pandas as pd\nimport numpy as np\n\ndef process_data(df):\n    cleaned = df.dropna()\n    result = cleaned.groupby("category").mean()\n    return result'
  },
  { 
    id: '3', 
    name: 'smart-contracts', 
    language: 'solidity', 
    stars: 1200, 
    commits: 80, 
    date: '2021-11-02', 
    abandoned: false,
    codeSnippet: 'contract GenesisToken is ERC20 {\n    constructor() ERC20("Genesis", "GEN") {\n        _mint(msg.sender, 1000000 * 10**18);\n    }\n}'
  },
  { 
    id: '4', 
    name: 'high-perf-engine', 
    language: 'rust', 
    stars: 500, 
    commits: 450, 
    date: '2022-08-15', 
    abandoned: false,
    codeSnippet: 'pub fn optimize<T>(input: Vec<T>) -> Vec<T> {\n    input.into_par_iter()\n        .filter(|x| x.is_valid())\n        .collect()\n}'
  },
  { 
    id: '5', 
    name: 'web-framework', 
    language: 'typescript', 
    stars: 8500, 
    commits: 1200, 
    date: '2023-01-10', 
    abandoned: false,
    codeSnippet: 'export type Experience = {\n  id: string;\n  startedAt: Date;\n  metadata: Record<string, any>;\n};\n\nexport const initiateSequence = (exp: Experience) => {\n  return { ...exp, status: "active" };\n};'
  },
];

export const fetchGithubData = async (username: string): Promise<Repo[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    return MOCK_DATA;
  } catch (error) {
    console.error('GitHub fetch error:', error);
    throw error;
  }
};
