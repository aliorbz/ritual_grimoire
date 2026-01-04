
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in seconds
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Eldritch';
  enabled: boolean;
  previewUrl?: string;
}

export interface QuizProgress {
  topicId: string;
  currentIndex: number;
  answers: (number | null)[];
  questionIndices: number[]; // Indices of the selected subset from the topic's master questions
  startTime: number; // timestamp
}

export interface Attempt {
  id?: string;
  session_id: string;
  display_name: string;
  topic_id: string;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  created_at?: string;
}

export interface UserSession {
  displayName: string | null;
  sessionId: string;
}
