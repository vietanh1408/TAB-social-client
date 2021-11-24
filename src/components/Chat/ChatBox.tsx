import { CloseOutlined } from '@ant-design/icons'
import React from 'react'

const ChatBox: React.FC = () => {
  const user = {
    _id: 2
  }

  const fakeData = [
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    },
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    },
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    },
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    },
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    },
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    },
    {
      from: {
        avatar: {
          url: '//gravatar.com/avatar/56234674574535734573000000000001?d=retro'
        },
        name: 'user02',
        _id: 2
      },
      to: {
        avatar: {
          url: '//gravatar.com/avatar/00034587632094500000000000000000?d=retro'
        },
        name: 'user01',
        _id: 1
      },
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      time: '3'
    }
  ]

  return (
    <div className="chatbox-wrap">
      <section className="chatbox">
        <div className="chat-name">
          <div className="flex">
            <img
              className="user-img"
              src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
            />
            <p>USER 01</p>
          </div>
          <CloseOutlined className="mr-2 cursor-pointer" />
        </div>
        <section className="chat-window">
          {fakeData.map((item: any, index) => {
            const isYourMessage = item.from._id === user._id
            if (isYourMessage) {
              return (
                <div className="flex">
                  <article className="msg-container msg-self" id="msg-0">
                    <div className="msg-box">
                      <div className="flr">
                        <div className="messages">
                          <p className="msg" id="msg-1">
                            {item.message}
                          </p>
                        </div>
                        <span className="timestamp">
                          <span className="username">{item.from.name}</span>
                          &bull;
                          <span className="posttime">
                            {item.time} minutes ago
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                  <img
                    className="user-img ml-2"
                    id="user-0"
                    src={item.from.avatar.url}
                  />
                </div>
              )
            }

            return (
              <div className="flex">
                <img
                  className="user-img"
                  id="user-0"
                  src={item.from.avatar.url}
                />
                <article className="msg-container msg-remote" id="msg-0">
                  <div className="msg-box">
                    <div className="flr">
                      <div className="messages">
                        <p className="msg" id="msg-0">
                          {item.message}
                        </p>
                      </div>
                      <span className="timestamp">
                        <span className="username">{item.from.name}</span>
                        &bull;
                        <span className="posttime">
                          {item.time} minutes ago
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </section>
        <form className="chat-input">
          <input type="text" placeholder="Type a message" />
          <button>
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
              <path
                fill="rgba(0,0,0,.38)"
                d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
              />
            </svg>
          </button>
        </form>
      </section>
    </div>
  )
}

export default ChatBox
