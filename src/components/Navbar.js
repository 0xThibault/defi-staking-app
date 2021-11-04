import React, { Component } from "react";
import bank from "../images/bank.png"

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top shadow p-0"
            style={{backgroundColor: "black", height: "50px"}}>
                <a className="navbar-brand col-sm-3 col-md-2 mr-0"
                style={{color: "white"}}>
                    <img src={bank} className="d-inline-block align-top mr-2" alt="logo" width="50" height="30" />
                    DAPP Yield Staking
                </a>
                <ul className="navbar-nav px-3">
                    <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                        <small style={{color: "white"}}>
                            ACCOUNT NUMBER : {this.props.account}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;