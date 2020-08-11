"use strict";
const api_key = process.env.REACT_APP_STRIPE_SKEY;
const stripe = require("stripe")(api_key);
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const { id } = ctx.state.user;

    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: "inr",
      source: stripeTokenId,
      description: `order ${new Date()} by ₹{ctx.state.user.username}`,
    });

    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id,
    });
    return order;
  },
};
