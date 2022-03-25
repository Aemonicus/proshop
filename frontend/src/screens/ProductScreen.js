import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroupe, Card, Button, ListGroup } from 'react-bootstrap'
import Rating from "../components/Rating"
import axios from 'axios'

const ProductScreen = ({ match }) => {

  const [ product, setProduct ] = useState({})

  useEffect(() => {
    // On ne peut pas utiliser async/Await directement sur le useEffect, donc on doit créer une fonction qui servira d'étape intermédiare
    // Raison pour laquelle on créer fetchProducts que l'on appelle juste après. On pourrait logiquement faire la requête axios et mettre à jour directement le state mais en raison de la limitation async/await sur le useEffect, on créer une fonction
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [ match ])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.reviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Price: {product.price} €
          </ListGroup.Item>
          <ListGroup.Item>
            Description: {product.description}
          </ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>{product.price}€</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Not In Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen