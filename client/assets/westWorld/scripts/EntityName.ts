import { EntityType } from "./WestWorldEnum";

class EntityName {
    getNameBy(type: EntityType) {
        switch (type) {
            case EntityType.MinerBob:
                return 'Miner Bob'
            case EntityType.Elsa:
                return 'Elsa'
        }
    }
}

export const entityName = new EntityName()