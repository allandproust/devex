'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      _id                     : req.user._id,
      orgsAdmin               : req.user.orgsAdmin,
      orgsMember              : req.user.orgsMember,
      orgsPending             : req.user.orgsPending,
      displayName             : validator.escape(req.user.displayName),
      provider                : validator.escape(req.user.provider),
      username                : validator.escape(req.user.username),
      created                 : req.user.created.toString(),
      roles                   : req.user.roles,
      profileImageURL         : req.user.profileImageURL,
      email                   : validator.escape(req.user.email),
      lastName                : validator.escape(req.user.lastName),
      firstName               : validator.escape(req.user.firstName),
      additionalProvidersData : req.user.additionalProvidersData,
      government              : req.user.government,
      notifyOpportunities     : req.user.notifyOpportunities,
      notifyEvents            : req.user.notifyEvents,
      notifyBlogs             : req.user.notifyBlogs,
      userTitle               : req.user.userTitle,
      isDisplayEmail          : req.user.isDisplayEmail,
      isDeveloper             : req.user.isDeveloper,
      paymentMethod           : req.user.paymentMethod,
      phone                   : validator.escape(req.user.phone),
      address                 : validator.escape(req.user.address),
      businessContactName     : validator.escape(req.user.businessContactName),
      businessContactEmail    : validator.escape(req.user.businessContactEmail),
      businessContactPhone    : validator.escape(req.user.businessContactPhone),
      businessName            : validator.escape(req.user.businessName),
      businessAddress         : validator.escape(req.user.businessAddress),
      businessAddress2        : validator.escape(req.user.businessAddress2),
      businessCity            : validator.escape(req.user.businessCity),
      businessProvince        : req.user.businessProvince,
      businessCode            : validator.escape(req.user.businessCode),
      location                : req.user.location,
      description             : validator.escape(req.user.description),
      website                 : req.user.website,
      skills                  : req.user.skills,
      skillsData              : req.user.skillsData,
      badges                  : req.user.badges,
      capabilities            : req.user.capabilities,
      endorsements            : req.user.endorsements,
      github                  : req.user.github,
      stackOverflow           : req.user.stackOverflow,
      stackExchange           : req.user.stackExchange,
      linkedIn                : req.user.linkedIn,
      isPublicProfile         : req.user.isPublicProfile,
      isAutoAdd               : req.user.isAutoAdd,
      capabilityDetails : req.user.capabilityDetails,
      capabilitySkills : req.user.capabilitySkills
    };
  }

  res.render('public/dist/server-views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('public/dist/server-views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('public/dist/server-views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
