const Lead = require('../../models/lead/lead.js');

const add = function (req, res, next) {
  
  const leadData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const leadParam = {
    lead_id: leadData.lead_id,
    franchise_id: leadData.franchise_id,
    message: leadData.message,
    is_active: leadData.is_active,
    user_id: req.decoded.user_id,
    userid: req.decoded.id,
    upload: attachments,
    is_franchise_exist:leadData.is_franchise_exist,
    franchise_name:leadData.franchise_name,
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
const franchiseList = function (req, res, next) {
  try {
    new Lead({ user_id: req.decoded.user_id }).franchiseList().then(franchiseList => {
      res.send({ franchiseList });
      // console.log('franchiseList======',franchiseList);
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
const convertedList = function (req, res, next) {
  try {
    new Lead({ user_id: req.decoded.user_id }).convertedList().then(convertedList => {
      res.send({ convertedList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};
const filter = function (req, res, next) {
  const leadParam = {
    filter_id: req.body.filter_id,
    user_id: req.decoded.user_id,
  };
  try {
    const newLead = new Lead(leadParam);
    if(req.body.filter_id!=4){
      newLead.filter().then(leadList => {
          res.send({ leadList });
      })
    }
    else{
      new Lead({ user_id: req.decoded.user_id }).all().then(leadList => {
        res.send({ leadList });
      });
    }
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};
module.exports = { add, all, last,addComment,allComment,franchiseList,convertedList,filter};