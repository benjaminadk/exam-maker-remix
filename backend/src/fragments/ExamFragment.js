module.exports = `
  fragment ExamFragment on Exam {
    id
    published
    title
    code
    pass
    time
    image
    createdAt
    user {
      id
      name
      image
    }
    cover {
      id
      variant
      text
    }
    test {
      id
      variant
      question {
        id
        variant
        text
      }
      choices {
        id
        label
        text
      }
      answer
      explanation {
        id
        variant
        text
        href
      }
    }
  }
`
