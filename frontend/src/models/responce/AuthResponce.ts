import { IUser } from '../IUser'

export interface AuthResponce {
    user: IUser
    token: string
}
