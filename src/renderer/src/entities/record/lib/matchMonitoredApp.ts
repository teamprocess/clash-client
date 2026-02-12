export const matchMonitoredApp = (appName: string, monitoredApps: string[]) => {
  const loweredName = appName.toLowerCase();

  const exact = monitoredApps.find(candidate => candidate.toLowerCase() === loweredName);
  if (exact) {
    return exact;
  }

  const partialMatches = monitoredApps.filter(candidate => {
    const loweredCandidate = candidate.toLowerCase();
    return loweredName.includes(loweredCandidate) || loweredCandidate.includes(loweredName);
  });

  if (partialMatches.length === 0) {
    return null;
  }

  return partialMatches.sort((a, b) => b.length - a.length)[0];
};
