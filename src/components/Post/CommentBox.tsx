// libs
import React, { useState } from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Comment, Form, Input, List, Spin } from 'antd'
// components
import FormItem from 'components/Form/FormItem'
import CommentList from './CommentList'
// extensions
import yupExtension from 'extensions/yup'
// models
import { CommentPost, PostType, UserType } from 'Models'
// hooks
import { useGetCommentByPostId } from 'features/newsFeed/hooks'
// constants
import { DEFAULT_COMMENT_LENGTH, DEFAULT_PAGE_INDEX } from 'constants/index'

const { TextArea } = Input

interface CommentBoxProps {
  post: PostType
  user?: UserType | null
  handleComment: (args: CommentPost) => void
}

const schema = yup.object().shape({
  comment: yupExtension.stringRequired
})

const CommentBox: React.FC<CommentBoxProps> = (props: CommentBoxProps) => {
  const { user, handleComment, post } = props

  const [pageSize, setPageSize] = useState<number>(3)
  const [pageIndex, setPageIndex] = useState<number>(1)

  const [comments, isLoadingComment] =
    useGetCommentByPostId(post._id, { pageSize, pageIndex }) ?? []

  const isShowLoadMoreComment = post?.commentLength > comments.length
  const formProps = useForm<CommentPost>({
    defaultValues: {
      comment: undefined
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit, reset } = formProps

  const onSubmit = (data: CommentPost) => {
    handleComment({ ...data, postId: post._id, authorId: post?.user?._id })
    reset()
  }

  const handleLoadMoreComment = () => {
    setPageIndex((prev) => prev + DEFAULT_PAGE_INDEX)
  }

  return (
    <Spin spinning={isLoadingComment}>
      {comments && comments.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={comments}
          className="p-4"
          renderItem={(item: any) => (
            <CommentList
              key={item?.id}
              comment={item}
              commentLength={post?.commentLength}
            />
          )}
        />
      ) : null}
      {isShowLoadMoreComment && (
        <Button
          className="text-blue-800"
          type="text"
          onClick={handleLoadMoreComment}
        >
          Xem thêm bình luận...
        </Button>
      )}
      <Comment
        avatar={<Avatar src={user?.avatar?.url} alt={user?.name} />}
        content={
          <FormProvider {...formProps}>
            <Form onFinish={handleSubmit(onSubmit)}>
              <FormItem
                label=""
                isValidate={true}
                required={false}
                fieldName="comment"
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => {
                  return (
                    <TextArea
                      rows={4}
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )
                }}
              </FormItem>
              <Button
                htmlType="submit"
                onClick={handleSubmit(onSubmit)}
                type="primary"
              >
                Bình luận
              </Button>
            </Form>
          </FormProvider>
        }
      />
    </Spin>
  )
}

export default CommentBox
