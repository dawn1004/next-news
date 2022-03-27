import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React from 'react'
import { Article } from '../services/types';
import moment from "moment"
import { useEffect } from 'react';
import { dateFormatter } from '../utils';

interface IArticlesTable{
    articles: Article[]
}

const ArticlesTable = ({articles}: IArticlesTable) => {
    
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
                        onClick={(e) => {}}
                        >
                            <TrashIcon className="h-5 w-5 text-red-600 hover:text-green-500 mr-4" />
                        </button>
                        <button
                        onClick={(e) => {}}
                        >
                            <PencilIcon className="h-5 w-5 text-primary hover:text-green-500" />
                        </button>
                    </td>
                </tr>
            ))}
            {/* <pre>{JSON.stringify(companyAddress, null, 2)}</pre> */}
            </tbody>
        </table>
  )
}

export default ArticlesTable