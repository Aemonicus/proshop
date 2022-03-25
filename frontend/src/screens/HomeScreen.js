import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"

const HomeScreen = () => {
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    // On ne peut pas utiliser async/Await directement sur le useEffect, donc on doit créer une fonction qui servira d'étape intermédiare
    // Raison pour laquelle on créer fetchProducts que l'on appelle juste après. On pourrait logiquement faire la requête axios et mettre à jour directement le state mais en raison de la limitation async/await sur le useEffect, on créer une fonction
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products")
      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen