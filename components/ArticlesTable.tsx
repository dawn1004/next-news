import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react'
import { Article } from '../services/types';
import moment from "moment"
import { useEffect } from 'react';
import { dateFormatter } from '../utils';
import { useRouter } from 'next/router';

interface IArticlesTable{
    articles: Article[];
    showDeleteModal: (_id: string) => void;
}

const ArticlesTable = ({articles, showDeleteModal}: IArticlesTable) => {
    const router = useRouter()

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                #
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Title
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Author
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Published Date
                </th>
                <th
                scope="col"
                className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                Actions
                </th>
            </tr>
            </thead>
            <tbody>
            {articles.map((article, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        {article.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {article.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm">
                        {dateFormatter(article.published)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm">
                        <button
                        onClick={() => {showDeleteModal(`${article._id}`)}}
                        >
                            <TrashIcon className="h-5 w-5 text-red-600 hover:text-green-500 mr-4" />
                        </button>
                        <button
                        onClick={() => {router.push(`/admin/${article._id}`)}}
                        >
                            <PencilIcon className="h-5 w-5 text-primary hover:text-green-500" />
                        </button>
                    </td>
                </tr>
            ))}

            {
                articles.length? 
                null: 
                <tr className='bg-gray-50'>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 " colSpan={5}>
                        <div className='w-full flex justify-center py-4'>
                            <span className='text-gray-700'>No data to display</span>
                        </div>
                    </td>
                </tr>
            }
            </tbody>
        </table>
  )
}

export default ArticlesTable