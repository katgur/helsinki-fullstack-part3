import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = data => {
  const request = axios.post(baseUrl, data)
  return request.then(response => response.data)
}

const update = (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`, id)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }