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

export async function CoinChart(id: string) {
  const options = {
    method: 'GET',
    headers: { 
      accept: 'application/json', 
      'x-cg-demo-api-key': 'CG-wtDF4MCkuAcwxG7zMRvzctPz' 
    }
  };
  
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=thb&days=10&interval=daily`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error fetching coin chart:', err);
    return null;
  }
}


export async function FetchCoinDataDetail(id: string) {
  const alldata = await FetchCoinData()
  const coinDetail = alldata.find((item) => item.id === id)
  return coinDetail || null
}
