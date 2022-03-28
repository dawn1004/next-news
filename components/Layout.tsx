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

export interface Head{
    title: string;
    meta?: {
        description?: string;
        author?: string;
    };
    icon?: string;
    img: string;
}

interface LayoutProps {
    children: ReactChild | ReactChildren;
    head?: Head;
    isAdmin?: boolean;
}

const defaultHeadValue = {
    title: "next-news",
    meta: {
        description: "NextNews exam for the position of frontend developer/software engineer",
        author: "Dawn Lemuel Bugay"
    },
    icon: "/favicon.ico",
    img: "/favicon.ico"
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
                <title>{head.title}</title>
                <meta name="description" content={head.meta?.description} />
                <meta name="author" content={head.meta?.author} />
                <meta property="og:title" content={head.title} />
                <meta property="og:description" content={head.meta?.description} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={head.img} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={head.title} />
                <meta name="twitter:description" content={head.meta?.description} />
                <meta name="twitter:image" content={head.img} />
                <meta name="twitter:image:alt" content={head.title} />

                <link rel="icon" href={head.icon} />
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