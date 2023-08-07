import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080/api")

const productMockup = {
    title: "Prueba",
    description: "desc prueba",
    price: 5,

    code: "lsd5842" + (Math.floor(Math.random() * 100)),
    stock: 5,

    category: "Prueba"
}

describe("Test Endpoint Product ", function () {
    it("Probar Get Exitoso ", async function () {
        const response = await request.get(`/products`)
        expect(response._body).to.have.property("status")
        expect(response._body).to.have.property("payload")
        expect(response._body.status).to.be.equal("success")
        expect(response._body.payload).to.be.an("Array")



    })

    it("Probar Get one by id ", async function () {
        const response = await request.get(`/products`)

        const responseOne = await request.get(`/products/${response._body.payload[0]._id}`)
        expect(responseOne._body).to.have.property("status")
        expect(responseOne._body).to.have.property("payload")
        expect(response._body.status).to.be.equal("success")
        expect(response._body.payload).to.be.an("Array")

    })

    it("Probar Post Fallo autorizacion  ", async function () {
        const response = await request.post(`/products`).send(productMockup)
        expect(response._body).to.have.property("error")

    })
})