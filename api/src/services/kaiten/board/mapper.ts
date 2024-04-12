export const toBoard = (data: any) => {
    return { id: data.id, title: data.title, firstColumnId: data.columns[0].id }
}

export const toBoardsList = (data: any[]) => {
    const boards: any[] = []
    data.map((item) => {
        boards.push({ id: item.id, title: item.title })
    })
    return { boards }
}
export const toDeletedBoardId = (data: any) => {
    return { id: data.id }
}
