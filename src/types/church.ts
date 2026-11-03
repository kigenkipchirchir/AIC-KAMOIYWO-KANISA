export interface ServiceTime {
  day: string;
  name: string;
  time: string;
  audience: string;
  location: string;
  description: string;
  badge?: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  role: string;
  date: string;
  series: 'Faith & Grace' | 'Family Life' | 'Youth Series' | 'Walking in the Spirit' | 'General';
  scripture: string;
  duration: string;
  description: string;
  keyPoints: string[];
  audioUrl: string;
  isFeatured?: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  shortName: string;
  swahiliName: string;
  category: 'fellowship' | 'service' | 'youth' | 'outreach';
  leader: string;
  leaderTitle: string;
  meetingTime: string;
  meetingPlace: string;
  description: string;
  objectives: string[];
  membersCount: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  time: string;
  location: string;
  category: 'revival' | 'fellowship' | 'youth' | 'outreach' | 'community';
  description: string;
  speaker?: string;
  isFeatured?: boolean;
}

export interface Leader {
  name: string;
  role: string;
  title: string;
  bio: string;
  phone?: string;
  verse?: string;
}

export interface GivingAccount {
  id: string;
  name: string;
  code: string;
  description: string;
  suggestedAmounts: number[];
}
