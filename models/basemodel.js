const knex = require('../db/knex');
const { Model } = require('objection');
const hashid = require('objection-hashid');
const acl = require('./acl');
const authorize = require('objection-authorize')(acl, 'casl');

Model.knex(knex);

class BaseModel extends authorize(hashid(Model)) {
  static get hashIdMinLength() {
    return 5;
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    //delete json.id;
    delete json.password;
    delete json.role;
    delete json.createdAt;
    delete json.updatedAt;
    return json;
  }
}

module.exports = BaseModel;
