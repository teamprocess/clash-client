const getSearchFromWindow = () => {
  if (window.location.search) {
    return window.location.search;
  }

  const hash = window.location.hash ?? "";
  const queryIndex = hash.indexOf("?");
  return queryIndex >= 0 ? hash.slice(queryIndex) : "";
};

export const getAuthParams = (search?: string) => {
  const query = search && search.length > 0 ? search : getSearchFromWindow();
  const params = new URLSearchParams(query);
  const stateParam = params.get("state");
  const redirectUriParam = params.get("redirectUri");

  return {
    state: stateParam ?? "",
    redirectUri: redirectUriParam ?? "",
  };
};
