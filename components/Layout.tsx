import Head from 'next/head';
import React from 'react'
import { ReactChildren } from 'react';
import { useEffect } from 'react';
import { ReactChild } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer'
import NavBar from './NavBar'
import PromoBanner from './PromoBanner'
import 'react-toastify/dist/ReactToastify.css';
import { Article } from '../services/types';


interface LayoutProps {
    children: ReactChild | ReactChildren;
    head?: Article;
    isAdmin?: boolean;
}

const defaultHeadValue: Article = {
    _id: 0,
    slug: "",
    title: "next-news",
    origSizeImgUrl: "/favicon.ico",
    thumbSizeImgUrl: "/favicon.ico",
    body: "NextNews exam for the position of frontend developer/software engineer",
    author: "dawn lemuel bugay",
    published: new Date()
}

const Layout = ({children, head = defaultHeadValue, isAdmin=false}: LayoutProps) => {

    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin])
    

    return (
        <div className="">
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                theme={'dark'}
            />
            <Head>
                <title>{head?.title}</title>
                <meta name="description" content={head?.body} />
                <meta name="author" content={head?.author} />
                <meta property="og:title" content={head?.title} />
                <meta property="og:description" content={head?.body} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={head?.thumbSizeImgUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={head?.title} />
                <meta name="twitter:description" content={head?.body} />
                <meta name="twitter:image" content={head?.thumbSizeImgUrl} />
                <meta name="twitter:image:alt" content={head?.title} />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PromoBanner />
            <NavBar isAdmin={isAdmin} />
            <main className='container px-4 py-10 mx-auto'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout