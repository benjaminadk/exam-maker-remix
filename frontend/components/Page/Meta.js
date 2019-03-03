import Head from 'next/head'
import formatTitle from '../../lib/formatTitle'

export default ({ pathname }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/x-icon" href="static/favicon.ico" />
    <title>Exam Maker | {formatTitle(pathname)}</title>
  </Head>
)
