// libs
import React from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Comment, Form, Input, List } from 'antd'
// components
import FormItem from 'components/Form/FormItem'
// extensions
import yupExtension from 'extensions/yup'
// models
import { CommentPost, PostType, UserType } from 'Models'

const { TextArea } = Input

interface CommentBoxProps {
  post: PostType
  user?: UserType | null
  comments: any[]
  handleComment: (args: CommentPost) => void
}

const schema = yup.object().shape({
  comment: yupExtension.stringRequired
})

const CommentBox: React.FC<CommentBoxProps> = (props: CommentBoxProps) => {
  const { user, comments = [], handleComment, post } = props

  const formProps = useForm<CommentPost>({
    defaultValues: {
      comment: undefined
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit } = formProps

  const onSubmit = (data: CommentPost) => {
    handleComment({ ...data, postId: post._id, authorId: user?._id })
  }

  return (
    <React.Fragment>
      {comments.length > 0 && (
        <List
          dataSource={comments}
          header={`${comments.length} ${
            comments.length > 1 ? 'replies' : 'reply'
          }`}
          itemLayout="horizontal"
          renderItem={(props: any) => <Comment {...props} />}
        />
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
    </React.Fragment>
  )
}

export default CommentBox
