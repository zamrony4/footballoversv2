// // REGISTER SERVICE WORKER
// if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function() {
//         navigator.serviceWorker
//         .register("/sw.js")
//         .then(function() {
//             console.log("Pendaftaran ServiceWorker berhasil");
//         })
//         .catch(function() {
//             console.log("Pendaftaran ServiceWorker gagal");
//         });
//     });
// } else {
//     console.log("ServiceWorker belum didukung browser ini.");
// }

// const requestPermission = () => {
//     Notification.requestPermission().then(function (result) {
//         if (result === "denied") {
//           console.log("Fitur notifikasi tidak diijinkan.");
//           return;
//         } else if (result === "default") {
//           console.error("Pengguna menutup kotak dialog permintaan ijin.");
//           return;
//         }
        
//         console.log("Fitur notifikasi diijinkan.");
//     });
// }

// // Periksa fitur Notification API
// if ("Notification" in window) {
//     requestPermission();
// } else {
//     console.error("Browser tidak mendukung notifikasi.");
// }

// Periksa service worker
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    requestPermission();
}

// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
    .then(function (registration) {
        console.log('Registrasi service worker berhasil.');
        return registration;
    })
    .catch(function (err) {
        console.error('Registrasi service worker gagal.', err);
    });
}
  
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            
            // navigator.serviceWorker.getRegistration().then(function(reg) {
            //     reg.showNotification('Notifikasi diijinkan!');
            // });

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BAoEivF7gGCyf79YtMhtkOkpBkGVgYuef2B4hL_eVpwCTBsMC7pDNSlKXLSk3BTLiQcw3kBKd15uSt3Do2Mzk-s")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}