import React from 'react'
import DebateCardSkeleton from './DebateSkeleton/DebateCardSkeleton'
import "./skeleton.css"
const Skeleton = ({ type }) => {
    return (
        <div className="skeletonWrapper">
            {
                [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
                    <DebateCardSkeleton key={item} />
                ))
            }
        </div>
    )
}

export default Skeleton