import MinerWife from "../MinerWife"
import State from "../State"
import { randomInt } from "../Util"

class WifeGlobalState extends State {
    enter(miner: MinerWife): void {

    }
    excute(miner: MinerWife): void {
        if (Math.random() > 0.1) {
            miner.getFSM().changeState(visitBathroom)
        } else {
            miner.getFSM().changeState(doHouseWork)
        }
    }

    exit(miner: MinerWife): void {

    }
}

class VisitBathroom extends State {
    enter(miner: MinerWife): void {

    }
    excute(miner: MinerWife): void {
        miner.updateTip(' Miner ' + miner.getID() + ' visiting the bathroom.')
    }
    exit(miner: MinerWife): void {

    }
}

class DoHouseWork extends State {
    enter(miner: MinerWife): void {

    }
    excute(miner: MinerWife): void {
        const random = randomInt(1, 3)
        if (random === 1) {
            miner.updateTip(' Miner ' + miner.getID() + ' cleaning clothes.')
        } else if (random === 2) {
            miner.updateTip(' Miner ' + miner.getID() + ' cleaning the house.')
        } else {
            miner.updateTip(' Miner ' + miner.getID() + ' cooking.')
        }
    }

    exit(miner: MinerWife): void {

    }
}

const visitBathroom = new VisitBathroom()
const doHouseWork = new DoHouseWork()
const wifeGlobalState = new WifeGlobalState()
export { visitBathroom, doHouseWork, wifeGlobalState }