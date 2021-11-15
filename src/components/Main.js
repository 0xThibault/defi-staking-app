import React, { Component } from "react";
import tether from "../images/tether.png"

class Main extends Component {
    render() {
        return (
            <div id="content" className="mt-3">
                <table className="table text-muted text-center">
                    <thead>
                        <tr style={{color:"grey"}}>
                            <th scope="col">Staking Balance</th>
                            <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr style={{color:"black"}}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, "Ether")} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, "Ether")} RWD Token</td>
                        </tr>
                    </tbody>
                </table>

                <div className="card mb-2" style={{opacity:".9"}}>
                    <form 
                    className="mb-3"
                    onSubmit = {(e) => {
                        e.preventDefault();
                        let amount
                        amount = this.input.value.toString();
                        amount = window.web3.utils.toWei(amount, "Ether");
                        this.props.stakeTokens(amount);
                    }}>
                        <div style={{borderSpacing:"0 1em"}}>
                            <label className="float-left ml-3">
                                <b>Stake Tokens</b>
                            </label>
                            <span className="float-right mr-2">
                                Fake Tether Balance: {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
                            </span>
                            
                            <div className="input-group mb-4">
                                <input ref={(input) => {this.input = input}} type="text" placeholder="0" required />
                                <div className="input-group-opened">
                                    <div className="input-group-text">
                                        <img src={tether} alt="tether logo" height="32" /> 
                                        &nbsp; USDT
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg btn-block">DEPOSIT</button>
                        </div>
                    </form>
                    <button 
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault(
                            this.props.unstakeTokens()
                        )
                    }}>
                        WITHDRAW
                    </button>
                </div>
            </div>
        )
    }
}

export default Main;