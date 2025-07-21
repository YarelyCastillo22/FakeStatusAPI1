import { expect } from 'chai';
import * as api from '../src/services/apiClient.js';

describe('API FakeStore Automation – Positivos', () => {
  let createdId;

  it('GET  /products → array de productos', async () => {
    const { status, data } = await api.fetchAll();
    expect(status).to.equal(200);
    expect(data).to.be.an('array').and.not.empty;
  });

  it('GET  /products/1 → producto id=1', async () => {
    const { status, data } = await api.fetchOne(1);
    expect(status).to.equal(200);
    expect(data).to.have.property('id', 1);
  });

  it('GET  /products/999999 → id inexistente (status 200)', async () => {
    const { status } = await api.fetchOne(999999);
    expect(status).to.equal(200);
  });

  it('POST /products → crea producto', async () => {
    const { status, data } = await api.create();
    expect(status).to.equal(200);
    expect(data).to.have.property('id');
    createdId = data.id;
  });

  it('PUT  /products/1 → actualiza existente', async () => {
    const { status, data } = await api.update(1);
    expect(status).to.equal(200);
    expect(data).to.have.property('id', 1);
  });

  it('PUT  /products/999999 → actualizar inexistente (status 200)', async () => {
    const { status } = await api.update(999999);
    expect(status).to.equal(200);
  });

  it('DELETE /products/1 → elimina existente', async () => {
    const { status, data } = await api.remove(1);
    expect(status).to.equal(200);
    expect(data).to.have.property('id');
  });

  it('DELETE /products/999999 → elimina inexistente (status 200)', async () => {
    const { status } = await api.remove(999999);
    expect(status).to.equal(200);
  });

  it('Parallel requests → 3 respuestas 200', async () => {
    const results = await api.parallelRequests();
    expect(results).to.have.length(3);
    results.forEach(r => expect(r.status).to.equal(200));
  });
});
