dialog webhook
==============
Easy to use CLI tool for [dialog](https://dlg.im) webhooks.

[How to get integration link](https://docs.dlg.im/integrations/group-hook.html).

Installation
------------

```bash
npm install -D @dlghq/dialog-webhook
```

CLI
---

```bash
dialog-webhook --url $HOOK_URL --text 'Hello, world!'
```

Node API
--------

```js
const webhook = require('@dlghq/dialog-webhook');

webhook({ url: webHookUrl, text: 'Hello, world!' })
  .then(() => console.log('done'))
  .catch((e) => console.error(e));
```

License
-------
[Apache-2.0](LICENSE)
