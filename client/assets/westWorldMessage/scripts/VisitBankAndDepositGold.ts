import { State } from "../../common/fsm/State";
import { enterMineAndDigForNugget } from "./EnterMineAndDigForNugget";
import { goHomeAndSleepTilRested } from "./GoHomeAndSleepTilRested";
import Miner from "./Miner";
import { CONST_VAL } from "./WestWorldConst";
import { LocationType } from "./WestWorldEnum";

export default class VisitBankAndDepositGold extends State {
    enter(miner: Miner): void {
        if (miner.getLocation() != LocationType.Bank) {
            miner.updateTip(' Miner ' + miner.getID() + ' going to the bank.')
            miner.changeLocation(LocationType.Bank)
        }
    }
    excute(miner: Miner): void {
        miner.addWeath(1)
        miner.addGoldCarried(-1)
        miner.updateTip(' Miner ' + miner.getID() + ' depositing gold at the bank.')
        if (miner.moneyInBank >= CONST_VAL.ComfortLevel) {
            miner.getFSM().changeState(goHomeAndSleepTilRested)
        } else if (miner.goldCarried <= 0) {
            miner.getFSM().changeState(enterMineAndDigForNugget)
        }
    }

    exit(miner: Miner): void {
        miner.updateTip(' Miner ' + miner.getID() + ' leaving the bank.')
    }

}

export const visitBankAndDepositGold = new VisitBankAndDepositGold()