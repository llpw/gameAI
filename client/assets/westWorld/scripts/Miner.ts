import BaseGameEntity from "./BaseGameEntity";
import GoHomeAndSleepTilRested from "./GoHomeAndSleepTilRested";
import State from "./State";
import { CONST_VAL } from "./WestWorldConst";
import { LocationType } from "./WestWorldEnum";

const { ccclass, property } = cc._decorator

@ccclass('Miner')
export default class Miner extends BaseGameEntity {

    private currentState: State
    private currentLocation = LocationType.GoldMine

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
        this.currentState = new GoHomeAndSleepTilRested()
        this.currentLocation = LocationType.Shack
        this.goldCarried = 0
        this.moneyInBank = 0
        this.thirst = 0
        this.fatigue = 0
        this.setID(1)
    }

    setID(val: number): void {
        this.id = val
    }

    update(dt: number): void {
        this.thirst += 1
        if (this.currentState) {
            this.currentState.excute(this)
        }
    }

    changeState(state: State): void {
        console.assert(!!(this.currentState && state), 'Invalid state transition')
        this.currentState.exit(this)
        this.currentState = state
        this.currentState.enter(this)
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

}