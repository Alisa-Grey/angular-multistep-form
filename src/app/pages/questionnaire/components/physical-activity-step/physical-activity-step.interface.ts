export enum PhysicalActivityIds {
  miminal = 'minimal',
  normal = 'normal',
  high = 'high',
  sport = 'sport',
}

export interface IPhysicalActivityItem {
  id: string;
  title: string;
  description: string;
}
