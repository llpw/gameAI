import BaseGameEntity from "./BaseGameEntity";
import State from "./State";
import { LocationType } from "./WestWorldEnum";

export default class Miner extends BaseGameEntity {

    private currentState: State
    private currentLocation = LocationType.GoldMine

    private goldCarried = 0
    private moneyInBank = 0
    private thirst = 0
    private fatigue = 0

    setID(val: number): void {

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
    }

    addGoldCarried(amount: number) {
        this.goldCarried += amount
    }

    increaseFatigue() {
        this.fatigue += 1
    }

    pocketsFull() {
        return this.goldCarried >= 10
    }

    isThirst() {
        return this.thirst >= 10
    }


}