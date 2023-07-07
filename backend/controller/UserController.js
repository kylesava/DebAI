const UserModel = require("../models/UserModel");
const { isUserUpdated } = require("../services/AuthService");
const { getUserSubscriptionStatus } = require("../services/UtilityMethods");
const { stripe } = require("../utils/stripe");
const Enums = require("../utils/Enums")

class UserController {
  async addUser(req, res) {
    const { email } = req.body;

    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        throw Error("This email is  already used");
      }
      const savedUser = await UserModel.create(req.body);
      return res.json({ message: savedUser, success: true });
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  }
  async updateUser(req, res) {
    const { userId } = req.params;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        {
          new: true,
          returnDocument:true,
          returnOriginal:false
        }
      );
      const {password,...others} = updatedUser._doc;
      res.status(200).json({ message: others, success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error, success: false });
    }
  }

  async deleteUser(req, res) {
    const {id} = req.params;
    try {
      await UserModel.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "User deleted successfully", success: true });
    } catch (error) {
      res.status(500).json({ message: error, success: false });
    }
  }

  async getPrices(req, res) {
    try {
      const prices = await stripe.prices.list(
        {
          active: true,
          limit: 1,
        },{
        apiKey: process.env.STRIPE_SECRET_KEY,              
      }
      );
      res.send(prices);
    } catch (error) {
      console.log("*error: ", error);
      res.status(500).json({ message: error, success: false });
    }
  }

  async cancelSubscription(req, res) {
    try {
      const { subscriptionId } = req.body;
      const deletedSubscription = await stripe.subscriptions.del(
        subscriptionId
      );
      return res.status(200).json(deletedSubscription);
    } catch (error) {
      console.log("*error: ", error);
      res
        .status(500)
        .json({ message: "Failed to cancel subscription", success: false });
    }
  }

  async setStripeSession(req, res) {
    console.log("the set session fire");
    try {
      const user = await UserModel.findOne({ _id: req.body.userId });
      const session = await stripe.checkout.sessions.create(
        {
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
            {
              price: req.body.priceId,
              quantity: 1,
            },
          ],
          success_url: 'https://'+req.body.redirectUrl,
          cancel_url: 'https://'+req.body.redirectUrl,
          customer: user.stripeCustomerId,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );

      return res.json(session);
    } catch (error) {
      console.log("*error: ", error);
      res.status(500).json({ message: error, success: false });
    }
  }

  async getLoggedInUser(req, res) {
    const sessionUser = req.session?.passport?.user || req.session.user;


      try {
        if(!sessionUser) throw "you are not loggedIn"
        
        let updatedUser = await isUserUpdated(sessionUser);
        return res.status(200).json({ message: updatedUser, success: true });
      } catch (error) {
        console.log("the main",error)
        return res
          .status(403)
          .json({ message: error.message, success: false });
      }
  
  }

  async searchUser(req, res) {
    const { userId } = req.query;
    let keyword = {};
    try {
      if (!userId) {
        keyword = req.query.search_query
          ? {
              $or: [
                {
                  firstName: { $regex: req.query.search_query, $options: "i" },
                },
                { lastName: { $regex: req.query.search_query, $options: "i" } },
                { email: { $regex: req.query.search_query, $options: "i" } },
              ],
            }
          : {};
      } else {
        keyword = { _id: userId };
      }
      const fetchedUser = await UserModel.find(keyword);
      res.status(200).json({ message: fetchedUser, success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error, success: false });
    }
  }

  async handleRateUser(req,res){
    const {winnerTeam,loserTeam, winner:winnerName ,allUsers } = req.body;
     
    console.log("inside rate",winnerTeam,loserTeam,winnerName)
    let winnerPoint = 10 ;
    let loserPoint = -8;

    try {
      if(winnerName ===  Enums.TIED){

        await UserModel.updateMany(
          {
            _id:{$in:allUsers}
          },
          {
            $inc:{points:5}
          }
        )  
      }else{
        await UserModel.updateMany(
          {
            _id:{$in:winnerTeam}
          },
          {
            $inc:{points: winnerPoint}
          }
        )  
        await UserModel.updateMany(
          {
            _id:{$in: loserTeam}
          },
          {
            $inc:{points:loserPoint}
          }
        )  
      }
      return res.status(200).json({message:"successfulll"})
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:error})
    }
  
  }

  async getTopUsers(req,res){
    try {
        const topUsers = await UserModel.find({}).sort({points:-1}).limit(10)
        return res.status(200).json({message:topUsers,success:true})
      } catch (error) {
        console.log(error)
        return res.status(500).json({message:error,success:false})
      
    }
  }


  async getTopTenDebators(req,res){
    try {



  const topDebators =  await UserModel.aggregate([
  {
    $lookup: {
      from: 'debates',
      localField: '_id',
      foreignField: 'teams.members',
      as: 'debateCount'
    }
  },
  {
    $project: {
      _id: 1,
      firstName: 1,
      lastName:1,
      avatar:1,
      points: 1,
      country:1,
      debateCount: { $size: '$debateCount' }
    }
  },
  {
    $sort: { points: -1 }
  },
  {
    $limit: 10
  }
])

res.status(200).json({message:topDebators,success:true})

    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
  }
  async getUserStats (req,res){

    const {month} = req.query;

    try {
      const user_count = await UserModel.countDocuments({});
      const startOfTwoMonthsCount = await UserModel.countDocuments({ createdAt: { $lt: new Date().setMonth(new Date().getMonth() - Number(month)) } });

    // Get the total number of users at the end of the two-month period
    const endOfTwoMonthsCount = await UserModel.countDocuments({ createdAt: { $lte: new Date() } });

    // Calculate the percentage change
    let percentageChange = ((endOfTwoMonthsCount - startOfTwoMonthsCount) / startOfTwoMonthsCount) * 100;
      console.log(startOfTwoMonthsCount,endOfTwoMonthsCount,percentageChange)
    res.status(200).json({ message:{
      stats:  percentageChange.toFixed(2),
      user_count
    } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:error.message,success:false });
  }

  }

  // async getUserAnalytics(req,res){
  //   const {year} = req.query;
  //   const currentDate = new Date();
  // const currentMonth = currentDate.getMonth();
  // const months = [
  //   '',
  //   'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  //   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  // ];
  
  // const userStatistics = await UserModel.aggregate([
  //   {
  //     $match: {
  //       createdAt: {
  //         $gte: new Date(year, 0, 1),
  //         $lte: new Date(year, currentMonth, currentDate.getDate()),
  //       },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: { $month: '$createdAt' },
  //       count: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $sort: { '_id': 1 },
  //   },
  //   {
  //     $group: {
  //       _id: null,
  //       userStatistics: { $push: { month: { $arrayElemAt: [months, '$_id'] }, users: '$count' } },
  //     },
  //   },
  //   {
  //     $project: {
  //       userStatistics: {
  //         $map: {
  //           input: months.slice(1, currentMonth + 1),
  //           as: 'month',
  //           in: {
  //             $let: {
  //               vars: {
  //                 matchedStat: {
  //                   $arrayElemAt: [
  //                     '$userStatistics',
  //                     { $indexOfArray: ['$userStatistics.month', '$$month'] },
  //                   ],
  //                 },
  //               },
  //               in: {
  //                 $cond: [
  //                   { $ne: ['$$matchedStat', null] },
  //                   '$$matchedStat',
  //                   { month: '$$month', users: 0 },
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       },
  //       _id: 0,
  //     },
  //   },
  //   {
  //     $unwind: '$userStatistics',
  //   },
  //   {
  //     $replaceRoot: { newRoot: '$userStatistics' },
  //   },
  // ]);
  // return res.status(200).json({userStatistics})
  // }
  async getUserAnalytics(req,res){
    const {year} = req.query; 
    try{

      if(!year) throw "pass year query"
      const userStatistics = [];
      
      
      for (let month = 0; month < 12; month++) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        
        const count = await UserModel.countDocuments({
          createdAt: { $gte: startDate, $lte: endDate },
        });
        
        userStatistics.push({
          month:   startDate.toLocaleString('en-us', { month: 'long' }), 
          users: count });
        }
        return  res.status(200).json({message:userStatistics,success:true})
      }catch(err){
        return res.status(500).json({message:err.message,success:false})
      }
  }
}

module.exports = new UserController();







