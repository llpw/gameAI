import { BaseGameEntity } from "./BaseGameEntity"

class EntityManager {
    private entityMap: Map<number, BaseGameEntity>

    constructor() {
        this.entityMap = new Map<number, BaseGameEntity>()
    }

    registerEntity(entity: BaseGameEntity) {
        this.entityMap.set(entity.getID(), entity)
    }

    removeEntity(entity: BaseGameEntity) {
        this.entityMap.delete(entity.getID())
    }

    getEntity(id: number) {
        return this.entityMap.get(id)
    }

    getAllEntities() {
        return this.entityMap.values()
    }

    getEntityCount() {
        return this.entityMap.size
    }

    clear() {
        this.entityMap.clear()
    }
}

export const entityMgr = new EntityManager()