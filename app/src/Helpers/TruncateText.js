const truncateString = (str, num = 60) => {
  if (str?.length > num) {
    return str?.slice(0, num) + '...';
  } else {
    return str;
  }
};

export { truncateString };
