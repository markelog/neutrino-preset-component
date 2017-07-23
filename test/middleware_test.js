import test from 'ava';
import { Neutrino as neutrino } from 'neutrino';

const mw = () => require('..');
const options = { sourceMap: true };

test('loads middleware', (t) => {
  t.notThrows(mw);
});

test('uses middleware', (t) => {
  const api = neutrino();

  t.notThrows(() => api.use(mw()));
});

test('uses with options', (t) => {
  const api = neutrino();

  t.notThrows(() => api.use(mw(), options));
});

test('instantiates', (t) => {
  const api = neutrino();

  api.use(mw());

  t.notThrows(() => api.config.toConfig());
});

test('instantiates with options', (t) => {
  const api = neutrino();

  api.use(mw(), options);

  t.notThrows(() => api.config.toConfig());
});
