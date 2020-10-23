import redirect from './src/utils/redirect.js';
import env from './src/utils/env.js';

const botao = document.querySelector('button');

botao.addEventListener('click', () => redirect(env.test, { id: 123, nome: 'Leo' }))