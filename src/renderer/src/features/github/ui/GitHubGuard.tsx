import { useGetMyProfile } from "@/entities/user";
import { useSignOut } from "@/features/auth";
import { useGitHub } from "../model/useGitHub";
import { GitHubDialog } from "./GitHubDialog";

export const GitHubGuard = () => {
  const { data: user } = useGetMyProfile();
  const { startGitHubConnect, isConnecting, error } = useGitHub();
  const { signOut, isLoading: isSigningOut, error: signOutError } = useSignOut();

  const isOpen = Boolean(user && !user.githubLinked);

  return (
    <GitHubDialog
      isOpen={isOpen}
      isConnecting={isConnecting}
      error={error}
      onStartGitHubConnect={startGitHubConnect}
      onSignOut={signOut}
      isSigningOut={isSigningOut}
      signOutError={signOutError}
    />
  );
};
