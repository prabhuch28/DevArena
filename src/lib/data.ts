export const userStats = {
  xp: 12500,
  coins: 875,
  rank: 42,
  dailyStreak: 7,
  challengesCompleted: 58,
  accuracy: 89,
};

export const problemsByCategory = [
  { category: 'Arrays', solved: 15, fill: 'var(--color-arrays)' },
  { category: 'Strings', solved: 12, fill: 'var(--color-strings)' },
  { category: 'Trees', solved: 8, fill: 'var(--color-trees)' },
  { category: 'Graphs', solved: 5, fill: 'var(--color-graphs)' },
  { category: 'DP', solved: 10, fill: 'var(--color-dp)' },
  { category: 'Misc', solved: 8, fill: 'var(--color-misc)' },
];

export const submissionAccuracy = [
    { status: 'Accepted', value: 89, fill: 'var(--color-accepted)' },
    { status: 'Wrong Answer', value: 11, fill: 'var(--color-rejected)' },
]

export const dailyMissions = [
  { id: 1, title: 'Solve a "Medium" Array problem', completed: true },
  { id: 2, title: 'Complete one 1v1 Duel', completed: true },
  { id: 3, title: 'Review a Graph theory concept', completed: false },
];

export const challenges = {
  beginner: [
    { id: 'B1', title: 'Two Sum', difficulty: 'Easy', xp: 50, category: 'Arrays' },
    { id: 'B2', title: 'Reverse a String', difficulty: 'Easy', xp: 50, category: 'Strings' },
    { id: 'B3', title: 'Check for Palindrome', difficulty: 'Easy', xp: 50, category: 'Strings' },
  ],
  intermediate: [
    { id: 'I1', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', xp: 150, category: 'Strings' },
    { id: 'I2', title: 'Validate Binary Search Tree', difficulty: 'Medium', xp: 150, category: 'Trees' },
    { id: 'I3', title: 'Kth Smallest Element in a BST', difficulty: 'Medium', xp: 150, category: 'Trees' },
  ],
  pro: [
    { id: 'P1', title: 'Trapping Rain Water', difficulty: 'Hard', xp: 300, category: 'Arrays' },
    { id: 'P2', title: 'Longest Valid Parentheses', difficulty: 'Hard', xp: 300, category: 'Strings' },
    { id: 'P3', title: 'Word Ladder', difficulty: 'Hard', xp: 300, category: 'Graphs' },
  ],
};

export const allChallenges = [
  ...challenges.beginner,
  ...challenges.intermediate,
  ...challenges.pro,
];

export const leaderboard = [
    { rank: 1, name: 'CyberByte', xp: 98500, avatarSeed: '101' },
    { rank: 2, name: 'LogicLane', xp: 95200, avatarSeed: '102' },
    { rank: 3, name: 'GlitchMaster', xp: 91800, avatarSeed: '103' },
    { rank: 4, name: 'CodeCrusher', xp: 88400, avatarSeed: '104' },
    { rank: 5, name: 'AlgoQueen', xp: 85100, avatarSeed: '105' },
    { rank: 6, name: 'SyntaxSlayer', xp: 81500, avatarSeed: '106' },
    { rank: 7, name: 'DataDaemon', xp: 78200, avatarSeed: '107' },
    { rank: 8, name: 'BitBender', xp: 75900, avatarSeed: '108' },
    { rank: 9, name: 'KernelKing', xp: 72300, avatarSeed: '109' },
    { rank: 10, name: 'LoopLord', xp: 69800, avatarSeed: '110' },
];

export const communityPosts = [
    {
      id: 1,
      name: 'AlgoQueen',
      avatarSeed: '105',
      time: '2h ago',
      content: 'Just cracked the "Trapping Rain Water" problem! That two-pointer approach is so elegant. Feeling accomplished! 🚀 #DSA #HardProblem'
    },
    {
      id: 2,
      name: 'LogicLane',
      avatarSeed: '102',
      time: '5h ago',
      content: 'Anyone have tips for getting better at Dynamic Programming? I understand the concept but struggle with the implementation. Any good resources?'
    },
    {
      id: 3,
      name: 'SyntaxSlayer',
      avatarSeed: '106',
      time: '1d ago',
      content: 'Hit a 30-day coding streak on AlgoVerse! Consistency is key. The daily missions really help keep me motivated. 🔥'
    },
    {
      id: 4,
      name: 'BitBender',
      avatarSeed: '108',
      time: '2d ago',
      content: 'Participated in my first 1v1 duel today. Lost, but it was a great learning experience. The time pressure really forces you to think fast!'
    }
];
