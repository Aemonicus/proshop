import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Card, Button } from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import Rating from "../components/Rating"
import { listProductDetails } from "../actions/productActions"
import { addToCart } from "../actions/cartActions"

const ProductScreen = ({ match, history }) => {

  const [ qty, setQty ] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    // On ne peut pas utiliser async/Await directement sur le useEffect, donc on doit créer une fonction qui servira d'étape intermédiare
    // Raison pour laquelle on créer fetchProducts que l'on appelle juste après. On pourrait logiquement faire la requête axios et mettre à jour directement le state mais en raison de la limitation async/await sur le useEffect, on créer une fonction
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(`/api/products/${match.params.id}`)
    //   setProduct(data)
    // }
    // fetchProduct()

    dispatch(listProductDetails(match.params.id))

  }, [ dispatch, match ])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  // Version alternative qui ne dépend pas des query parameters
  // const addToCartHandler = () => {
  //   dispatch(addToCart(product._id, qty))
  //   props.history.push('/cart')
  // }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back </Link>
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (

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

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantiy</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[ ...Array(product.countInStock).keys() ].map(item => (
                            <option key={item + 1} value={item + 1}>
                              {item + 1}
                            </option>
                          ))
                          }
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen