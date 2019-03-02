import { ExamCardStyles } from './styles/ExamCard'
import { FileDownload } from 'styled-icons/material/FileDownload'
import formatAgo from '../../lib/formatAgo'

export default ({ exam, onDownloadExam }) => (
  <ExamCardStyles>
    <img className="image" src={exam.image || exam.user.image} />
    <div className="main">
      {exam.code ? <span className="code">{exam.code}</span> : null}
      <div className="title" title={exam.title}>
        {exam.title}
      </div>
      <div className="description">{exam.description}</div>
      <div className="meta">
        <span className="date">Created {formatAgo(exam.createdAt)} ago &nbsp;&bull;&nbsp;</span>
        <a href={exam.user.homepage} className="name">
          {exam.user.name}
        </a>
        <img className="avatar" src={exam.user.image} />
      </div>
    </div>
    <div className="actions" onClick={onDownloadExam}>
      <FileDownload size={20} />
      <span>{exam.downloads}</span>
    </div>
  </ExamCardStyles>
)
