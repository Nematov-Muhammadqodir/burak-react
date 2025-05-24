import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
  _id: string;
  memberStatus: MemberStatus;
  memberType: MemberType;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberPassword: string;
  memberNick: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}
