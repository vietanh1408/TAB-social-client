// libs
import React, { useState } from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Comment, Form, Input, List, Spin } from 'antd'
// components
import FormItem from 'components/Form/FormItem'
// extensions
import yupExtension from 'extensions/yup'
// models
import { CommentPost, PostType, UserType } from 'Models'
import { useGetCommentByPostId } from 'features/newsFeed/hooks'
import { getTimeDuration } from 'extensions/dateTime'
import CommentList from './CommentList'

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

  const [comments, isLoadingComment] = useGetCommentByPostId(post._id) ?? []

  const [commentList, setCommentList] = useState(
    comments ? [...comments] : post?.comments
  )

  const formProps = useForm<CommentPost>({
    defaultValues: {
      comment: undefined
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit, reset } = formProps

  const onSubmit = (data: CommentPost) => {
    handleComment({ ...data, postId: post._id, authorId: user?._id })
    reset()
    // setCommentList((prev: any) => prev.unshift({ ...data, user }))
  }

  return (
    <Spin spinning={isLoadingComment}>
      {comments && comments.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={comments}
          className="p-4"
          renderItem={(item: any) => (
            <CommentList key={item?.id} comment={item} />
          )}
        />
      ) : null}
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
