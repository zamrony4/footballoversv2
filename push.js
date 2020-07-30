const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAoEivF7gGCyf79YtMhtkOkpBkGVgYuef2B4hL_eVpwCTBsMC7pDNSlKXLSk3BTLiQcw3kBKd15uSt3Do2Mzk-s",
   "privateKey": "PF1wmsri0KBRhBIgVwWE1ZhtYT9Zl6WJXWjnWRq7ZZ8"
};
 
 
webPush.setVapidDetails(
   'mailto:mzamrony4@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/diGKKuqtCyQ:APA91bGCnzUBA4-K6PFaVdr5YeR5HbgSGJ9ypRrPTBPNgTCEFgb76enDWg1qW4b3YEFVwBA_QZCoDAaqCEXd2LRMNl68_HxD1r4NInNKay9FsCXuUJ1Cy3PfLCeTPTqn7d0Ro8FqiXGK",
   "keys": {
       "p256dh": "BPOFYr9WcpgTZYrDnln7euxyMXY7OFk5CJqtdTGaJ6K9NDlDd0BoI5TnGPM1hN6/J54H0F5JZJdvS7f6MLuYlAA=",
       "auth": "U9U8b1AH048yyCedgkbQgw=="
   }
};
const payload = 'Terima kasih sudah me-review hasil submission saya, Semoga mendapat hasil yang maksimal.';
 
const options = {
   gcmAPIKey: '1097082931258',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);