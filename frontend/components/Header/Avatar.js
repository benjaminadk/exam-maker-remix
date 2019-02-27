import { AvatarStyles } from './styles'

export default ({ user }) => (
  <AvatarStyles>
    <img src={user.image} />
  </AvatarStyles>
)
