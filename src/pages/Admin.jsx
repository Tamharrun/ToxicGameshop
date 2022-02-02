import React from "react"
import Axios from "axios";
import { API_URL } from '../constans/API';
import "../assets/styles/admin.css"
import {connect} from 'react-redux'
import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';

class Admin extends React.Component {
    state = {
        productList: [],

        addProductName: "",
        addPrice: 0,
        addProductImage: "",
        addDescription: "",
        addCategory: "",

        editID: 0,

        editProductName: "",
        editPrice: 0,
        editProductImage: "",
        editDescription: "",
        editCategory: "",
    }

    fetchProduct = () => {
        Axios.get(`${API_URL}/product`)
        .then((result) => {
            this.setState({ productList: result.data })
        })
        .catch(() => {
            alert("Terjadi Kesalahan di server")
        })
    }

    editToggle = (editData) => {
        this.setState({
            editID: editData.id,
            editProductName: editData.productName,
            editPrice: editData.price,
            editProductImage: editData.productImage,
            editDescription: editData.description,
            editCategory: editData.category,    
        })
    }

    cancelEdit = () => {
        this.setState({ editID: 0 })
    }

    saveBtnHandler = () => {
        Axios.patch(`${API_URL}/product/${this.state.editID}`, {
            productName: this.state.editProductName,
            price: parseInt(this.state.editPrice),
            productImage: this.state.editProductImage,
            description: this.state.editDescription,
            category: this.state.editCategory,
        })
        .then(() => {
            this.fetchProduct()
            this.cancelEdit();
        })
        .catch(() => {
            alert("Terjadi kesalahan")
        })
    }

    deleteBtnHandler = (deleteID) => {
        const confirmDelete = window.confirm("are you sure?");
        if (confirmDelete) {

            Axios.delete(`${API_URL}/product/${deleteID}`)
            .then(() => {
                this.fetchProduct();
            })
            .catch(() => {
                alert("Terjadi kesalahan")
            })
        } else {
            alert("delete canceled");
        }
    }

    renderProduct = () => {
        return this.state.productList.map(val => {
            if (val.id === this.state.editID) {
                return (
                    <tr>
                        <td>{val.id}</td>
                        <td><input value={this.state.editProductName} onChange={this.inputHandler} type="text" className="form-control" name="editProductName" /></td>
                        <td><input value={this.state.editPrice} onChange={this.inputHandler} type="number" className="form-control" name="editPrice" /></td>
                        <td><input value={this.state.editProductImage} onChange={this.inputHandler} type="text" className="form-control" name="editProductImage" /></td>
                        <td><input value={this.state.editDescription} onChange={this.inputHandler} type="text" className="form-control" name="editDescription" /></td>
                        <td>
                            <select value={this.state.editCategory} onChange={this.inputHandler} name="editCategory" className="form-control">
                                <option value="">All Item</option>
                                <option value="Playstation">Playstation</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                            </select>

                        </td>
                        <td>
                            <button onClick={this.saveBtnHandler} className="btn btn-success">Save</button>
                        </td>
                        <td>
                            <button onClick={this.cancelEdit} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td><img className="admin-product-image" src={val.productImage} alt="" /></td>
                    <td>{val.description}</td>
                    <td>{val.category}</td>
                    <td>
                        <button onClick={() => this.editToggle(val)} className="btn btn-secondary">Edit</button>
                    </td>
                    <td>
                        <button onClick={() => this.deleteBtnHandler(val.id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    addNewProduct = () => {
        Axios.post(`${API_URL}/product`, {
            productName: this.state.addProductName,
            price: parseInt(this.state.addPrice),
            productImage: this.state.addProductImage,
            description: this.state.addDescription,
            category: this.state.addCategory,
        })
        .then(() => {
            this.fetchProduct()
            this.setState({
                addProductName: "",
                addPrice: "",
                addProductImage: "",
                addDescription: "",
                addCategory: "",
            })
        })
        .catch(() => {
            alert("Terjadi kesalahan")
        })
    }

    inputHandler = (event) => {
        const {name, value} = event.target

        this.setState({ [name]: value })
    }

    componentDidMount() {
        this.fetchProduct()
    }

    render() {
        if (this.props.userGlobal.role !== "admin") {
            return <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
        }
        return (
            <div className="p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Manage Products</h1>
                        <table className="table mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProduct()}
                            </tbody>
                            <tfoot className="bg-light">
                                <tr>
                                    <td></td>
                                    <td>
                                        <input value={this.state.addProductName} onChange={this.inputHandler} name="addProductName" type="text" className="form-control" />
                                    </td>
                                    <td>
                                        <input value={this.state.addPrice} onChange={this.inputHandler} name="addPrice" type="number" className="form-control" />
                                    </td>
                                    <td>
                                        <input value={this.state.addProductImage} onChange={this.inputHandler} name="addProductImage" type="text" className="form-control" />
                                    </td>
                                    <td>
                                        <input value={this.state.addDescription} onChange={this.inputHandler} name="addDescription" type="text" className="form-control" />
                                    </td>
                                    <td>
                                        <select onChange={this.inputHandler} name="addCategory" className="form-control">
                                            <option value="">All Item</option>
                                            <option value="Playstation">Playstation</option>
                                            <option value="Xbox">Xbox</option>
                                            <option value="Nintendo">Nintendo</option>
                                        </select>
                                    </td>
                                    <td colSpan={2}>
                                        <button onClick={this.addNewProduct} className="btn btn-info">Add Product</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userGlobal: state.user
    }
}

export default connect(mapStateToProps)(Admin);