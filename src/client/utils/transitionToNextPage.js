function transitionToNextPage(props, pathname) {
  const query = { ...props.location.query };

  if (query.next) {
    delete query.next;
  }

  props.router.replace({
    query,
    pathname
  });
}

export default transitionToNextPage;
