export interface Capsule {
  slug: string;
  title: string;
  sentiment?: number;
  tags?: Tag[];
  locations?: Location[];
  institutions?: Institution[];
  people?: Person[];
  points?: Point[];
  created_at: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Location {
  name: string;
  slug: string;
  info?: LocationInfo;
}

export interface Institution {
  name: string;
  slug: string;
  description: string;
}

export interface Person {
  name: string;
  slug: string;
  description: string;
}

export interface Point {
  text: string;
  type: string;
  priority: number;
}

export interface LocationInfo {
  alpha_2: string;
  alpha_3: string;
  flag: string;
  name: string;
  numeric: string;
  official_name: string;
}
