import React from "react"
import { Link } from "react-router-dom";
import Axios from 'axios'
import { API_URL } from '../../constans/API'
import { registerUser } from '../../redux/actions/user'
import { connect } from 'react-redux'

class Register extends React.Component {

    state = {
        username: "",
        fullName: "",
        email: "",
        passrowd: "",
    }

    inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value})
    }

    registerHandler = () => {
        // alert(`username: ${this.state.username}\nfullName: ${this.state.fullName}\nemail: ${this.state.email}\npassword: ${this.state.password}`)
        const { username, fullName, email, password } = this.state;
        Axios.post(`${API_URL}/users`, {
            username,
            fullName,
            email,
            password,
            role: "user",
        })
        .then(() => {
            alert("Berhasil mendaftar")
        })
        .cath(() => {
            alert("Gagal mendaftar")
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <br />
                        <h1>REGISTER</h1>
                        <p className="lead">
                            play games whatever you want
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4 offset-4">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                                <input name="username" onChange={this.inputHandler} type="text" placeholder="Username" className="form-control my-2" />
                                <input name="fullName" onChange={this.inputHandler} type="text" placeholder="Full Name" className="form-control my-2" />
                                <input name="email" onChange={this.inputHandler} type="text" placeholder="Email" className="form-control my-2" />
                                <input name="password" onChange={this.inputHandler} type="password" placeholder="Password" className="form-control my-2" />
                                <div className="d-flex flex-row justify-content-center align-item-center">
                                    <button onClick={() => this.props.registerUser(this.state)} className="btn btn-dark mt-2">Register</button>
                                </div>
                                <div className="d-flex flex-row justify-content-center align-item-center">
                                    <Link to="/login" >Already have an account?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = {
    registerUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);