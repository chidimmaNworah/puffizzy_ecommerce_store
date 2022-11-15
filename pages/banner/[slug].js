import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Head from 'next/head';
import { client, urlFor } from '../../lib/client';
import { Banner, HeroBanner, FooterBanner } from '../../components';
import { useStateContext } from '../../context/StateContext';

const BannerDetails = ({ banner, banners }) => {
  console.log(banners)
  const { image, smallText, desc, price } = banner;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(banner, qty);

    setShowCart(true);
  }

  return (
    <>
      <Head>
        <title>Puffizzy Smoke Assessories store Promo Product Detail</title>
        <link rel="shortcut icon" href="/puffizzy_logo.png" />
      </Head>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image)} className="product-detail-image" />
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{smallText}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{desc}</p>
          <p className="price">₦{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(banner, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>More Promo Items</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {banners.map((item) => (
                <Banner key={item._id} banner={item} />
              ))}
            </div>
          </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "banner"] {
    slug {
      current
    }
  }
  `;

  const banners = await client.fetch(query);

  const paths = banners.map((banner) => ({
    params: { 
      slug: banner.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "banner" && slug.current == '${slug}'][0]`;
  const bannersQuery = '*[_type == "banner"]'
  
  const banner = await client.fetch(query);
  const banners = await client.fetch(bannersQuery);

  return {
    props: { banners, banner }
  }
}

export default BannerDetails