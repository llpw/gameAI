import { goHomeAndSleepTilRested } from "./GoHomeAndSleepTilRested";
import Miner from "./Miner";
import { quenchThirst } from "./QuenchThirst";
import State from "./State";
import { visitBankAndDepositGold } from "./VisitBankAndDepositGold";
import { LocationType } from "./WestWorldEnum";

export default class EnterMineAndDigForNugget extends State {

    enter(miner: Miner): void {
        if (miner.getLocation() != LocationType.GoldMine) {
            miner.updateTip(' Miner ' + miner.getID() + ' walks to the gold mine.')
            miner.changeLocation(LocationType.GoldMine)
        }
    }
    excute(miner: Miner): void {
        miner.addGoldCarried(1)
        miner.increaseFatigue()
        miner.addThirst(Math.random() > 0.5 ? 1 : 0)
        if (miner.pocketsFull()) {
            miner.changeState(visitBankAndDepositGold)
        }
        else if (miner.thirsted()) {
            miner.changeState(quenchThirst)
        }
        else if (miner.fatigued()) {
            miner.changeState(goHomeAndSleepTilRested)
        }
    }

    exit(miner: Miner): void {
        miner.updateTip(' Miner ' + miner.getID() + ' leaving the gold mine with mah pockets full of sweet gold')
    }
}

export const enterMineAndDigForNugget = new EnterMineAndDigForNugget()