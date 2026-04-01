export const getCountLabel = (count: number, singular: string, plural: string) => {
  return count === 1 ? singular : plural;
};
