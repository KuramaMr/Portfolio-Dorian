import Head from 'next/head'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Accueil from '../src/components/Accueil'
import Presentation from '../src/components/Presentation'
import Skills from '../src/components/Skills'
import Projects from '../src/components/Projects'
import Contact from '../src/components/Contact'
import Background from '../src/components/Background'


export default function Home() {
  return (
    <>
      <Background />
      <div className="min-h-screen">
        <Head>
          <title> Dorian Maquet - Portfolio </title>
          <meta name="description" content="Portfolio de Dorian Maquet, développeur web créatif" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="z-10">
          <Header />

          <main>
            <Accueil />
            <Presentation />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}