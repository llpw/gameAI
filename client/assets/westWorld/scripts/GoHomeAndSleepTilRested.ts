import { enterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import Miner from "./Miner";
import State from "./State";
import { LocationType } from "./WestWorldEnum";

export default class GoHomeAndSleepTilRested extends State {
    enter(miner: Miner): void {
        if (miner.getLocation() != LocationType.Shack) {
            miner.updateTip(' Miner ' + miner.getID() + ' wlaking home.')
            miner.changeLocation(LocationType.Shack)
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