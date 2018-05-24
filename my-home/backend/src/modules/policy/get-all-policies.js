const logger = require('../../logger')(module);
const sessionState = require('../../session-state');

const { toPolicies } = require('../projections');

/**
 * Request handler
 * @function requestHandler
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @returns {undefined}
 */
module.exports = function requestHandler(req, res) {
  const { sessionId } = req;
  const { mamRoot, mamClient } = sessionState[sessionId];
  mamClient.fetch(mamRoot)
    .then(toPolicies)
    .then(policies => res.json(policies))
    .catch((err) => {
      logger.error(`error in get-all-policies: ${err}`);
      return res.end('Something went wrong.');
    });
};