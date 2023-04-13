import { createLightApp } from '@midwayjs/mock';
import * as common from '../../src';

describe('/test/service/common.test.ts', () => {
  it('test component', async () => {
    const app = await createLightApp('', {
      imports: [
        common
      ]
    });
    const httpUtils = await app.getApplicationContext().getAsync(common.HttpUtils);
    const validSignService = await app.getApplicationContext().getAsync(common.ValidSignService);
    console.log(httpUtils, validSignService);
  });
});
