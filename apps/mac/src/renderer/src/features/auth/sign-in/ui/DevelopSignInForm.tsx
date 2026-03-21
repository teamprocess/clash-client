import * as S from "./DevelopSignInForm.style";
import { useDevelopSignIn } from "@/features/auth/sign-in/model/useDevelopSignIn";
import { Button } from "@/shared/ui";

export const DevelopSignInForm = () => {
  const {
    error,
    handlePasswordChange,
    handleSignInSubmit,
    handleUsernameChange,
    isStarting,
    password,
    username,
  } = useDevelopSignIn();

  return (
    <S.FormContainer onSubmit={handleSignInSubmit}>
      <S.Title>개발 서버 로그인</S.Title>
      <S.FieldGroup>
        <S.Field>
          <S.Label htmlFor="username">아이디</S.Label>
          <S.Input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="username"
            placeholder="아이디를 입력하세요."
            disabled={isStarting}
          />
        </S.Field>
        <S.Field>
          <S.Label htmlFor="password">비밀번호</S.Label>
          <S.Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요."
            disabled={isStarting}
          />
        </S.Field>
      </S.FieldGroup>
      <S.ButtonWrapper>
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isStarting}>
          {isStarting ? "로그인 중..." : "로그인"}
        </Button>
        {error && <S.ErrorText>{error}</S.ErrorText>}
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
