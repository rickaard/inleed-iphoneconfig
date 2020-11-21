import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Inleed - iPhone email config' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="container">
      <div className="content">
        <img src="/inleed.png" alt="Inleed logo" className="logo" />
        {children}
      </div>
      <img src="/slide.png" className="waves" alt="" />
    </div>

  </div>
)

export default Layout
