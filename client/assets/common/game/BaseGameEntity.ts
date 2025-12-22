import { Telegram } from "../message/Telegram"

export class BaseGameEntity extends cc.Component {
    private id: number
    private type: number
    private beTag: boolean

    protected position: cc.Vec2
    protected scale: cc.Vec2
    protected boundRadius: number

    static nextId = 1

    static getNextValidID() {
        return BaseGameEntity.nextId
    }

    static resetNextValidID() {
        BaseGameEntity.nextId = 0
    }

    public setID(val: number) {
        this.id = val
        BaseGameEntity.nextId = this.id + 1
    }

    public handleMessage(telegram: Telegram): boolean {
        return false
    }

    public update(dt: number): void {

    }

    public render(): void {

    }

    public getPos() {
        return this.position
    }

    public setPos(pos: cc.Vec2) {
        this.position = pos
    }

    public getScale() {
        return this.scale
    }

    public setScale(scale: cc.Vec2) {
        this.scale = scale
    }

    public getBoundRadius() {
        return this.boundRadius
    }

    public setBoundRadius(radius: number) {
        this.boundRadius = radius
    }

    public getID() {
        return this.id
    }

    public getType() {
        return this.type
    }

    public setType(type: number) {
        this.type = type
    }

    public getTag() {
        return this.beTag
    }

    public setTag(tag: boolean) {
        this.beTag = tag
    }
}