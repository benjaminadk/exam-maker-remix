import gql from 'graphql-tag'

export const examsByTerm = gql`
  query ExamsByTerm(
    $term: String
    $orderBy: ExamOrderByInput = createdAt_DESC
    $first: Int = 10
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
              { test_some: { question_some: { text_contains: $term } } }
            ]
          }
        ]
      }
      orderBy: $orderBy
      first: $first
      skip: $skip
    ) {
      exams {
        id
        title
        description
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
      count
    }
  }
`
