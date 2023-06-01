const openAi = require("../index");
const DebateModel = require("../models/DebateModel");
const { stripe } = require("../utils/stripe");
const moment = require("moment");

class UtilityMethods {
  async getUserSubscriptionStatus(stripeCustomerId) {
    try {
      const subscriptions = await stripe.subscriptions.list(
        {
          customer: stripeCustomerId ?? null,
          status: "all",
          expand: ["data.default_payment_method"],
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );
      if (!subscriptions.data.length) {
        return {
          status: false,
        };
      } else {
        const currentPeriodEnd = moment.unix(
          subscriptions.data[0].current_period_end
        );
        const now = moment();
        const remainingDays = currentPeriodEnd.diff(now, "days");
        return {
          plan: subscriptions.data[0].plan.interval,
          subscriptionId: subscriptions.data[0].id,
          status: subscriptions.data[0].status,
          remainingDays,
        };
      }
    } catch (error) {
      throw Error(error);
    }
  }

  hasVoted(teams, teamName, userId) {
    return teams.some((team) => {
      if (team.name === teamName) {
        if (team?.vote?.length === 0 || !team?.vote) {
          return false;
        } else {
          return team.vote?.find((user) => user.toString() === userId);
        }
      } else {
        return false;
      }
    });
  }

  async getOpenAiResponse(prompt){
    try {
        const res =  await openAi.createCompletion({
          model: "text-davinci-003",
          prompt,
          temperature: 0.5,
          max_tokens:512,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0,
      
  })
    return res.data?.choices[0].text;
    } catch (error) {
      return error.message
    }
  }



}
module.exports = new UtilityMethods();
