/* eslint-disable no-undef */
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

contract("DecentralBank", (accounts) => {
    let tether, rwd

    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
    })

    describe("Fake Tether Deployment", async () => {
        it("matches token name successfully", async () => {
            const name = await tether.name();
            assert.equal(name, "Fake Tether");
        })
    })
    describe("Reward Token Deployment", async () => {
        it("matches token name successfully", async () => {
            const name = await rwd.name();
            assert.equal(name, "Reward Token");
        })
    })
})
