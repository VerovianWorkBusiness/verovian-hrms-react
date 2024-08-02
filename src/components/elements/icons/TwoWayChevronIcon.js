import React from 'react'

const TwoWayChevronIcon = ({className}) => {
  return (
    <svg
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}
      className={className} 
    >
      <path
        d="M5.032 2.829l2.672 2.46c.423.39 1.107.39 1.53 0a.941.941 0 000-1.41L5.793.699a1.148 1.148 0 00-1.531 0L.818 3.879a.941.941 0 000 1.41c.423.39 1.107.39 1.531 0l2.683-2.46zm0 12.34l-2.672-2.46a1.148 1.148 0 00-1.531 0 .941.941 0 000 1.41l3.442 3.18c.424.39 1.108.39 1.532 0l3.443-3.17a.941.941 0 000-1.41 1.148 1.148 0 00-1.532 0l-2.682 2.45z"
      ></path>
    </svg>
  )
}

export default TwoWayChevronIcon