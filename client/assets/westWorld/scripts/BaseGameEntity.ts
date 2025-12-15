
export default class BaseGameEntity extends cc.Component {

    protected id: number

    static nextId: number = 0

    setID(val: number) {
        this.id = val
    }

    getID() {
        return this.id
    }

    update(dt: number): void {

    }


}
