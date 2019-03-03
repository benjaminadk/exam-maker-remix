export default pathname => {
  switch (pathname) {
    case '/':
      return 'Home'
    case '/maker':
      return 'Editor'
    case '/schema':
      return 'Schema'
    case '/exams':
      return 'Exams'
    case '/my-exams':
      return 'My Exams'
    default:
      return 'Home'
  }
}
