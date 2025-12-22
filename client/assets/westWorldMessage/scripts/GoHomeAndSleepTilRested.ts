import { State } from "../../common/fsm/State";
import { dispatcher } from "../../common/message/MessageDispatcher";
import { MessageType } from "../../common/message/MessageType";
import { enterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import Miner from "./Miner";
import { EntityType, LocationType, } from "./WestWorldEnum";

export default class GoHomeAndSleepTilRested extends State {
    enter(miner: Miner): void {
        if (miner.getLocation() != LocationType.Shack) {
            miner.updateTip(' Miner ' + miner.getID() + ' wlaking home.')
            miner.changeLocation(LocationType.Shack)
            dispatcher.dispatchMessage(0, miner.getID(), EntityType.Elsa, MessageType.HiHoneyImHome)
        }
    }

    excute(miner: Miner): void {
        miner.decreaseFatigue()
        if (miner.fatigue <= 0) {
            miner.getFSM().changeState(enterMineAndDigForNugget)
        } else {
            miner.updateTip(' Miner ' + miner.getID() + ' ZZZZZZ...')
        }
    }

    exit(miner: Miner): void {
        miner.updateTip(' Miner ' + miner.getID() + ' leaving the house.')
    }
}

export const goHomeAndSleepTilRested = new GoHomeAndSleepTilRested()