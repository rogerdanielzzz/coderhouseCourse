import swaggerJSDoc from "swagger-jsdoc";
import { __dirnaname } from "./utils.js"

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Ecomerce",
            version: "1.0.0"
        }
    },
    apis: [`${__dirnaname}/docs/**/*.yaml`]

}

export const swaggerSetup = swaggerJSDoc(swaggerOptions)
