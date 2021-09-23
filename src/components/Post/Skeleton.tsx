import React from 'react'
import { Skeleton } from 'antd'

type PostSkeletonProps = {
  length?: number
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ length = 2 }) => {
  return (
    <>
      {Array.from(new Array(length)).map((item: any, index: any) => {
        return (
          <div key={index} className="mb-8">
            <Skeleton active avatar paragraph={{ rows: 0 }} />
            <Skeleton.Image className="w-full" />
          </div>
        )
      })}
    </>
  )
}

export default PostSkeleton
