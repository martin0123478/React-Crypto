import styled from '@emotion/styled'
import Error from './Error'
import { useEffect,useState } from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
        
    }

`

const Formulario = () => {

 const [criptos,setriptos] = useState([])
 const [error,setError] = useState(false)

  const[moneda,SelectMonedas] = useSelectMonedas('Elige tu moneda',monedas)
  const[criptomoneda,SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda',criptos)

  useEffect(()=>{
    const consultarApi = async() =>{
      const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map(crypto =>{

        const objeto = {
          id: crypto.CoinInfo.Name,
          nombre:crypto.CoinInfo.FullName
        }
        return objeto
      })
      setriptos(arrayCriptos)
    }
    consultarApi()
  },[])
  

  const handleSubmit = e =>{
    e.preventDefault()
    if([moneda,criptomoneda].includes('')){
      setError(true)
      return
    }
    setError(false)
  }
  SelectMonedas()
  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form 
    onSubmit={handleSubmit}>
      <SelectMonedas/>
      <SelectCriptomoneda/>
      
     
                <InputSubmit
         type="submit" 
         value="Cotizar"/>

    </form>
    </>
  )
}

export default Formulario
