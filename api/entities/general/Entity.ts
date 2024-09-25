import { v4 as uuidV4 } from 'uuid'

export class Entity<T>{

    public readonly id: string
    public props: T

    constructor(
        props: T,
        id?: string
    ) {
        this.id = id || uuidV4()
        this.props = props
    }
}