# URL Parser

A URL (Uniform Resource Locator) is a unique identifier used to locate a resource on the Internet. It is also referred to as a web address. URLs consist of multiple parts -- including a protocol and domain name -- that tell a web browser how and where to retrieve a resource.

This basic tool allows you to parse a URL into its singular parts, i.e protocol, username, password, hostname, port, domain, subdomain.

## Installing

Using npm:

```bash
$ npm install @eternaljs/url-parser
```

Using yarn:

```bash
$ yarn add @eternaljs/url-parser
```

## Usage

These examples assume you're in node, or something similar:

```javascript
// JavaScript
const { getUrlInfo } = require('@eternaljs/url-parser');

// TypeScript
import { getUrlInfo } from '@eternaljs/url-parser';


const details = getUrlInfo('https://console.cloud.google.com/welcome?project=eternaljs');
console.log(details);

```

## Output

The output will be URL full details like `Protocol`, `Hostname`, `Subdomain`:

```
{
  href: 'https://console.cloud.google.com/welcome?project=eternaljs',
  protocol: 'https:',
  hostname: 'console.cloud.google.com',
  port: '',
  pathname: '/welcome',
  param: [ 'welcome' ],
  query: { project: 'eternaljs' },
  search: '?project=eternaljs',
  hash: '',
  sub_domain: 'console'
}
```

## License

MIT
