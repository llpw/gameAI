import { StateMachine } from "../../common/fsm/StateMachine";
import { BaseGameEntity } from "../../common/game/BaseGameEntity";
import { Telegram } from "../../common/message/Telegram";
import { LocationType } from "./WestWorldEnum";
import { doHouseWork, wifeGlobalState } from "./wifeState/WifeState";

const { ccclass, property } = cc._decorator

@ccclass('MinerWife')
export default class MinerWife extends BaseGameEntity {

    @property(cc.Label) tips: cc.Label = null

    private stateMachine: StateMachine

    private entity: BaseGameEntity

    private location: LocationType

    private cooking: boolean

    constructor() {
        super()
        this.setID(BaseGameEntity.nextId)
        this.location = null
        this.stateMachine = new StateMachine(this)
        this.stateMachine.setCurrentState(doHouseWork)
        this.stateMachine.setGlobalState(wifeGlobalState)
        this.cooking = false
    }

    getFSM() {
        return this.stateMachine
    }

    update(dt: number): void {
        this.stateMachine.update()
    }

    updateTip(tip: string) {
        console.log(tip)
        this.tips.string = tip
    }

    handleMessage(telegram: Telegram): boolean {
        return this.stateMachine.handleMessage(telegram)
    }
}