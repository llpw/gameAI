import BaseGameEntity from "./BaseGameEntity";
import State from "./State";

export default class StateMachine {
    private currentState: State
    private previousState: State
    private globalState: State
    private owner: BaseGameEntity

    constructor(owner: BaseGameEntity) {
        this.owner = owner
        this.currentState = null
        this.previousState = null
        this.globalState = null
    }

    setCurrentState(state: State) {
        this.currentState = state
    }

    setPreviousState(state: State) {
        this.previousState = state
    }

    setGlobalState(state: State) {
        this.globalState = state
    }

    changeState(state: State) {
        this.previousState = this.currentState
        this.currentState.exit(this.owner)
        this.currentState = state
        this.currentState.enter(this.owner)
    }

    update() {
        if (this.globalState) {
            this.globalState.excute(this.owner)
        }
        if (this.currentState) {
            this.currentState.excute(this.owner)
        }
    }
}