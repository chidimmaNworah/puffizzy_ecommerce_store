import React, {useEffect} from 'react'
import TagManager, {TagManagerArgs} from 'react-gtm-module'
import { Toaster } from 'react-hot-toast'
import './Product.scss'
import {Layout} from '../components'
import '../styles/globals.css'
import { StateContext } from '../context/StateContext'

function MyApp({ Component, pageProps }) {

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  const tagManagerArgs = {
    gtmId
  }

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
