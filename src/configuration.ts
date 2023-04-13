// src/configuration.ts
import { Configuration } from '@midwayjs/core';
import * as axios from '@midwayjs/axios';

@Configuration({
  namespace: 'midway-common',
  imports: [axios]
})
export class MidwayCommonConfiguration {
  async onReady() {
    // ...
  }
}
