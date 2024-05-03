import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { entities } from "./infra/db/entities.js";

const config: Options = {
    driver: PostgreSqlDriver,
    host: process.env.DB_HOST!,
    dbName: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    entities,
    metadataProvider: TsMorphMetadataProvider,
    debug: true
};

export default config;
