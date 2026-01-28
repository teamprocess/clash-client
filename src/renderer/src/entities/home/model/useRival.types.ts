export interface UserType {
  userId: number;
  userName: string;
  gitHubId: string;
  profileImage: string;
}

export interface UsersResponse {
  users: UserType[];
}

// post API 연결 예정
