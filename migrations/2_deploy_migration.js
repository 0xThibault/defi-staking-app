// eslint-disable-next-line no-undef
const Tether = artifacts.require("Tether");

module.exports = async function (deployer) {
    deployer.deploy(Tether);
};
