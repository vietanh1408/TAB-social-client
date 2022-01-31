// lbis
import React from 'react'
import { Col, Row } from 'antd'
// components
import Footer from './footer/Footer'
import Header from './header/Header'
// features
import { useGetAuth } from 'features/user/hooks'
import SocketClient from 'features/socket/SocketClient'
// routes
import GenerateRoute from 'routes/GenerateRoute'
import OnlineList from 'features/onlineUser/OnlineList'

const AppLayout: React.FC = () => {
  const { token, user } = useGetAuth()
  const verifiedUser = token && user?.isVerifiedMail

  return (
    <React.Fragment>
      {verifiedUser && <Header />}
      <div
        className={`h-full w-full ${
          verifiedUser ? 'py-2 md:py-4 px-2 md:px-3 lg:px-4 xl:px-6 mt-20' : ''
        }`}
      >
        <Row className="w-full h-full">
          {verifiedUser && (
            <Col xs={0} md={6}>
              <div className="h-full fixed  w-1/4">LEFT</div>
            </Col>
          )}
          <Col
            xs={24}
            md={verifiedUser ? 12 : 24}
            className={`${verifiedUser ? 'md:px-4' : ''}`}
          >
            <GenerateRoute />
          </Col>
          {verifiedUser && (
            <Col xs={0} md={6}>
              <div className="online-list h-full fixed overflow-scroll w-1/4">
                <OnlineList />
              </div>
            </Col>
          )}
        </Row>
      </div>
      {verifiedUser && <Footer />}
      {token && <SocketClient />}
    </React.Fragment>
  )
}

export default AppLayout
