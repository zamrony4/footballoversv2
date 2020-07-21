const dbPromised = idb.open("footballovers", 1, upgradeDB => {
    const favmatchObjectStore = upgradeDB.createObjectStore("favmatch", {
        keyPath: "id"
    })

    const favclubObjectStore = upgradeDB.createObjectStore("favclub", {
        keyPath: "id"
    })
})

const saveMatch = (idMatch, dataMatch) => {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("favmatch", "readwrite");
        const store = tx.objectStore("favmatch");

        store.add(dataMatch);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: `Match added to favourites.`})
    })
    .catch(() => {
        M.toast({html: `Failed.`})
    });
}

const deleteMatch = (idMatch) => {
    console.log(idMatch);
    dbPromised
    .then(function(db) {
        var tx = db.transaction('favmatch', 'readwrite');
        var store = tx.objectStore('favmatch');
        store.delete(idMatch);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: `Match deleted form favourites.`})
    })
    .catch(() => {
        M.toast({html: `Failed.`})
    });
}

const getMatchAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("favmatch", "readonly");
            const store = tx.objectStore("favmatch");
            return store.getAll();
        })
        .then(function(favmatch) {
            resolve(favmatch);
        });
    })
}

export {saveMatch, deleteMatch, getMatchAll}