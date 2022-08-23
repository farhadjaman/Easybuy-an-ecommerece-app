import React from 'react'

const Rating = ({ rating, numReviews }) => {
  const rendered = [];
  let i = 5, j = rating;
  while (i >= 1) {
    rendered.push(
      <span key={i}>
        <i style={{ color: '#f8e825' }}
          className={
            j >= 1
              ? 'fas fa-star'
              : j >= .5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }>
        </i>
      </span>
    )
    i--;
    j--;
  }

  return (
    <div className='rating'>

      <>{rendered}</>
      <span className='ms-1'>{numReviews && <span>{numReviews} reviews</span>} </span>
    </div>

  )
}

export default Rating