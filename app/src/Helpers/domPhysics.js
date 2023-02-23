/**
 * Center a child in a scrollable container
 *
 * @param {HtmlElement} parentElement
 * @param {HtmlElement} childElement
 */
const scrollToChild = (containerElement, activeElement) => {
  if (containerElement == null || activeElement == null) return;

  containerElement.scrollLeft +=
    activeElement.offsetLeft - containerElement.clientWidth / 2;
};

/**
 * https://stackoverflow.com/a/59680347/6132438
 * @param {HtmlElement} event
 * @returns
 */
function transformScroll(event) {
  if (window?.innerWidth < 800) return;

  event.preventDefault();
  event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function scrollPickerLeft(element) {
  const dx = Math.min(element.scrollLeft, element.clientWidth / 2);

  element.scrollBy({
    left: -dx,
    behavior: 'smooth',
  });
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function scrollPickerRight(element) {
  const spaceLeft =
    element.scrollWidth - element.scrollLeft - element.clientWidth;

  const dx = Math.min(spaceLeft, element.clientWidth / 2);

  element.scrollBy({
    left: dx,
    behavior: 'smooth',
  });
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function canScrollLeft(element) {
  if (element == null) return false;

  return element.scrollLeft > 0;
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function canScrollRight(element) {
  if (element == null) return false;

  return element.scrollWidth - element.clientWidth - element.scrollLeft > 0;
}

/**
 * @param {HtmlElement} element
 * @returns
 */
function getTopRelativeToDOM(element) {
  let offsetTop = 0;

  do {
    if (!isNaN(element.offsetTop)) {
      offsetTop += element.offsetTop;
    }
  } while ((element = element.offsetParent));
  return offsetTop;
}

/**
 * Iteratively get the offset from parent, and the offset of parent from grandparent, and so on, till the root node.
 * https://www.quirksmode.org/js/findpos.html
 * @param {HtmlElement} element
 * @returns
 */
function findPosRelativeToDOM(element) {
  let curLeft = 0;
  let curTop = 0;

  if (element.offsetParent) {
    do {
      curLeft += element.offsetLeft;
      curTop += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  return { x: curLeft, y: curTop };
}

/**
 *
 * @param {HtmlElement: defaults to document} element
 * @param {{key: string, ref: ReactRef, displayName: string}} sections
 * @param {number} padding Value to vary when the position is accepted
 * @returns
 */
const getActiveSection = (element = document, sections, padding = 0) => {
  if (element == null) return false;

  if (element === document) {
    element = document.documentElement;
  }

  const _sections = [...sections];

  // Reverse the list
  _sections.sort(
    (sectionA, sectionB) =>
      getTopRelativeToDOM(sectionB?.ref?.current) -
      getTopRelativeToDOM(sectionA?.ref?.current),
  );

  for (let section of _sections) {
    const top = getTopRelativeToDOM(section?.ref?.current);

    if (element.scrollTop >= top - padding) {
      return section?.key;
    }
  }

  return null;
};

export {
  scrollToChild,
  transformScroll,
  scrollPickerLeft,
  scrollPickerRight,
  canScrollLeft,
  canScrollRight,
  getTopRelativeToDOM,
  findPosRelativeToDOM,
  getActiveSection,
};
