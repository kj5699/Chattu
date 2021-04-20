import Head from 'next/head'
import Sidebar from '../components/sidebar'


export default function Home() {
  return (
    <div >
      <Head>
        <title>Chattu-A whatsapp Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  )
}
