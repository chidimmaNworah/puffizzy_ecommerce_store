import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const Banner = ({banner: {image, smallText, slug, price}}) => {
  return (
    <div className='product-detail'>
      <Link href={`/banner/${slug.current}`}>
        <div className="product-card">
          <img 
          src={urlFor(image)} 
          alt=""
          className='product-image'
          width={250}
          height={250} 
          />
          <p className="product-name">{smallText}</p>
          <p className="product-price">₦{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Banner