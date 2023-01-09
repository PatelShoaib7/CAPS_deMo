import React, { useContext } from 'react'
import { App_Context } from '../Context/Context_API'
import { Body } from '../Components/Body'
import {Banner} from '../Components/Banner'
import { Footer } from '../Components/Footer'
export const Home = () => {
    const {count} = useContext(App_Context)
    console.log(count)
  return (
    <div >
        <Banner />
        <Body />
        <Footer />

    </div>
  )
}
