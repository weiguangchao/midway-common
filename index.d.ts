export * from './dist/index';

import '@midwayjs/axios';

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
  }
}
