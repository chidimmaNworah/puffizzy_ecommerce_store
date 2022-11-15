import React, { useEffect, useState } from 'react'
import {client} from '../lib/client'
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Product, FooterBanner, HeroBanner, Pagination } from '../components'

const Home = ({products, bannerData}) => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const indexOfLastPost = currentPage * postsPerPage
  const indexofFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = products.slice(indexofFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // search filter
  const [productItems, setProductItems] = useState([])
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    setProductItems(currentPosts)
    setFilterWork(currentPosts)
  }, [])

  const handleProductFilter = (item) => {
    setActiveFilter(item)
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

    if (item === 'All'){
      setFilterWork(productItems)
    }else{
      setFilterWork(productItems.filter((productItem)=> productItem.tags.includes(item)))
    }
  }, 500)
  }

  return (
    <>
    <Head>
        <title>Puffizzy Smoke Assessories store</title>
        <link rel="shortcut icon" href="/puffizzy_logo.png" />
      </Head>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Smoke accessories of many variations</p>
      </div>

      <div className='product_filter'>
          {['Lighter', 'Crusher', 'Pipe', 'Roller', 'Hookah', 'All'].map((item, index) => (
            <div
            key={index}
            className={`product_filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            onClick={() => handleProductFilter(item)}
            >
              {item}
            </div>
          ))}
        </div>

      <motion.div
      animate={animateCard}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      >
      <div className='products-container'>
        {
        filterWork.map((product) => <Product key={product._id} product={product} />)
        }
      </div>
      <Pagination postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate} />
      </motion.div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {products, bannerData}
  }
}

export default Home
