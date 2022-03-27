import Head from 'next/head';
import React from 'react'
import { ReactChildren } from 'react';
import { useEffect } from 'react';
import { ReactChild } from 'react';
import Footer from './Footer'
import NavBar from './NavBar'
import PromoBanner from './PromoBanner'

interface Head{
    title: string;
    meta?: {
        description?: string;
    };
    icon: string;
}

interface LayoutProps {
    children: ReactChild | ReactChildren;
    head?: Head;
    isAdmin?: boolean;
}

const defaultHeadValue = {
    title: "next-news",
    meta: {
        description: "Lorem ipsum"
    },
    icon: "/favicon.ico"
}

const Layout = ({children, head = defaultHeadValue, isAdmin=false}: LayoutProps) => {

    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin])
    

    return (
        <div className="">
            <Head>
                <title>{head.title}</title>
                <meta name="description" content={head.meta?.description} />
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