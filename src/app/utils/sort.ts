export const sort = (items: { description: string; value: string }[]) => {
  return items.slice().sort((a, b) => parseInt(a.value) - parseInt(b.value));
};
