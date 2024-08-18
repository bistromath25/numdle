export const shuffle = (x: any[]) => {
  return x.slice().sort((a, b) => 0.5 - Math.random());
};
