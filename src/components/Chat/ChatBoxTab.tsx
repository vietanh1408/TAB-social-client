import { yupResolver } from '@hookform/resolvers/yup'
import { Badge, Divider, Form, Input, PageHeader } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import FormItem from 'components/Form/FormItem'
import {
  useCreateMessage,
  useGetConversationByRoomId
} from 'features/chat/hooks'
import { useGetAuth } from 'features/user/hooks'
import { CreateMessage } from 'Models'
import React from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReactScrollableFeed from 'react-scrollable-feed'

interface ChatBoxTab {
  roomId: string
  receiver?: string
}

const schema = yup.object().shape({})

const ChatBoxTab: React.FC<ChatBoxTab> = (props: ChatBoxTab) => {
  const { roomId, receiver } = props

  const { user } = useGetAuth()

  const [onSendMessage] = useCreateMessage()

  // query get messages by roomId
  const { conversation, isLoading } = useGetConversationByRoomId(roomId)

  const formProps = useForm<CreateMessage>({
    defaultValues: {
      sender: user?._id,
      receiver: receiver,
      message: '',
      roomId: roomId
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit, reset } = formProps

  const onSubmit = (data: CreateMessage) => {
    onSendMessage({ ...data, roomId, receiver, sender: user?._id })
    reset()
  }

  return (
    <React.Fragment>
      <PageHeader
        className=" p-0 w-full"
        title={
          <Badge count={0}>
            <Avatar shape="circle" size="large" />
          </Badge>
        }
        subTitle="Đang hoạt động"
      />
      <Divider />
      <div className=" h-96 overflow-scroll ">
        <ReactScrollableFeed>
          {conversation && conversation.length > 0
            ? conversation.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center w-full mb-2 overflow-hidden ${
                      item?.isYour ? 'justify-end  ' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`${
                        item?.isYour && 'bg-blue-500 text-white'
                      } w-auto py-4 px-2 rounded-xl border-['#5b5959'] border-2`}
                    >
                      {item?.message}
                    </div>
                  </div>
                )
              })
            : null}
        </ReactScrollableFeed>
      </div>
      <FormProvider {...formProps}>
        <Form onFinish={handleSubmit(onSubmit)}>
          <FormItem
            required={false}
            fieldName="message"
            isValidate={true}
            hideLabel={true}
          >
            {({ onChange, onBlur, value }: ControllerRenderProps) => (
              <Input
                className="ant-input-affix-wrapper-lg custom__input"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={'Nhập tin nhắn...'}
              />
            )}
          </FormItem>
        </Form>
      </FormProvider>
    </React.Fragment>
  )
}

export default ChatBoxTab
