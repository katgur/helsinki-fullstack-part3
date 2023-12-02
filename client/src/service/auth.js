import axios from 'axios'

const apiPath = '/api/login'

const login = data => {
  const request = axios.post(apiPath, data)
  return request.then(response => response.data)
}

export default { login }