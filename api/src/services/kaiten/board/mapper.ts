export const toBoard = (data: any) => {
  return { id: data.id, title: data.title, firstColumnId: data.columns[0].id };
};

export const toBoardsList = (data: any[]) => {
  const result: any[] = [];
  data.map((item) => {
    result.push({ id: item.id, title: item.title });
  });
  return result;
};
export const toDeletedBoardId = (data: any) => {
  return { id: data.id };
};
