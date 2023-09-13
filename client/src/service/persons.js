import axios from 'axios'

const apiPath = '/api/persons'

const getAll = () => {
  const request = axios.get(apiPath)
  return request.then(response => response.data)
}

const create = data => {
  const request = axios.post(apiPath, data)
  return request.then(response => response.data)
}

const update = (id, data) => {
  const request = axios.put(`${apiPath}/${id}`, data)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${apiPath}/${id}`, id)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }