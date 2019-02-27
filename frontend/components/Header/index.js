import Link from 'next/link'
import { HeaderStyles, HeaderLink } from './styles'
import Signin from './Signin'

export default ({ user }) => (
  <HeaderStyles>
    <div>
      <HeaderLink>Exam Maker</HeaderLink>
      <div className="links">
        <Link href="/maker">
          <HeaderLink>Create</HeaderLink>
        </Link>
        <Link href="/schema">
          <HeaderLink>Schema</HeaderLink>
        </Link>
        <HeaderLink>Exams</HeaderLink>
        <Signin user={user} />
      </div>
    </div>
  </HeaderStyles>
)
