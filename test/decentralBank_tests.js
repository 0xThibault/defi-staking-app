const { assert } = require("console");

/* eslint-disable no-undef */
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require("chai").use(require("chai-as-promised")).should();

// owner is the first address in ganache, customer is the second address
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

        describe("Yield Farming", async () => {
            it("rewards tokens for staking", async () => {
                let result
    
                // Check investor balance
                result = await tether.balanceOf(customer);
                assert.equal(result.toString(), tokens("100"), "customer fake tether wallet balance before staking");
    
                // Check staking for customer of 100 tokens
                await tether.approve(decentralBank.address, tokens("100"), {from: customer});
                await decentralBank.depositTokens(tokens("100"), {from: customer});

                // Check updated balance of customer
                result = await tether.balanceOf(customer);
                assert.equal(result.toString(), tokens("0"), "customer fake tether wallet balance after staking");

                // Check updated balance of Decentral Bank
                result = await tether.balanceOf(decentralBank.address);
                assert.equal(result.toString(), tokens("100"), "decentral bank fake tether wallet balance after staking");

                // Check customer staking status
                result = await decentralBank.isStaked(customer);
                assert.equal(result.toString(), "true", "customer is staking status after staking");

                // Issue Tokens
                await decentralBank.issueTokens({from: owner});

                // Ensure only the owner can Issue Token
                await decentralBank.issueTokens({from: customer}).should.be.rejected;

                // Unstake tokens
                await decentralBank.unstakeTokens({from: customer});

                // Check unstaking balances
                result = await tether.balanceOf(customer);
                assert.equal(result.toString(), tokens("100"), "customer fake tether wallet balance after unstaking");

                // Check updated balance of Decentral Bank
                result = await tether.balanceOf(decentralBank.address);
                assert.equal(result.toString(), tokens("0"), "decentral bank fake tether wallet balance after unstaking");

                // Check customer unstaking status
                result = await decentralBank.isStaked(customer);
                assert.equal(result.toString(), "false", "customer staking status after unstaking");
            })      
        })    
    })
})
