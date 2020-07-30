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
        return tx.done;
    })
    .then(function() {
        M.toast({html: `Match added to favorites.`})
    })
    .catch(() => {
        M.toast({html: `Failed.`})
    });
}

const deleteMatch = (idMatch) => {
    dbPromised
    .then(function(db) {
        const tx = db.transaction('favmatch', 'readwrite');
        const store = tx.objectStore('favmatch');
        store.delete(parseInt(idMatch));
        return tx.done;
    })
    .then(function() {
        M.toast({html: `Match deleted form favorites.`})
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

const saveClub = (idClub, dataClub) => {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("favclub", "readwrite");
        const store = tx.objectStore("favclub");

        store.add(dataClub);
        return tx.done;
    })
    .then(function() {
        M.toast({html: `Club added to favorites.`})
    })
    .catch(() => {
        M.toast({html: `Failed.`})
    });
}

const deleteClub = (idClub) => {
    dbPromised
    .then(function(db) {
        const tx = db.transaction('favclub', 'readwrite');
        const store = tx.objectStore('favclub');
        store.delete(parseInt(idClub));
        return tx.done;
    })
    .then(function() {
        M.toast({html: `Club deleted form favorites.`})
    })
    .catch(() => {
        M.toast({html: `Failed.`})
    });
}

const getClubAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("favclub", "readonly");
            const store = tx.objectStore("favclub");
            return store.getAll();
        })
        .then(function(favclub) {
            resolve(favclub);
        });
    })
}

export {saveMatch, deleteMatch, getMatchAll, saveClub, deleteClub, getClubAll}