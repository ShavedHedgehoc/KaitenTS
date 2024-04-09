export const toSpacesList = (data: any[]) => {
  const result: any[] = [];
  data.map((item) => {
    result.push({ id: item.id, title: item.title });
  });
  return result;
};
