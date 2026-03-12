export interface ApplyProfileImageRequest {
  profileImageUrl: string;
}

export interface ApplyProfileImageResponse {
  success: boolean;
  message: string;
  data: {
    profileImageUrl: string;
  };
}
