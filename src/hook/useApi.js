import axios from 'axios'
import { ref } from 'vue'

const useApi = () => {

    const data=ref([])
    const loading=ref(false)

    const getData=async(url)=>{
        loading.value=false

        const res= await axios.get(url)
        data.value=res.data

        loading.value=true
    }

  return {
    getData,
    data,
    loading
  }
}

export default useApi
