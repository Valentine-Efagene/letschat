import { MouseEvent, UIEvent } from 'react'

/**
 * Center a child in a scrollable container
 *
 * @param {HtmlElement} parentElement
 * @param {HtmlElement} childElement
 */
const scrollToChild = (containerElement: HTMLElement, activeElement: HTMLElement) => {
  if (containerElement == null || activeElement == null) return;

  containerElement.scrollLeft +=
    activeElement.offsetLeft - containerElement.clientWidth / 2;
};

/**
 * https://stackoverflow.com/a/59680347/6132438
 * @param {HtmlElement} event
 * @returns
 */
function transformScroll(event: any) {
  if (window?.innerWidth < 800) return;

  event.preventDefault();
  event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
}

/**
 * @param {HtmlElement} element
 * @param {number} distance
 *
 * @returns
 */
function scrollLeft(element: HTMLElement, distance?: number) {
  const dx = Math.min(element.scrollLeft, element.clientWidth / 2);

  element.scrollBy({
    left: distance ?? -dx,
    behavior: 'smooth',
  });
}

/**
 * @param {HtmlElement} element
 * @param {number} distance
 *
 * @returns
 */
function scrollRight(element: HTMLElement, distance?: number) {
  const spaceLeft =
    element.scrollWidth - element.scrollLeft - element.clientWidth;

  const dx = Math.min(spaceLeft, element.clientWidth / 2);

  element.scrollBy({
    left: distance ?? dx,
    behavior: 'smooth',
  });
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function canScrollLeft(element: HTMLElement) {
  if (element == null) return false;

  return element.scrollLeft > 0;
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function canScrollRight(element: HTMLElement) {
  if (element == null) return false;

  return element.scrollWidth - element.clientWidth - element.scrollLeft > 0;
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function overflowingX(element: HTMLElement) {
  if (element == null) return false;

  return element.scrollWidth > element.clientWidth;
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function getTopRelativeToDOM(element: HTMLElement) {
  let offsetTop = 0;

  do {
    if (!isNaN(element.offsetTop)) {
      offsetTop += element.offsetTop;
    }
  } while ((element = element.offsetParent as HTMLElement));
  return offsetTop;
}

/**
 * Iteratively get the offset from parent, and the offset of parent from grandparent, and so on, till the root node.
 * https://www.quirksmode.org/js/findpos.html
 * @param {HtmlElement} element
 * @returns
 */
function findPosRelativeToDOM(element: HTMLElement) {
  let curLeft = 0;
  let curTop = 0;

  if (element.offsetParent) {
    do {
      curLeft += element.offsetLeft;
      curTop += element.offsetTop;
    } while ((element = element.offsetParent as HTMLElement));
  }

  return { x: curLeft, y: curTop };
}


export {
  scrollToChild,
  transformScroll,
  scrollLeft,
  scrollRight,
  canScrollLeft,
  canScrollRight,
  getTopRelativeToDOM,
  findPosRelativeToDOM,
  overflowingX,
};
