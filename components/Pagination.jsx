import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
      <div>
    <div className="pagination page navigation">
        <ul className="pagination-list">
            {pageNumbers.map(number => 
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} href="#" className="page-link">
                        {number}
                    </a>
                </li>
            )}
        </ul>
    </div>
    </div>
  )
}

export default Pagination