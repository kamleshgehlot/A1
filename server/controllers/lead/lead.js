const Lead = require('../../models/lead/lead.js');

const add = function (req, res, next) {
  const leadParam = {
    lead_id: req.body.lead_id,
    franchise_id: req.body.franchise_id,
    message: req.body.message,
    is_active: req.body.is_active,
    user_id: req.decoded.user_id,
    userid: req.decoded.id,
    is_franchise_exist:req.body.is_franchise_exist,
    franchise_name:req.body.franchise_name,
    f_id:req.decoded.franchise_id,
    uid:req.decoded.id
  };
  try {
    const newLead = new Lead(leadParam);
      newLead.add().then(result => {
        new Lead({ user_id: req.decoded.user_id }).all().then(leadList => {
          res.send({ leadList });
        });
      })
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

const all = function (req, res, next) {
  try {
    new Lead({ user_id: req.decoded.user_id }).all().then(leadList => {
      res.send({ leadList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
const last = function (req, res, next) {
  try {
    new Lead({ user_id: req.decoded.user_id }).last().then(leadLast => {
      res.send({ leadLast });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const addComment = function (req, res, next) {
  const leadParam = {
    lead_id: req.body.lead_id,
    comment:req.body.comment,
    comment_by: req.body.comment_by
  };
  try {
    const newLead = new Lead(leadParam);
      newLead.addComment().then(result => {
        new Lead({ user_id: req.decoded.user_id }).all().then(leadList => {
          res.send({ leadList });
        });
      })
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};


const allComment = function (req, res, next) {
  const leadParam = {
    lead_id: req.body.lead_id
  };
  try {
    const newLead = new Lead(leadParam);
      newLead.allComment().then(commentList => {
          res.send({ commentList });
      })
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};
module.exports = { add, all, last,addComment,allComment};