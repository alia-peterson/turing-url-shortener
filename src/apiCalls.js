export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response => response.json())
}

export const postUrls = (inputs) => {
  return fetch('http://localhost:3001/api/v1/urls', inputs)
    .then(response => response.json())
}
