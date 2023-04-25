import { Inter } from 'next/font/google'
import Todos from './components/todos'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className="">
      <Todos />
    </main>
  )
}
