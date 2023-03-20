import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt-fairdesk';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const fd = new ccxt.fairdesk();
    const markets = await fd.loadMarkets();
    return 'Fairdesk markets: <br/>' + JSON.stringify(markets);
  }
}
