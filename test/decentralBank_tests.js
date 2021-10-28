/* eslint-disable no-undef */
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

contract("DecentralBank", ([owner, customer]) => {
    let tether, rwd, decentralBank;

    function tokens(number) {
        return web3.utils.toWei(number, "ether");
    }

    // Loading our contracts
    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, tether.address);

        // Transfer all token to DecentralBank (1million token)
        await rwd.transfer(decentralBank.address, tokens("1000000"));
        // Transfer 100 Fake Tether to customer
        await tether.transfer(customer, tokens("100"), {from: owner});
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

    describe("Decentral Bank Deployment", async () => {
        it("matches name successfully", async () => {
            const name = await decentralBank.name();
            assert.equal(name, "Decentral Bank");
        })

        it("contract has tokens", async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens("1000000"));
        })
    })
})
