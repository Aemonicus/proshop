import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroupe, Card, Button } from 'react-bootstrap'
import Rating from "../components/Rating"
import products from "../products"

const ProductScreen = ({ match }) => {
  const product = products.find(product => product._id === match.params.id)
  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back </Link>
    </>
  )
}

export default ProductScreen