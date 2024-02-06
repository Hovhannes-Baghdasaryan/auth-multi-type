import app, { initExpress } from "./app.ts";
import { initSequelize } from "./config/sequelize.ts";
import { PORT } from "./config/env.ts";

(async () => {
    try {
        initExpress()
        await initSequelize()
        app.listen(PORT, () => console.info(`Server running on port ${PORT}`))
    } catch (error) {
        console.error(error)
    }
})()
