import { placeholderImages } from '@/lib/placeholder-images.json';

const userAvatars = placeholderImages.filter(img => img.imageHint === 'person').slice(0, 10);

export const leaderboardData = [
  {
    rank: 1,
    name: 'Sophia "The Compiler" Chen',
    xp: 9850,
    avatarUrl: userAvatars[0].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 2,
    name: 'Liam "Code Ninja" Rodriguez',
    xp: 9600,
    avatarUrl: userAvatars[1].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 3,
    name: 'Olivia "Data Queen" Patel',
    xp: 9400,
    avatarUrl: userAvatars[2].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 4,
    name: 'Noah "The Alchemist" Abebe',
    xp: 9150,
    avatarUrl: userAvatars[3].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 5,
    name: 'Ava "The Architect" Miller',
    xp: 8900,
    avatarUrl: userAvatars[4].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 6,
    name: 'Jackson "The Debugger" Kim',
    xp: 8750,
    avatarUrl: userAvatars[5].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 7,
    name: 'Isabella "The Futurist" Garcia',
    xp: 8500,
    avatarUrl: userAvatars[6].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 8,
    name: 'Aiden "The Voyager" Singh',
    xp: 8200,
    avatarUrl: userAvatars[7].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 9,
    name: 'Mia "The Oracle" Johnson',
    xp: 8050,
    avatarUrl: userAvatars[8].imageUrl,
    avatarHint: 'person',
  },
  {
    rank: 10,
    name: 'Lucas "The Maverick" Brown',
    xp: 7800,
    avatarUrl: userAvatars[9].imageUrl,
    avatarHint: 'person',
  },
];
