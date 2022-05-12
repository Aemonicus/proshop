import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import { listProducts } from "../actions/productActions"
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    // On ne peut pas utiliser async/Await directement sur le useEffect, donc on doit créer une fonction qui servira d'étape intermédiare
    // Raison pour laquelle on créer fetchProducts que l'on appelle juste après. On pourrait logiquement faire la requête axios et mettre à jour directement le state mais en raison de la limitation async/await sur le useEffect, on créer une fonction
    // const fetchProducts = async () => {
    //   const { data } = await axios.get("/api/products")
    //   setProducts(data)
    // }
    // fetchProducts()

    dispatch(listProducts(keyword, pageNumber))

  }, [ dispatch, keyword, pageNumber ])


  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  )
}

export default HomeScreen