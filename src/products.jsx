import React from 'react';
import ReactDOM from 'react-dom';
import ProductsList from "./components/productsList/productsList";

class Products extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return(
            <ProductsList/>
        )
    }
}

export default Products;