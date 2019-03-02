import { FileDownload } from 'styled-icons/material/FileDownload'
import { Edit } from 'styled-icons/material/Edit'
import { ExamCardStyles } from './styles/ExamCard'
import formatAgo from '../../lib/formatAgo'

export default ({ exam, edit, onEdit, onDownloadExam }) => (
  <ExamCardStyles>
    {edit ? (
      <div className="edit" onClick={onEdit}>
        <Edit size={10} />
        <span>edit</span>
      </div>
    ) : null}
    <img className="image" src={exam.image || exam.user.image} />
    <div className="main">
      {exam.code ? <span className="code">{exam.code}</span> : null}
      <div className="title" title={exam.title}>
        {exam.title}
      </div>
      <div className="description">{exam.description}</div>
      <div className="meta">
        <span className="date">Created {formatAgo(exam.createdAt)} ago &nbsp;&bull;&nbsp;</span>
        {exam.user.homepage ? (
          <a href={exam.user.homepage} className="name-red">
            {exam.user.name}
          </a>
        ) : (
          <div className="name">{exam.user.name}</div>
        )}
        <img className="avatar" src={exam.user.image} />
      </div>
    </div>
    <div className="actions" onClick={onDownloadExam}>
      <FileDownload size={20} />
      <span>{exam.downloads}</span>
    </div>
  </ExamCardStyles>
)
