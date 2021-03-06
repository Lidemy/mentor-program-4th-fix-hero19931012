import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export function register({ username, nickname, password }) {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then(res => res.json());
}

export function getPosts(offset) {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc&_start=${offset}&_end=${offset + 5}`)
    .then(res => res);
}

export function getPost(id) {
  return fetch(`${BASE_URL}/posts/${id}/?_expand=user`)
    .then(res => res.json());
}

export function login(username, password) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(res => res.json());
}

export function getMe() {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json());
}

export function addPost(title, body) {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then(res => res.json());
}

export function deletePost(id) {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  })
    .then(res => res.json());
}
