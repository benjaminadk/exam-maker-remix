import gql from 'graphql-tag'

export const examById = gql`
  query ExamById($id: ID!) {
    exam(id: $id) {
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
  }
`
