let updateInstallInProgress = false;

export const markUpdateInstallInProgress = () => {
  updateInstallInProgress = true;
};

export const isUpdateInstallInProgress = () => updateInstallInProgress;
