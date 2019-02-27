module.exports = `
  fragment ExamFragment on Exam {
    id
    public
    title
    code
    pass
    time
    image
    createdAt
    user {
      id
    }
    cover {
      variant
      text
    }
    test {
      variant
      question {
        variant
        text
      }
      choices {
        label
        text
      }
      answer
      explanation {
        variant
        text
        href
      }
    }
  }
`
