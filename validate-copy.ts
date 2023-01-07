import { Application } from '../src';

export default async function validateCopy(api: Application, callback?: (...args: any[]) => any) {
  await api.copy();
  if (typeof callback === 'function') {
    callback();
  }
}
