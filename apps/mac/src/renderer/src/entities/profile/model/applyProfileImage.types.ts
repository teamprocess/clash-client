export interface PostProfileImagePresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PostProfileImagePresignedUrlResponse {
  uploadUrl: string;
  objectKey: string;
  fileUrl: string;
  httpMethod: "PUT";
  contentType: string;
  expiresInSeconds: number;
}

export interface ApplyProfileImageRequest {
  profileImageUrl: string;
}

export interface ApplyProfileImageResponse {
  profileImageUrl: string;
}
