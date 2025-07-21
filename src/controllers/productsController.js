// src/controllers/productsController.js
import * as api from '../services/apiClient.js';

export async function getAll(req, res, next) {
  try {
    const { status, data } = await api.fetchAll();
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const { status, data } = await api.fetchOne(req.params.id);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { status, data } = await api.create();
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { status, data } = await api.update(req.params.id);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { status, data } = await api.remove(req.params.id);
    res.status(status).json(
      Object.keys(data).length
        ? data
        : { message: 'Recurso eliminado exitosamente' }
    );
  } catch (err) {
    next(err);
  }
}

export async function parallel(req, res, next) {
  try {
    const [p, u, c] = await api.parallelRequests();
    res.json({
      message: 'Peticiones paralelas completadas exitosamente',
      product: p.data,
      user: u.data,
      cart: c.data
    });
  } catch (err) {
    next(err);
  }
}

export async function bulkCreate(req, res, next) {
  try {
    const file = req.query.file || 'bulk-create.json';
    const results = await api.createBulkFromFile(file);
    res.json(results.map(r => ({ status: r.status, data: r.data })));
  } catch (err) {
    next(err);
  }
}

export async function bulkUpdate(req, res) {
  const file = req.query.file || 'bulk-update.json';
  const results = await api.updateBulkFromFile(file);
  res.json(results);
}
