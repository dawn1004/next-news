import { PlusIcon } from '@heroicons/react/solid'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ArticlesTable from '../../components/ArticlesTable'
import Layout from '../../components/Layout'
import request from '../../services/request'
import { Article } from '../../services/types'
import { useRouter } from 'next/router'
import DeleteModal from '../../components/DeleteModal'
import { toast } from 'react-toastify'
import Pagination from '../../components/Pagination'
import LoadingOverlay from '../../components/loading/LoadingOverlay'

const admin = () => {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([]);
  const [targetDeleteArticleId, setTargetDeleteArticleId ] = useState<string>("");
  const [isdeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [totalArticles, setTotalArticles] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getNews()
  }, [page])
  

  const getNews = async () => {
    const articlesResponse: any = await request.getArticles({page, pageSize})
    if(articlesResponse){
      setIsLoading(false);
      setArticles(articlesResponse.articles)
      setTotalArticles(articlesResponse.totalArticles)
    }
  }

  const showDeleteModal = (_id: string) => {
    setIsDeleteModalOpen(true)
    setTargetDeleteArticleId(_id)
  }

  const deleteArticle = async () => {
    if(targetDeleteArticleId !== ""){
      const deletedArticle: any = await request.deleteArticle(targetDeleteArticleId); 
      setIsDeleteModalOpen(false); 
      if(deletedArticle.acknowledged && deletedArticle.deletedCount) toast("Successfully deleted")
      else toast("Failed to delete", {type: "warning"})
      getNews();
    }
  }

  return (
    <Layout isAdmin={true} >
        <>
          <LoadingOverlay isShow={isLoading} />
          <DeleteModal isShow={isdeleteModalOpen} setIshow={setIsDeleteModalOpen} deleteHandler={deleteArticle} />
          <div className='flex justify-end mb-4'>
            <button 
              onClick={()=>{router.push("admin/create")}}
              className='flex px-10 py-2 bg-primary hover:opacity-70 cursor-pointer text-white rounded'
            >
              <div className='mr-2'>
                Create Article
              </div>
            </button>
          </div>

          <ArticlesTable articles={articles} showDeleteModal={showDeleteModal} />
          {
            articles.length >= 1 && totalArticles/pageSize >= 1? 
            <Pagination totalPages={totalArticles/pageSize} page={page} onChange={(selected)=> {setPage(selected.selected)}}  isLoading={isLoading} />:
            null
          }
        </>
    </Layout>
  )
}

export default admin