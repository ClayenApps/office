import { EntityManager, MikroORM, Options } from "@mikro-orm/postgresql";

export interface ORM {
    orm: MikroORM;
    em: EntityManager;
}

export abstract class RepositoryORM {
    protected orm: MikroORM;
    protected em: EntityManager;

    constructor(orm: ORM) {
        this.orm = orm.orm;
        this.em = orm.em;
    }
}

let cache: ORM;
export async function initORM(options?: Options): Promise<ORM> {
    if (cache) {
        return cache;
    }

    const orm = await MikroORM.init(options);
    return (cache = { orm, em: orm.em });
}
