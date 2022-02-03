import React from "react";
import Axios from "axios"
import { API_URL } from '../constans/API'

class ProductDetail extends React.Component {

    state = {
        productData: {},
        productNotFound: false,
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
                        style={{ width: "100%" }}
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
                            <button className="btn btn-primary mr-4">
                                -
                            </button>
                            <p className="mt-3 mx-3">1</p>
                            <button className="btn btn-primary">
                                +
                            </button>
                        </div>
                        <button className="btn btn-success mt-3">
                            Add to Cart
                        </button>
                    </div>
                </div>
                )}            
            </div>
        );
    }
}

export default ProductDetail;