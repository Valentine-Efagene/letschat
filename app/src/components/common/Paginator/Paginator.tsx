import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Paginator.module.css';

/**
 * A paginator
 *
 * @param {string} CSS className
 * @param {object} style CSS style
 * @param {string} nextPageUrl The url to the next page
 * @param {string} prevPageUrl The url to the previous page
 * @param {Array<>{url: string, active: boolean, ...}} links All the pagination page links as gotten from Eloquent pagination
 * @Note
 * The first and last entries are simply pointers to the previous and next pages wrt the current page
 * @returns
 */
export default function Paginator({
  className,
  //firstPageUrl,
  lastPage,
  currentPage,
  nextPageUrl,
  prevPageUrl,
  links,
  style,
}: IPaginatorProps) {
  return (
    <>
      {links?.length > 0 && (
        <nav
          className={`${className} ${styles.container}`}
          style={style}
          aria-label="Page navigation example">
          {prevPageUrl && (
            <Link
              className={`${currentPage == 1 ? styles.disabled : null}`}
              to={prevPageUrl}>
              <FaArrowLeft />
            </Link>
          )}
          {links?.map((link: string, index: number) => (
            <Link
              key={link}
              className={`${currentPage == index + 1 ? styles.active : null}`}
              to={link}>
              {index + 1}
            </Link>
          ))}
          {nextPageUrl && (
            <Link
              className={`${currentPage == lastPage ? styles.disabled : null}`}
              to={nextPageUrl}>
              <FaArrowRight />
            </Link>
          )}
        </nav>
      )}
    </>
  );
}

interface IPaginatorProps {
  className?: string;
  style?: object;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  currentPage: number;
  links: string[];
  lastPage: number;
}
