import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt-fairdesk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async getHello(): Promise<string> {
    const apiKey = this.configService.get<string>('FAIRDESK_API_KEY');
    const apiSecret = this.configService.get<string>('FAIRDESK_API_SECRET');

    console.log(apiKey, apiSecret);

    const fd = new ccxt.fairdesk({
      'apiKey': apiKey,
      'secret': apiSecret,
    });
    try {
      const list = await fd.createOrder('btcusdt', 'limit', 'BUY', '0.001', '20000', {
        copyTradeFlag: true,
        positionSide: 'EACH',
        leverage: 18,
        isolated: true
      })
      console.log(list)
    } catch (e) {
      console.log(e)
    }
    const markets = await fd.loadMarkets();
    return 'Fairdesk markets: <br/>' + JSON.stringify(markets);
  }
}
