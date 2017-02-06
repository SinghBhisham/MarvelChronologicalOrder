var mdb = db.getSiblingDB('marvel');

mdb.characters.dropIndexes();
mdb.appearances.dropIndexes();

mdb.characters.createIndex({
    aliases: 1
});

mdb.appearances.createIndex({
    comicName: "text"
});

print("Done !!!");
