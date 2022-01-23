import { ConfigSchema } from "../../schemas/db/config.schema";

export class Config {
    public login!: { persistenceMode: String }

    constructor(configData: ConfigSchema) {
        Object.assign(this, configData)
    }
}
