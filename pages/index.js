import Head from 'next/head'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Home() {

  const [usedNumbers, setUsedNumbers] = useState([])
  const [number, setNumber] = useState(null)

  useEffect(() => {
    const generatedNumber = Math.floor(Math.random() * 100) + 1

    setNumber(generatedNumber)
  }, [])

  const generateNumber = () => {
    const generatedNumber = Math.floor(Math.random() * 100) + 1
    setNumber(generatedNumber)
  }

  const [firstRun, setFirstRun] = useState(true)

  const generateAnother = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1

    if (firstRun) {
      setFirstRun(false)
      if (usedNumbers.includes(newNumber)) {
        generateNumber()
      } else if (usedNumbers.length >= 100) {
        toast.error('Todos os números já foram sorteados!')
      } else {
        usedNumbers.push(number)
        generateNumber()
      }
    } else {
      toast.error('Aguarde 5 segundos para gerar outro número!')
      setTimeout(() => {
        if (usedNumbers.includes(newNumber)) {
          generateNumber()
        } else if (usedNumbers.length >= 100) {
          toast.error('Todos os números já foram sorteados!')
        } else {
          usedNumbers.push(number)
          generateNumber()
        }
      }, 5000)
    }

  }
  
  return (
    <div>
      <Head>
        <title>Lucky Number Generator</title>
        <meta name="description" content="Aplicação de Sorteio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="header">
          <h1>Lucky Number</h1>
        </div>

        <div className="luckynumber">
          <h2>Seu número da sorte é:</h2>
          <h1>{number}</h1>
          <button onClick={generateAnother}>Gerar!</button>
        </div>

        <div className="usednumbers">
          <h2>Números já sorteados</h2>
          <ul>
            {usedNumbers.map((usedNum) => (
              <li key={usedNum}>{usedNum}</li>
            ))}
          </ul>
        </div>

        <div className='footer'>
          <p>Feito por Eduardo Zaqueu como parte do <a href='https://github.com/JCDMeira/challenge-roadmap-index' target='_blank'>desafio React</a> de Jean Meira</p>
        </div>
      </main>

    </div>
  )
}
