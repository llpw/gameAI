import { BaseGameEntity } from "../game/BaseGameEntity"
import { Telegram } from "../message/Telegram"
import { State } from "./State"

export class StateMachine {
    private owner: BaseGameEntity
    private currentState: State
    private previousState: State
    private globalState: State

    constructor(owner: BaseGameEntity) {
        this.owner = owner
    }

    update() {
        if (this.globalState != null) {
            this.globalState.execute(this.owner)
        }

        if (this.currentState != null) {
            this.currentState.execute(this.owner)
        }
    }

    changeState(state: State) {
        this.previousState = this.currentState
        this.currentState.exit(this.owner)
        this.currentState = state
        this.currentState.enter(this.owner)
    }

    revertToPreviousState() {
        this.changeState(this.previousState)
    }

    isInState(state: State) {
        return this.currentState.constructor.name === state.constructor.name
    }

    setCurrentState(state: State) {
        this.currentState = state
    }

    setGlobalState(state: State) {
        this.globalState = state
    }

    setPreviousState(state: State) {
        this.previousState = state
    }

    getCurrentState() {
        return this.currentState
    }

    getGlobalState() {
        return this.globalState
    }

    getPreviousState() {
        return this.previousState
    }

    getNameOfCurrentState() {
        return this.currentState.constructor.name
    }

    handleMessage(telegram: Telegram): boolean {
        if (this.currentState && this.currentState.onMessage(this.owner, telegram)) {
            return true
        }
        if (this.globalState && this.globalState.onMessage(this.owner, telegram)) {
            return true
        }
        return false
    }
}