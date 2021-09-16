// lbis
import { Col, Row } from 'antd'
import React from 'react'
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
    <>
      {token && <Header />}
      <div className="h-full w-full py-2 md:py-4 px-2 md:px-3 lg:px-4 xl:px-6">
        <Row className="w-full h-full">
          <Col xs={0} md={6} className="h-full">
            <div className="h-full border-black border-2 fixed">LEFT</div>
          </Col>
          <Col xs={24} md={12} className="md:px-4">
            <GenerateRoute />
          </Col>
          <Col xs={0} md={6}>
            <div className="h-full border-black border-2 fixed">RIGHT</div>
          </Col>
        </Row>
      </div>
      {token && <Footer />}
      {token && <SocketClient />}
    </>
  )
}

export default AppLayout
