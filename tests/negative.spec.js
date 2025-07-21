import { expect } from 'chai';
import * as api from '../src/services/apiClient.js';

describe('API FakeStore Automation – Negativos y Borde', () => {

  it('POST /products → payload incompleto (falta price) → 4xx', async () => {
    const bad = { title: 'Sin precio', description: 'Incompleto', image: 'url', category: 'test' };
    const { status, data } = await api.createCustom(bad);
    expect(status).to.be.within(400, 499);
    expect(data).to.have.property('error');
  });

  it('POST /products → price malformado (string) → 4xx', async () => {
    const bad = {
      title: 'Precio texto', price: 'veinte',
      description: 'Price es string', image: 'url', category: 'test'
    };
    const { status, data } = await api.createCustom(bad);
    expect(status).to.be.within(400, 499);
    expect(data).to.have.property('error');
  });

  it('POST /products → campo extra no esperado → 200 + ignora extra', async () => {
    const extra = {
      title: 'Con extra', price: 9.99, description: 'Test',
      image: 'url', category: 'test', foo: 'bar'
    };
    const { status, data } = await api.createCustom(extra);
    expect(status).to.equal(200);
    expect(data).to.not.have.property('foo');
  });

  it('PUT /products/1 → payload incompleto → 4xx', async () => {
    const bad = { price: 19.99 }; // faltan campos
    const { status, data } = await api.updateCustom(1, bad);
    expect(status).to.be.within(400, 499);
    expect(data).to.have.property('error');
  });

  it('PUT /products/1 → category malformado (número) → 4xx', async () => {
    const bad = {
      title: 'Test', price: 19.99,
      description: 'Bad category', image: 'url', category: 123
    };
    const { status, data } = await api.updateCustom(1, bad);
    expect(status).to.be.within(400, 499);
    expect(data).to.have.property('error');
  });

});
