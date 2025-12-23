import { State } from "../../../common/fsm/State"
import { dispatcher } from "../../../common/message/MessageDispatcher"
import { MessageType } from "../../../common/message/MessageType"
import { Telegram } from "../../../common/message/Telegram"
import MinerWife from "../MinerWife"
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

    onMessage(entity: MinerWife, msg: Telegram): boolean {
        switch (msg.msg) {
            case MessageType.HiHoneyImHome:
                entity.updateTip(' Miner wife' + entity.getID() + ' all right.')
                entity.getFSM().changeState(cookStew)
                return true
            case MessageType.CookStewDone:
                entity.updateTip('honey, come here, eating stew.')
                entity.getFSM().changeState(doHouseWork)
                return true
        }
        return false
    }
}

class VisitBathroom extends State {
    enter(miner: MinerWife): void {

    }
    excute(miner: MinerWife): void {
        miner.updateTip(' Miner wife ' + miner.getID() + ' visiting the bathroom.')
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
            miner.updateTip(' Miner wife' + miner.getID() + ' cleaning clothes.')
        } else if (random === 2) {
            miner.updateTip(' Miner wife' + miner.getID() + ' cleaning the house.')
        } else {
            miner.updateTip(' Miner wife' + miner.getID() + ' cooking.')
        }
    }

    exit(miner: MinerWife): void {

    }
}

class CookStew extends State {
    enter(miner: MinerWife): void {
        dispatcher.dispatchMessage(3, miner.getID(), miner.getID(), MessageType.CookStewDone)
    }
    excute(miner: MinerWife): void {
        miner.updateTip('honey, i am cooking stew.')
    }
    exit(miner: MinerWife): void {

    }
}

const visitBathroom = new VisitBathroom()
const doHouseWork = new DoHouseWork()
const cookStew = new CookStew()
const wifeGlobalState = new WifeGlobalState()
export { visitBathroom, doHouseWork, cookStew, wifeGlobalState }