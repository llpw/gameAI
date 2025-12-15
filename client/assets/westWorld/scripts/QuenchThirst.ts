import EnterMineAndDigForNugget, { enterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import Miner from "./Miner";
import State from "./State";
import { LocationType } from "./WestWorldEnum";

export default class QuenchThirst extends State {

    enter(miner: Miner): void {
        if (miner.getLocation() != LocationType.Sallon) {
            miner.updateTip(' Miner ' + miner.getID() + ' going to the saloon.')
            miner.changeLocation(LocationType.Sallon)
        }
    }

    excute(miner: Miner): void {
        miner.buyAndDrinkAWhiskey()
        miner.updateTip(' Miner ' + miner.getID() + ' drinking whiskey.')
        if (miner.thirst <= 0) {
            miner.changeState(enterMineAndDigForNugget)
        }
    }

    exit(miner: Miner): void {
        miner.updateTip(' Miner ' + miner.getID() + ' leaving the saloon.')
    }
}

export const quenchThirst = new QuenchThirst()