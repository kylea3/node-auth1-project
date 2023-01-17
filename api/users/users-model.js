const db = require('../../data/db-config')
/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db('users')
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  return db('users').where(filter)
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
async function findById(user_id) {
  return await db('users')
  .where('user_id', user_id)
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  await db('users')
    .insert(user)
  const person = await db('users')
    .where('username', user.username)
  const result = {
    user_id: person[0].user_id,
    username: person[0].username
  }
  return result
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  find,
  findBy,
  findById,
  add
}