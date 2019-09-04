import '@babel/polyfill';
import 'url-polyfill/url-polyfill';
import 'unfetch/polyfill';
import init from './init';
import * as actions from './state/actions';
import * as selectors from './state/selectors';

export * from './state/reducers';

const exports = {
  actions,
  selectors,
  viewer: init,
};

export default exports;
