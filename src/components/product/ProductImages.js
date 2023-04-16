import React from 'react'

const ProductImages = ({ image }) => {
  return (
    <div className="pt__item active">
      <img src={image.url} alt="thumb-5" />
    </div>
  )
}

export default ProductImages
