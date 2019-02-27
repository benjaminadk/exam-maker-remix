import gql from 'graphql-tag'

export const me = gql`
  query {
    me {
      id
      name
      email
      image
      role
      createdAt
    }
  }
`
