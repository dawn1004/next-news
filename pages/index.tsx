import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import NavBar from '../components/NavBar'
import PromoBanner from '../components/PromoBanner'
import styles from '../styles/Home.module.css'
import request from '../services/request';
import { useState } from 'react'
import { Article } from '../services/types'
import { SearchIcon } from '@heroicons/react/solid'

const Home: NextPage = () => {

  // const [page, setPage] = useState<number>(1);
  // const [pageSize, setpageSize] = useState<number>(20);
  const [articles, setArticles] = useState<Article[]>([]);
  // const [query, setQuery] = useState<string>("a");
  // const [totalResults, setTotalResults] = useState<number>(0)

  useEffect(() => {
    getNews()
  }, [])

  // useEffect(() => {
  //   getNews();
  // }, [query])

  const getNews =async () => {

    const articlesResponse: any = await request.getArticles();
    
    // const everyNews: EveryNews = await request.getEveryNews({
    //   pageSize,
    //   page,
    //   sortBy: 'publishedAt',
    //   q: query // q means query
    // });

    // setTotalResults(everyNews.totalResults)
    setArticles(articlesResponse)
  }

  // const onSearch = ({target}: {target: EventTarget & HTMLInputElement}) => {
  //   setQuery(target.value)
  // }

  return (
    <Layout>
      <>
        <div className='flex flex-col justify-center items-center mb-14'>
          <h1 className='font-medium text-7xl text-center'>
              <span className='text-primary'>next</span>
              <span>News</span>
          </h1>
          <div className='flex w-3/5 items-center justify-center relative rounded border mt-6'>
            {/* <div className='w-10 h-full bg-red-500'>as</div> */}
            <div className='px-3'>
              <SearchIcon className='w-5 h-5 text-gray-900' />
            </div>
            <input 
              type="text" 
              className='px-2 py-2 w-full' 
              // onChange={onSearch}  
            />          
          </div>
        </div>


        {/* <span className={`text-lg font-meduim mt-4 ${query === "a"? 'hidden': ''}`}>
          { 
            `About ${totalResults} article result `
          }
        </span> */}
        <div className='container mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-6 gap-4'>
          {articles.map((article, idx) => 
            <div key={idx} className="rounded overflow-hidden h-72 transition duration-500 ease-in-out transform hover:scale-90 cursor-pointer relative">
              <img 
                className='w-full h-full object-cover'
                src={article.thumbSizeImgUrl}
              />
              <div className='absolute h-full w-full top-0 bg-gradient-to-t from-gray-800/80 to-transparent'>
                <div className='absolute w-full bottom-0 px-4 py-2 flex flex-col text-white'>
                  <span>{article.title}</span>
                  <span className='text-xs '>{article.published}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </Layout>
  )
}

export default Home
