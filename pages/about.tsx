import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

const About = () => {
    const router = useRouter()
    return (
        <Layout >
            <>
                <h1 className='text-2xl font-medium text-primary mb-2'>About This App</h1>
                <p>Hi Im Dawn and I create this app for my front-end exam which is one of the recruitment requirements here in ISR.</p>
                <p className='mb-6'>Hope to pass this exam and work with you soon. Have a great day! {`:)`}</p>
                <span onClick={()=>{router.push("/")}} className='text-primary underline cursor-pointer'>Back to homepage</span>
            </>
        </Layout>
    )
}

export default About