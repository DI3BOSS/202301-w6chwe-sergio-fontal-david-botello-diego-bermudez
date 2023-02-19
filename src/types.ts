export interface RobotStructure {
  _id: { $oid: string };
  name: string;
  image: string;
  stats: {
    speed: number;
    endurance: number;
    dateOfCreation: number;
  };
}

export type RobotsStructure = RobotStructure[];

export interface RobotsApiResponseStructure {
  robots: RobotsStructure;
}
