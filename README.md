## npm install

### rename ".env.example" to ".env" and put your bot token

### config.json

```json
{
    "clientId": "bot id",
    "ownerId": "your id",
    "botPrefix": "Whatever prefix you want"
}
```
## Setting up command Logs
```js
const webhookUrl = ''; // WebHook URL
```
## On your discord server, copy the webhookURl and set on "index.js" line 56.

### to run: node . or node functions/sharding.js

Want a developer-only command? Put "ownerOnly: true" at the beginning of the commands (I have put some commands with this (SlashCommands/admin/test.js or PrefixCommands/admin/test.js))

## Obs: The subfolders is just for organization

## recommended free host: SquareCloud https://squarecloud.app
(If you are not going to use SquareCloud, you can delete the "squarecloud.config" file)

### New Commands Soon