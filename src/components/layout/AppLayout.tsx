// lbis
import React from 'react'
import { Col, Row } from 'antd'
// components
import Footer from './footer/Footer'
import Header from './header/Header'
// features
import { useGetAuth } from 'features/auth/hooks'
import SocketClient from 'features/socket/SocketClient'
// routes
import GenerateRoute from 'routes/GenerateRoute'

const AppLayout: React.FC = () => {
  const { token } = useGetAuth()
  return (
    <React.Fragment>
      {token && <Header />}
      <div
        className={`h-full w-full ${
          token ? 'py-2 md:py-4 px-2 md:px-3 lg:px-4 xl:px-6' : ''
        }`}
      >
        <Row className="w-full h-full">
          {token && (
            <Col xs={0} md={6}>
              <div className="h-full border-black border-2 fixed  w-1/4">
                LEFT
              </div>
            </Col>
          )}
          <Col
            xs={24}
            md={token ? 12 : 24}
            className={`${token ? 'md:px-4' : ''}`}
          >
            <GenerateRoute />
          </Col>
          {token && (
            <Col xs={0} md={6}>
              <div className="h-full border-black border-2 fixed  w-1/4">
                RIGHT
              </div>
            </Col>
          )}
        </Row>
      </div>
      {token && <Footer />}
      {token && <SocketClient />}
    </React.Fragment>
  )
}

export default AppLayout
