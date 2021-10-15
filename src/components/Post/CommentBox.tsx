import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Comment, Form, Input, List } from 'antd'
import FormItem from 'components/Form/FormItem'
import { UserType } from 'Models'
import React from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const { TextArea } = Input

interface CommentBoxProps {
  user?: UserType | null
  comments: any
}

const schema = yup.object().shape({})

const CommentBox: React.FC<CommentBoxProps> = (props: CommentBoxProps) => {
  const { user, comments = [] } = props

  const formProps = useForm<any>({
    defaultValues: {
      comment: undefined
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit } = formProps

  const onSubmit = (data: any) => {
    console.log('data.....', data)
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
                Add Comment
              </Button>
            </Form>
          </FormProvider>
        }
      />
    </React.Fragment>
  )
}

export default CommentBox
