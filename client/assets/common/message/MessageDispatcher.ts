import { BaseGameEntity } from "../game/BaseGameEntity"
import { entityMgr } from "../game/EntityManager"
import { Telegram } from "./Telegram"

class MessageDispatcher {
    private priorityMessages: Telegram[] = []

    private discharge(receiver: BaseGameEntity, telegram: Telegram) {
        if (receiver.handleMessage(telegram)) {
            return true
        }
        return false
    }

    public dispatchMessage(delay: number, sender: number, receiver: number, msg: number, additionInfo: any = null) {
        const receiverEntity = entityMgr.getEntity(receiver)
        if (!receiverEntity) {
            return
        }
        const telegram = new Telegram(sender, receiver, msg, 0, additionInfo)
        if (delay <= 0) {
            this.discharge(receiverEntity, telegram)
        } else {
            const now = Math.floor(Date.now() / 1000)
            const dispatchTime = now + delay
            telegram.dispatchTime = dispatchTime
            this.priorityMessages.push(telegram)
        }
    }

    public dispatchDelayedMessages() {
        const now = Math.floor(Date.now() / 1000)
        for (let i = this.priorityMessages.length - 1; i >= 0; i--) {
            const telegram = this.priorityMessages[i]
            if (telegram.dispatchTime < now && telegram.dispatchTime > 0) {
                const receiver = entityMgr.getEntity(telegram.receiver)
                this.priorityMessages.splice(i, 1)
                if (!receiver) {
                    continue
                }
                this.discharge(receiver, telegram)
            }
        }
    }
}

export const dispatcher = new MessageDispatcher()
