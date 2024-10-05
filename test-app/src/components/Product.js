import React from "react"


function Product(props){
    return (
        <div className="products">
            <h1>{props.product.name}</h1>
            <p>{props.product.price.toLocaleString("en-US", {style: "currency", currency: "USD"})} - {props.product.description}</p>
        </div>
    )
}
export default Product