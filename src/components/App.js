import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import Web3 from "web3";
import Tether from "../abis/Tether.json";
import Rwd from "../abis/RWD.json";
import DecentralBank from "../abis/DecentralBank.json";

class App extends Component {

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("No ethereum browser detected, please consider install MetaMask");
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        // Get the metamask account
        const account = await web3.eth.getAccounts();
        this.setState({account: account[0]});
        // Get the network ID
        const networkId = await web3.eth.net.getId();

        // Load Tether contract
        const tetherData = Tether.networks[networkId];
        if(tetherData) {
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            this.setState({tether});
            let tetherBalance = await tether.methods.balanceOf(this.state.account).call();
            this.setState({tetherBalance: tetherBalance.toString()});
            console.log("Fake tether balance: ", tetherBalance);
        } else {
            window.alert("Error ! Tether contract not deployed - no detected network")
        }

        // Load RWD contract
        const rwdData = Rwd.networks[networkId];
        if(rwdData) {
            const rwd = new web3.eth.Contract(Rwd.abi, rwdData.address);
            this.setState({rwd});
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
            this.setState({rwdBalance: rwdBalance.toString()});
            console.log("Reward token balance: ", rwdBalance);
        } else {
            window.alert("Error ! RWD contract not deployed - no detected network");
        }

        // Load DecentralBank contract
        const decentralBankData = DecentralBank.networks[networkId];
        if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
            this.setState({decentralBank});
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
            this.setState({stakingBalance: stakingBalance.toString()});
            console.log("DecentralBank staking balance: ", stakingBalance);
        } else {
            window.alert("Error ! DecentralBank contract not deployed - no detected network");
        }

        // Set the loading state to false
        this.setState({loading: false});
    }

    constructor(props) {
        super(props)
        this.state = {
            account: "",
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance : "0",
            rwdBalance : "0",
            stakingBalance : "0",
            loading: true,
        }
    }

    render() {
        return (
            <div className="text-center">
                <Navbar account={this.state.account} />
            </div>
        )
    }
}

export default App;