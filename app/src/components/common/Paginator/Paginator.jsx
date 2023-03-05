import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { arrayOf, number, object, string } from 'prop-types';
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
}) {
  return (
    <>
      {links?.length > 0 && (
        <nav
          className={`${className} ${styles.container}`}
          style={style}
          aria-label="Page navigation example">
          <Link
            className={`${currentPage == 1 ? styles.disabled : null}`}
            to={prevPageUrl}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          {links?.map((link, index) => (
            <Link
              key={link}
              className={`${currentPage == index + 1 ? styles.active : null}`}
              to={link}>
              {index + 1}
            </Link>
          ))}
          <Link
            className={`${currentPage == lastPage ? styles.disabled : null}`}
            to={nextPageUrl}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </nav>
      )}
    </>
  );
}

Paginator.propTypes = {
  className: string,
  style: object,
  nextPageUrl: string,
  prevPageUrl: string,
  currentPage: number,
  links: arrayOf(string),
  lastPage: number,
};
