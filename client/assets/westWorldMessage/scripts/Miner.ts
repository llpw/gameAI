
import { StateMachine } from "../../common/fsm/StateMachine";
import { BaseGameEntity } from "../../common/game/BaseGameEntity";
import { Telegram } from "../../common/message/Telegram";
import { goHomeAndSleepTilRested } from "./GoHomeAndSleepTilRested";
import { CONST_VAL } from "./WestWorldConst";
import { LocationType } from "./WestWorldEnum";

const { ccclass, property } = cc._decorator

@ccclass('Miner')
export default class Miner extends BaseGameEntity {


    private stateMachine: StateMachine
    private currentLocation: LocationType

    @property(cc.Label) tips: cc.Label = null

    /**the amount of gold the miner is carrying */
    goldCarried = 0
    moneyInBank = 0
    /**the higher of the value, the thirstier the miner is */
    thirst = 0
    /**the higher of the value, the more tired the miner is */
    fatigue = 0

    constructor() {
        super()
        this.goldCarried = 0
        this.moneyInBank = 0
        this.thirst = 0
        this.fatigue = 0
        this.setID(BaseGameEntity.nextId)
        this.stateMachine = new StateMachine(this)
        this.stateMachine.setCurrentState(goHomeAndSleepTilRested)
    }

    update(dt: number): void {
        this.thirst += 1
        this.stateMachine.update()
    }

    getFSM() {
        return this.stateMachine
    }

    getLocation() {
        return this.currentLocation
    }


    changeLocation(location: LocationType) {
        this.currentLocation = location
        switch (location) {
            case LocationType.GoldMine:
                this.node.setPosition(cc.v2(200, 300))
                break;
            case LocationType.Bank:
                this.node.setPosition(cc.v2(-200, 300))
                break;
            case LocationType.Sallon:
                this.node.setPosition(cc.Vec2.ZERO)
                break;
            case LocationType.Shack:
                this.node.setPosition(cc.v2(0, -300))
                break;
            default:
                break;
        }
    }


    setGoldCarried(amount: number) {
        this.goldCarried = amount
    }

    addGoldCarried(amount: number) {
        this.goldCarried += amount
        if (this.goldCarried < 0) {
            this.goldCarried = 0
        }
    }

    decreaseFatigue() {
        this.fatigue -= 1
    }

    increaseFatigue() {
        this.fatigue += 1
    }

    fatigued() {
        return this.fatigue >= CONST_VAL.ThirednessThreshold
    }

    pocketsFull() {
        return this.goldCarried >= CONST_VAL.MaxNuggets
    }

    addThirst(amount: number) {
        this.thirst += amount
        if (this.thirst < 0) {
            this.thirst = 0
        }
    }

    thirsted() {
        return this.thirst >= CONST_VAL.ThirstLevel
    }

    buyAndDrinkAWhiskey() {
        this.addWeath(-1)
        this.addThirst(-2)
    }

    setWeath(val: number) {
        this.moneyInBank = val
    }

    addWeath(val: number) {
        this.moneyInBank += val
        if (this.moneyInBank < 0) {
            this.moneyInBank = 0
        }
    }

    updateTip(tip: string) {
        console.log(tip)
        this.tips.string = tip
    }

    public handleMessage(telegram: Telegram): boolean {
        return this.stateMachine.handleMessage(telegram)
    }
}