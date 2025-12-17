import BaseGameEntity from "./BaseGameEntity";
import StateMachine from "./StateMachine";
import { LocationType } from "./WestWorldEnum";
import { doHouseWork, wifeGlobalState } from "./wifeState/WifeState";

const { ccclass, property } = cc._decorator

@ccclass('MinerWife')
export default class MinerWife extends BaseGameEntity {

    @property(cc.Label) tips: cc.Label = null

    private stateMachine: StateMachine

    private location: LocationType

    constructor() {
        super()
        this.setID(BaseGameEntity.nextId)
        this.location = null
        this.stateMachine = new StateMachine(this)
        this.stateMachine.setCurrentState(doHouseWork)
        this.stateMachine.setGlobalState(wifeGlobalState)
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
}