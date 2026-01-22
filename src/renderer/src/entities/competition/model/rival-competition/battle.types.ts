export type UpperHand = "우세" | "열세" | "동률";

// 전체 배틀 정보 조회
interface BattlesProps {
  battleId: number;
  rivalName: string;
  rivalUsername: string;
  rivalProfileImage: string;
  status: string; // or enumUtil
  expireDate: string;
}

export interface BattleData {
  battles: BattlesProps[];
}

// 배틀 상세 정보 조회
interface EnemyProps {
  id: number;
  name: string;
  username: string;
  profileImage: string;
}

export interface BattleDetailData {
  id: number;
  email: EnemyProps[];
  expireDate: string;
  myOverallPercentage: number;
}
