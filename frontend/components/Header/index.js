import Link from 'next/link'
import { HeaderStyles, HeaderLink } from './styles'
import Signin from './Signin'

export default ({ user, onShowModal }) => (
  <HeaderStyles>
    <div>
      <Link href="/">
        <HeaderLink>Exam Maker</HeaderLink>
      </Link>
      <div className="links">
        <Link href="/maker">
          <HeaderLink>Create</HeaderLink>
        </Link>
        <Link href="/schema">
          <HeaderLink>Schema</HeaderLink>
        </Link>
        <Link href="/exams">
          <HeaderLink>Exams</HeaderLink>
        </Link>
        <Signin user={user} onClick={onShowModal} />
      </div>
    </div>
  </HeaderStyles>
)
