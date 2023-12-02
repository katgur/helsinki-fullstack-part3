import axios from 'axios'

const apiPath = '/api/persons'

let token;
export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(apiPath, config)
  return request.then(response => response.data)
}

const create = data => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(apiPath, data, config)
  return request.then(response => response.data)
}

const update = (id, data) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${apiPath}/${id}`, data, config)
  return request.then(response => response.data)
}

const remove = id => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${apiPath}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }