function cleanup(x) {
  delete x.id
  delete x.__typename
}

function cleanAll(x) {
  x.cover.forEach(cleanup)
  x.test.forEach(n => {
    cleanup(n)
    n.question.forEach(cleanup)
    n.choices.forEach(cleanup)
    n.explanation.forEach(cleanup)
  })
}

export default exam => {
  cleanAll(exam)
  const filename =
    exam.title
      .toLowerCase()
      .trim()
      .replace(/\s/g, '-') + '.json'
  const dataLink = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exam))}`
  const node = document.createElement('a')
  node.setAttribute('href', dataLink)
  node.setAttribute('download', filename)
  document.body.appendChild(node)
  node.click()
  node.remove()
}
