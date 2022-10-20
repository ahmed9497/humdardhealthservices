const ClientPayments = require("../models/payment.model");
const Staff = require("../models/staff.models");
const Clients = require("../models/clients.models");
const response = require("../config/response");

const addPayment = async (req, res) => {
  const payment = new ClientPayments({
    ...req.body,
  });
  payment.save().then((resp) =>
    response.success(res, {
      data: resp,
    })
  );
};
const getPayments = async (req, res) => {
  const { clientId } = req.body;
  let data = await ClientPayments.find({ clientId: clientId })
    .populate("staffPayments.assignStaff")
    .lean()
    .exec();

  data.forEach((e) => {
    let rem = e.staffPayments.reduce((prev, cur) => {
      return parseInt(prev) + parseInt(cur.salary);
    }, 0);
    e.paidToStaff = rem || 0;
  });

  response.success(res, {
    data,
  });
};

const geOnCall = async (req, res) => {
  let staffCount = await Staff.countDocuments({ status: "unblock" })
    .lean()
    .exec();
  let clientCount = await Clients.countDocuments().lean().exec();

  let stats = await ClientPayments.aggregate([
    {
      $unwind: "$staffPayments",
    },
    {
      $group: {
        _id: null,
        totalEarning: {
          $sum: {
            $toDouble: "$amount",
          },
        },

        salaries: {
          $sum: "$staffPayments.remainingBalance",
        },
      },
    },
  ]);
if(stats.length){

  stats[0].staffCount = staffCount;
  stats[0].clientCount = clientCount;
}

  let data = await ClientPayments.find()
    .populate({
      path: "clientId",
      match: { jobStatus: "open" },
      
    }).sort({createdAt:-1})
    .lean()
    .exec();
    
    data = data
    .filter((i) => i.clientId)
    .map((item) => {
      return {
        ...item.clientId,
        ...item,
        clientId: item.clientId._id,
      };
    });
    data =data.filter((v,i,a)=>a.findIndex(v2=>(v2.clientId===v.clientId))===i)

  let responseData = {
    stats,
    data,
  };
  response.success(res, {
    responseData,
  });
};
const addAssignedStaffPayment = async (req, res) => {
  const { paymentId, assignStaff, salary, date, remainingBalance } = req.body;
  const data = await ClientPayments.findOneAndUpdate(
    { _id: paymentId },
    {
      $push: {
        staffPayments: {
          assignStaff,
          salary,
          date,
          remainingBalance,
        },
      },
    }
  )
    .lean()
    .exec()
    .then((resp) =>
      response.success(res, {
        data: resp,
      })
    );
};

module.exports = { addPayment, getPayments, addAssignedStaffPayment, geOnCall };
