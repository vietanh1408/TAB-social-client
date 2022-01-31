import { Affix, Col, Row } from 'antd'
import React, { useState } from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderNav from './HeaderNav'
import HeaderRight from './HeaderRight'

const Header: React.FC = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  return (
    <Affix offsetTop={0} className="header" target={() => container}>
      <header className="md:h-20 h-14 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="h-full w-full py-2 md:py-4 px-2 md:px-3 lg:px-4 xl:px-6">
          <Row className="w-full h-full">
            <Col xs={8} md={6}>
              <HeaderLeft />
            </Col>
            <Col xs={8} md={12}>
              <HeaderNav />
            </Col>
            <Col xs={8} md={6}>
              <HeaderRight />
            </Col>
          </Row>
        </div>
      </header>
    </Affix>
  )
}

export default Header
