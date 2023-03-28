export interface Capsule {
  slug: string;
  title: string;
  points?: Point[];
  created_at: string;
}

export interface Point {
  text: string;
  type: string;
  priority: number;
}
