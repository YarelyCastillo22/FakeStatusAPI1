import axios from 'axios';
import fs from 'fs/promises';
import { API_BASE, DATA_DIR } from '../config.js';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000
});

async function loadJson(filename) {
  const raw = await fs.readFile(`${DATA_DIR}/${filename}`, 'utf8');
  return JSON.parse(raw);
}

export async function fetchAll() {
  return client.get('/products');
}

export async function fetchOne(id) {
  return client.get(`/products/${id}`);
}

export async function create() {
  const payload = await loadJson('create-product.json');
  return client.post('/products', payload);
}

export async function update(id) {
  const payload = await loadJson('update-product.json');
  return client.put(`/products/${id}`, payload);
}

export async function remove(id) {
  return client.delete(`/products/${id}`);
}

export async function parallelRequests() {
  const calls = [
    client.get('/products/1'),
    client.get('/users/1'),
    client.get('/carts/1')
  ];
  return Promise.all(calls);
}

export async function createBulkFromFile(fileName) {
  const payloads = await loadJson(fileName);
  const calls = payloads.map(item => client.post('/products', item));
  return Promise.all(calls);
}

export async function updateBulkFromFile(fileName) {
  const payloads = await loadJson(fileName);
  const results = await Promise.all(
    payloads.map(async item => {
      try {
        const res = await client.put(`/products/${item.id}`, item);
        return { status: res.status, data: res.data };
      } catch (err) {
        return {
          status: err.response?.status || 500,
          data: err.response?.data || { error: err.message }
        };
      }
    })
  );
  return results;
}

export async function createCustom(body) {
  try {
    const res = await client.post('/products', body);
    return { status: res.status, data: res.data };
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || { error: err.message }
    };
  }
}

export async function updateCustom(id, body) {
  try {
    const res = await client.put(`/products/${id}`, body);
    return { status: res.status, data: res.data };
  } catch (err) {
    return {
      status: err.response?.status || 500,
      data: err.response?.data || { error: err.message }
    };
  }
}

