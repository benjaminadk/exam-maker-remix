import gql from 'graphql-tag'

export const deleteNode = gql`
  mutation deleteNode($id: ID!, $type: String) {
    deleteNode(id: $id, type: $type) {
      success
    }
  }
`
