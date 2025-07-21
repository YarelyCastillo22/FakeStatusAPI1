// tests/api.spec.js
import { expect } from 'chai';
import * as api from '../src/services/apiClient.js';

describe('API FakeStore Automation – Suite Completa sin Fallos', () => {
  let createdId;

  it('GET  /products → debe devolver array de productos', async () => {
    const { status, data } = await api.fetchAll();
    expect(status).to.equal(200);
    expect(data).to.be.an('array').and.not.empty;
  });

  it('GET  /products/1 → debe devolver producto con id 1', async () => {
    const { status, data } = await api.fetchOne(1);
    expect(status).to.equal(200);
    expect(data).to.be.an('object').and.have.property('id', 1);
  });

  it('GET  /products/999999 → manejar id inexistente (status 200)', async () => {
    const { status } = await api.fetchOne(999999);
    expect(status).to.equal(200);
  });

  it('POST /products → crear producto válido', async () => {
    const { status, data } = await api.create();
    expect(status).to.equal(200);
    expect(data).to.be.an('object').and.have.property('id');
    createdId = data.id;
  });

  it('PUT  /products/1 → actualizar producto existente', async () => {
    const { status, data } = await api.update(1);
    expect(status).to.equal(200);
    expect(data).to.be.an('object').and.have.property('id', 1);
  });

  it('PUT  /products/999999 → manejar actualización de id inexistente (status 200)', async () => {
    const { status } = await api.update(999999);
    expect(status).to.equal(200);
  });

  it('DELETE /products/1 → eliminar recurso existente', async () => {
    const { status, data } = await api.remove(1);
    expect(status).to.equal(200);
    expect(data).to.be.an('object').and.have.property('id');
  });

  it('DELETE /products/999999 → manejar delete de id inexistente (status 200)', async () => {
    const { status } = await api.remove(999999);
    expect(status).to.equal(200);
  });

  it('Peticiones paralelas → debe devolver tres respuestas con status 200', async () => {
    const results = await api.parallelRequests();
    expect(results).to.be.an('array').with.length(3);
    results.forEach(r => expect(r).to.have.property('status', 200));
  });
});
