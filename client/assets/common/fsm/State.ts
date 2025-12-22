import { BaseGameEntity } from "../game/BaseGameEntity";

export class State {
    enter(entity: BaseGameEntity) { }
    execute(entity: BaseGameEntity) { }
    exit(entity: BaseGameEntity) { }
    onMessage(entity: BaseGameEntity, message: any): boolean { return false }
}