import React from "react";
import Axios from "axios"
import { API_URL } from '../constans/API'
import {connect} from 'react-redux'

class ProductDetail extends React.Component {

    state = {
        productData: {},
        productNotFound: false,
        quantity: 1,
    }

    fetchProductData = () => {
        Axios.get(`${API_URL}/product`, {
            params: {
                id: window.location.search.slice(1)
            },
        })
        .then((result) => {
            if (result.data.length) {
                this.setState({ productData: result.data[0] })
            } else {
                this.setState({ productNotFound: true })
            }
        })
        .catch(() => {
            alert("Terjadi kesalahan")
        });
    }

    qtyBtnHandler = (action) => {
        if (action === "increment") {
            this.setState({ quantity: this.state.quantity + 1 })
        } else if (action === "decrement" && this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1})
        }
    }

    addToCartHandler = () => {

        Axios.get(`${API_URL}/cart`, {
            params: {
                userId: this.props.userGlobal.id,
                productId: this.state.productData.id,
            }
        })
        .then((result) => {
            if (result.data.length) {
                Axios.patch(`${API_URL}/cart/${result.data[0].id}`, {
                    quantity: result.data[0].quantity + this.state.quantity
                })
                .then(() => {
                    alert("berhasil menambahkan")

                })
                .catch(() => {
                    alert("terjadi kesalahan")

                })
            } else {
                Axios.post(`${API_URL}/cart`, {
                    userId: this.props.userGlobal.id,
                    productId: this.state.productData.id,
                    price: this.state.productData.price,
                    productName: this.state.productData.productName,
                    productImage: this.state.productData.productImage,
                    quantity: this.state.quantity,
                })
                .then(() => {
                    alert("berhasil menambahkan")
                })
                .catch(() => {
                    alert("terjadi kesalahan")
                })

            }
        })

    }

    componentDidMount() {
        this.fetchProductData()
    }

    render() {
        return (
            <div className="container">
                {this.state.productNotFound ? (
                    <div className="alert alert-warning mt-5">
                        product with ID: {window.location.search.slice(1)} not found
                    </div>
                ) : (
                    <div className="row mt-3">
                    <div className="col-6">
                        <img
                        style={{ height: "50vh", }}
                        src={this.state.productData.productImage}
                        alt=""
                        />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        <h4>{this.state.productData.productName}</h4>
                        <h5>{this.state.productData.price}</h5>
                        <p>
                        {this.state.productData.description}
                        </p>
                        <div className="d-flex flex-row align-item-center">
                            <button onClick={() => this.qtyBtnHandler("decrement")} className="btn btn-primary mr-4">
                                -
                            </button>
                            <p className="mt-3 mx-3">{this.state.quantity}</p>
                            <button onClick={() => this.qtyBtnHandler("increment")} className="btn btn-primary">
                                +
                            </button>
                        </div>
                        <button onClick={this.addToCartHandler} className="btn btn-success mt-3">
                            Add to Cart
                        </button>
                    </div>
                </div>
                )}            
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    }
}

export default connect(mapStateToProps)(ProductDetail);