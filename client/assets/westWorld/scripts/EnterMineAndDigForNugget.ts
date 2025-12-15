import Miner from "./Miner";
import QuenchThirst from "./QuenchThirst";
import State from "./State";
import VisitBankAndDepositGold from "./VisitBankAndDepositGold";
import { LocationType } from "./WestWorldEnum";

export default class EnterMineAndDigForNugget extends State {

    enter(miner: Miner): void {
        if (miner.getLocation() != LocationType.GoldMine) {
            console.log(' Miner ' + miner.getID() + ' walks to the gold mine.')

        }
    }
    excute(miner: Miner): void {
        miner.addGoldCarried(1)
        miner.increaseFatigue()
        if (miner.pocketsFull()) {
            miner.changeState(new VisitBankAndDepositGold())
        }
        if (miner.isThirst()) {
            miner.changeState(new QuenchThirst())
        }
    }


    exit(miner: Miner): void {
        console.log(' Miner ' + miner.getID() + ' leaving the gold mine with mah pockets full of sweet gold')

    }
}