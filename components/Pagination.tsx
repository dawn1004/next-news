import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    totalPages: number,
    onChange: ({ selected }: { selected: number }) => void,
    isLoading?: boolean,
    page: number
}

const Pagination = (props: PaginationProps) => {

  return (
    <ReactPaginate 
      className={`${props.isLoading ? "hidden" : "flex"} px-4 py-3 items-center flex-row justify-center sm:px-6`}
      pageClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
      pageLinkClassName="bg-white border-gray-300 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      disabledClassName="bg-gray-300 cursor-not-allowed hover:bg-gray-300"
      activeLinkClassName="border-primary hover:bg-green-700"
      previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium"
      nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium"
      breakClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
      breakLabel="..."
      nextLabel={
        <>
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </>
      }
      previousLabel={
        <>
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </>
      }
      onPageChange={props.onChange}
      pageRangeDisplayed={5}
      pageCount={props.totalPages}
      forcePage={props.page}
    />
  )
}

export default Pagination;