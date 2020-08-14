import { HeroJob, HeroActionOpts } from './hero';

export interface SkillBook {
  uuid: string;
  name: string;
  cost: bigint;
  sprite: number;

  actionCaller: string;
  messageCaller: string;

  requiredJobs?: HeroJob[];
  actionOpts: HeroActionOpts;
}

export type SkillBookPreset = {
  name: string;
  sprite: number;
  jobs?: HeroJob[];
  changeableStats: Array<keyof HeroActionOpts>;
  action: string;
  message: string;
  baseStats: Record<keyof HeroActionOpts, number>;
  statMults: Record<keyof HeroActionOpts, (val: number) => number>;
};
