import React, { useState, useEffect } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';

interface PaginationProps {
  currentPage?: number;
  setter: (page: number) => void;
  totalItems: number;
  limit?: number;
}


const Pagination = ({ currentPage = 1, setter, totalItems, limit = 2 } : PaginationProps) => {
  const maxPages = Math.ceil(totalItems / limit);
  const [paginationArr, setPaginationArr] = useState<number[][]>([]);
  const [currentSlideNumber, setCurrentSlide] = useState(1);
// console.log(totalItems, maxPages, "maxpages")
  const setPages = () => {
    const tempPaginationArr: number[][] = [];
    const subArrCount = Math.ceil(maxPages / 5);
    for (let i = 0; i < subArrCount; i++) {
      tempPaginationArr.push([]);
    }
    let temp_arr_count = 0;
    
    for (let i = 1; i <= maxPages; i++) {
      tempPaginationArr[temp_arr_count].push(i);
      if (i % 5 === 0) {
        temp_arr_count += 1;
      }
    }
  // console.log(tempPaginationArr, "pagination arr");
  
    setPaginationArr(tempPaginationArr);
  };

  const handlePageChange = (page : any) => {
    setter(page);
    // scroll to top of page
    setTimeout(() => {
      if (window?.scrollTo) {
        window?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  useEffect(() => {
      setPages();
    
  }, [totalItems, limit]);
  return (
    <>
      <div className="mx-auto my-6 flex w-fit">
        {maxPages > 5 && (
          <button
            // v-if="maxPages>5"
            onClick={() => setCurrentSlide((slide : any) => slide - 1)}
            disabled={currentSlideNumber === 1}
            className="rounded-lg text-red-600 transition hover:text-primary disabled:text-gray-font lg:w-auto "
          >
            <MdArrowBackIos className="font-medium text-inherit" />
          </button>
        )}

        {maxPages > 1 && (
          <div
            // v-if="maxPages>1"
            className="flex w-[230px] justify-center sm:w-[290px]"
          >
            {paginationArr[currentSlideNumber - 1]?.map((page : any) => (
              <button
                // v-for="page in paginationArr[currentSlideNumber - 1]"
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1.5 inline-block cursor-pointer rounded-lg border border-primary p-2 px-3 text-sm font-light transition  sm:mx-2 sm:px-4 ${
                  currentPage === page
                    ? 'bg-primary font-medium text-white hover:bg-primary/70'
                    : 'hover:bg-secondary hover:shadow-lg'
                } `}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {maxPages > 5 && (
          <button
            // v-if="maxPages>5"
            onClick={() => setCurrentSlide((slide : any) => slide + 1)}
            disabled={currentSlideNumber === paginationArr.length}
            className="rounded-lg transition hover:text-primary disabled:text-gray-font lg:w-auto "
          >
            <MdArrowForwardIos className="font-medium text-inherit" />
          </button>
        )}
      </div>
    </>
  );
};

export default Pagination;