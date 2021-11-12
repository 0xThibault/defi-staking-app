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
                        <tr style={{color:"grey"}}>
                            <td>USDT</td>
                            <td>RWD Token</td>
                        </tr>
                    </tbody>
                </table>

                <div className="card mb-2" style={{opacity:".9"}}>
                    <form className="mb-3">
                        <div style={{borderSpacing:"0 1em"}}>
                            <label className="float-left ml-3">
                                <b>Stake Tokens</b>
                            </label>
                            <span className="float-right mr-2">
                                Balance:
                            </span>
                            
                            <div className="input-group mb-4">
                                <input type="text" placeholder="0" required />
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
                    <button className="btn btn-primary btn-lg btn-block">WITHDRAW</button>
                    <div className="card-body text-center" style={{color: "blue"}}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;