
export default abstract class BaseGameEntity {

    private id: number

    static nextId: number = 0

    setID(val: number) {
        this.id = val
    }

    getID() {
        return this.id
    }

    abstract update(dt: number): void


}
