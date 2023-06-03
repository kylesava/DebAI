const {
  getLoggedInUser,
  searchUser,
  updateUser,
  getPrices,
  setStripeSession,
  cancelSubscription,
  handleRateUser,
  getTopUsers,
  getTopTenDebators
} = require("../controller/UserController");
const router = require("express").Router();

router.post("/rate",handleRateUser)
router.get("/getLoggedInUser", getLoggedInUser);
router.get("/prices", getPrices);
router.post("/setStripeSession", setStripeSession);
router.post("/cancelSubscription", cancelSubscription);
router.get("/search", searchUser);
router.put("/:userId", updateUser);
router.get("/topDebators",getTopUsers)
router.get("/leadingDebators",getTopTenDebators)
module.exports = router;
