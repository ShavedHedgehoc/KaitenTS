// export const KaitenSpaces = [283675, 283756]

// export enum KaitenWorkSpaces {
//     PYSKAREVSKY = 283675,
//     KOLPINO = 358199,
// }

// export enum KaitenArchiveSpaces {
//     PYSKAREVSKY = 283756,
//     KOLPINO = 358201,
// }

export interface IPlant {
    id: number
    name: string
    workBoard: number
    archiveBoard: number
}

export const Plants: IPlant[] = [
    { id: 0, name: 'Пискаревский', workBoard: 283675, archiveBoard: 283756 },
    { id: 1, name: 'Колпино', workBoard: 358199, archiveBoard: 358201 },
    // { id: 2, name: 'Новый офигенный завод', workBoard: 358199, archiveBoard: 358201 },
]
