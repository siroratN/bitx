'use client'
import { Coin } from '@/util/allType'
import axios from 'axios'


export async function FetchCoinData(): Promise<Coin[]> {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'thb',
        order: 'market_cap_desc',
        sparkline: false,
      },
      headers: {
        'x-cg-demo-api-key': 'CG-dAjBsmxLPg75euZpbpFKPpsm',
      },
    })
    // console.log('res: ', response)
    return response.data
  } catch (error) {
    console.error('Error fetching coin data:', error)
    return [] 
  }
}


export async function FetchCoinDataDetail(id:string){
  const alldata = await FetchCoinData()
  const coinDetail = alldata.find((item)=>item.id = id)
  return coinDetail
}
