import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../../config/site.config'
import Navbar from '../components/Navbar'
import FileListing from '../components/FileListing'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import SwitchLayout from '../components/SwitchLayout'

export default function Folders() {
  const { query } = useRouter()
  const title = (query.path && Array.isArray(query.path) ? query.path[query.path.length - 1] : '')

  return (
    <div className="od-page-wrapper flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="od-main flex w-full flex-1 flex-col">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 px-2 sm:px-4 sm:p-4">
          <nav className="mb-4 flex items-center justify-between space-x-3 px-1">
            <Breadcrumb query={query} />
            <SwitchLayout />
          </nav>
          <FileListing query={query} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
