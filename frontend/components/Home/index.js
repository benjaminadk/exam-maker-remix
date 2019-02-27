import styled from 'styled-components'
import Router from 'next/router'
import Card from './Card'
import { RedButton } from '../Shared/RedButton'

const HomeStyles = styled.div`
  .yellow {
    background: ${props => props.theme.primary};
  }
  .grey {
    background: ${props => props.theme.grey[0]};
  }
`

const BannerYellow = styled.div`
  max-width: ${props => props.theme.maxWidth};
  height: 350px;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  justify-items: center;
  margin: 0 auto;
`

const Title = styled.div`
  align-self: flex-end;
  font: 4rem 'Open Sans Light';
  margin-bottom: 2rem;
`

const TagLine = styled.div`
  font: 1.3rem 'Open Sans';
  text-align: center;
  margin-bottom: 4rem;
`
const ReadMoreButton = styled(RedButton)`
  align-self: flex-start;
`

const BannerBottom = styled.div`
  max-width: ${props => props.theme.maxWidth};
  height: 250px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`

export default () => (
  <HomeStyles>
    <div className="yellow">
      <BannerYellow>
        <Title>Exam Maker</Title>
        <TagLine>
          <p>The open source initiative to create a JSON-based standard for exam simulators.</p>
          <p>For developers, by developers.</p>
        </TagLine>
        <ReadMoreButton>read more</ReadMoreButton>
      </BannerYellow>
    </div>
    <div className="grey">
      <BannerBottom>
        <Card
          heading="What is this?"
          text="Exam Maker is a standard created to empower students and teachers."
          buttonText="get started"
          onClick={() => Router.push('/')}
        />
        <Card
          heading="Exams"
          text="Browse our catalog of exams made by the community."
          buttonText="view exams"
          onClick={() => Router.push('/exams')}
        />
        <Card
          heading="Open Source"
          text="Every part of Exam Maker is open source, and available on GitHub"
          buttonText="view on github"
        />
      </BannerBottom>
    </div>
  </HomeStyles>
)
