import useSWR from 'swr'
import { SITE_DATA_URL } from '../constants/sites_data'

const fetcher = url => fetch(url).then(r => r.json())

function useSitesData() {
  const { data, error } = useSWR(SITE_DATA_URL, fetcher)

  return {
    dwebData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useSitesData
