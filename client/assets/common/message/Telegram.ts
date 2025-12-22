export class Telegram {
    sender: number
    receiver: number
    msg: number
    dispatchTime: number
    extraInfo: any

    constructor(sender: number, receiver: number, msg: number, dispatchTime: number, extraInfo: any) {
        this.sender = sender
        this.receiver = receiver
        this.msg = msg
        this.dispatchTime = dispatchTime
        this.extraInfo = extraInfo
    }
}

export function isTelegramEqual(telegram1: Telegram, telegram2: Telegram) {
    return telegram1.sender === telegram2.sender &&
        telegram1.receiver === telegram2.receiver &&
        telegram1.msg === telegram2.msg &&
        Math.abs(telegram1.dispatchTime - telegram2.dispatchTime) < 0.0001
}