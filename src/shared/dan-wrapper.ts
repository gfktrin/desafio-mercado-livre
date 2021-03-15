import * as cheerio from 'cheerio';
import axios from 'axios';

export class DanWrapper {
  //   url = 'https://www.dan.me.uk/tornodes';
  url = 'http://127.0.0.1:8080';

  async getIps() {
    const ipList = [];
    let start = false;

    const response = await axios.get(this.url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      $('div.article.box')
        .contents()
        .each(function () {
          if (this.nodeType === 8) {
            start = !start;
          }
          if (start && this.nodeType === 3) {
            const value = this.nodeValue.split('|')[0].replace('\n', '');
            if (value != '') {
              ipList.push(value);
            }
          }
        });
      return ipList;
    }
    return ipList;
  }
}
