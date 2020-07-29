const Lead = require("./../models/lead.model");
const {v1: uuidv1} = require("uuid");

exports.getLeadById = async (req, res) => {
  try {
    const {query} = req;
    const { id } = req.params;
    let lead;
    if(query&&query.location_string){
      lead = await Lead.find(query);
    }
    else if(id){
    lead = await Lead.findOne({ id: id });
    }
    
    if (!lead) {
      return res.status(404).json({});
    }
    res.status(200).json(lead);
  } catch (err) {
    res.status(400).json({ status: "failure", reason: err });
  }
};

exports.addLead = async (req, res) => {
  try {
    if (!Object.entries(req.body).length) {
      throw { statusCode: 400, reason: "Invalid Request" };
    }
    const leadId = uuidv1(); // Generating custom Lead ID
    const leadInfo = Object.assign(req.body, { id: leadId, status: "Created" });
    const result = await Lead.create(leadInfo);
    if (!result) {
      throw { reason: "Failed to generate lead" };
    }
    res.status(201).json(result);
  } catch (err) {
    customErrObj(res, err);
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Object.entries(req.body).length) {
      throw { statusCode: 400, reason: "Invalid Request" };
    }
    const updatedLead = await Lead.updateOne({ id: id }, { $set: req.body });
    if (!updatedLead) {
      throw { reason: "Unable to update lead info" };
    }
    // n=0 if no document was found for updation
    if (!updatedLead.n) {
      throw { reason: "No lead found" };
    }
    res.status(202).json({ status: "success" });
  } catch (err) {
    customErrObj(res, err);
  }
};
exports.markLead = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Object.entries(req.body).length) {
      throw { reason: "Invalid Request" };
    }
    const { communication } = req.body;
    if (!communication) {
      throw { reason: "Invalid Request" };
    }
    const markLeadReqBody = Object.assign(req.body, { status: "Contacted" });
    const markedLead = await Lead.update({ id: id }, { $set: markLeadReqBody });

    if (!markedLead) {
      throw { reason: "Unable to update lead info" };
    }
    // n=0 if no document was found for updation
    if (!markedLead.n) {
      throw { reason: "No lead found" };
    }
    res.status(202).json({ status: "Contacted", communication: communication });
  } catch (err) {
    customErrObj(res,err);
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const leadDeleted = await Lead.deleteOne({ id: id });
    if (!leadDeleted) {
      throw { reason: "Unable to delete lead" };
    }
    res.status(200).json({ status: "success" });
  } catch (err) {
    customErrObj(res,err);
  }
};

const customErrObj = (res, err) => {
  const errCode = err.statusCode || 400;
  const msg = err.reason || err;
  res.status(errCode).json({ status: "failure", reason: msg });
};
