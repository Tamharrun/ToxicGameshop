import React from "react";
import "../assets/styles/product_card.css";
import { Link } from 'react-router-dom'

class productCard extends React.Component {
    render() {
        return (
            <div className="card product-card">
                <img src={this.props.productData.productImage} alt="" />
                <div className="mt-2">
                    <div>
                        <Link to={`/product-detail?${this.props.productData.id}`} style={{ textDecoration: "none", color: "inherit" }}> 
                            <h6>{this.props.productData.productName}</h6>
                        </Link>
                        <span className="text-muted">Rp {this.props.productData.price}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <button className="btn btn-dark mt-2">Add to cart</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default productCard;