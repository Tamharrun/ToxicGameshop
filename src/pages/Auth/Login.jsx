import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { loginUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import Home from "../Home";

class Login extends React.Component {
    state = {
        username: "",
        password: "",
    }

    inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value})
    }

    render() {
        if (this.props.userGlobal.id) {
            return (
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            );
        }
        return (

            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <br />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        {
                            this.props.userGlobal.errMsg ?
                            <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div>
                            : null
                        }
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                                <input onChange={this.inputHandler} name="username" type="text" placeholder="Username" className="form-control my-2" />
                                <input onChange={this.inputHandler} name="password" type="password" placeholder="Password" className="form-control my-2" />
                                <div className="d-flex flex-row justify-content-center align-item-center">
                                    <button onClick={() => this.props.loginUser(this.state)} className="btn btn-dark mt-2">Login</button>
                                </div>
                                <div className="d-flex flex-row justify-content-center align-item-center">
                                    <Link to="/login" >Forget?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
}

const mapDispatchToProps = {
    loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);