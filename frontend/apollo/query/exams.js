import gql from 'graphql-tag'

export const examsByTerm = gql`
  query ExamsByTerm(
    $term: String
    $orderBy: ExamOrderByInput = title_ASC
    $first: Int = 20
    $skip: Int = 0
  ) {
    exams(
      where: {
        AND: [
          { published: true }
          {
            OR: [
              { title_contains: $term }
              { code_contains: $term }
              # { test_some: { question_some: { text_contains: $term } } }
            ]
          }
        ]
      }
      orderBy: $orderBy
      first: $first
      skip: $skip
    ) {
      id
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
    }
  }
`
