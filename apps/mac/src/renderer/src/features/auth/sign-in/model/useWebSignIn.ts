import { useElectronAuthFlow } from "./useElectronAuthFlow";

export const useWebSignIn = () => {
  const { error, isStarting, startWebSignIn, startWebSignUp } = useElectronAuthFlow();

  return {
    error,
    isStarting,
    startWebSignIn,
    startWebSignUp,
  };
};
