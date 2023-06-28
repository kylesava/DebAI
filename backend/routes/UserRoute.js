const {
  getLoggedInUser,
  searchUser,
  updateUser,
  getPrices,
  setStripeSession,
  cancelSubscription,
  handleRateUser,
  getTopUsers,
  getTopTenDebators,
  deleteUser,
  getUserStats,
  getUserAnalytics
} = require("../controller/UserController");
const router = require("express").Router();
const EmailService = require("../services/EmailService")
router.post("/rate",handleRateUser)
router.get("/getLoggedInUser", getLoggedInUser);
router.get("/prices", getPrices);
router.post("/setStripeSession", setStripeSession);
router.post("/cancelSubscription", cancelSubscription);
router.get("/search", searchUser);
router.put("/:userId", updateUser);
router.get("/topDebators",getTopUsers)
router.get("/leadingDebators",getTopTenDebators)
router.get("/stats",getUserStats)
router.get("/analytics",getUserAnalytics  )
router.post("/email",(req,res)=>EmailService.signUpEmail(res,res))

router.delete("/:id",deleteUser)

module.exports = router;
