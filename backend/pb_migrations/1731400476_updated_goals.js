/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eysw4vicofta2ab")

  collection.listRule = "user_id = @request.auth.id"
  collection.viewRule = "user_id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eysw4vicofta2ab")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
