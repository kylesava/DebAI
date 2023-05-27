const pusher = require("../utils/setup");

class DebateService {
    static async pushDataToFrontend(data) {
        try {
            const res = await pusher.trigger("debate", "debate-members", data)
            console.log("pusher", res.data)
        } catch (error) {
            console.log("pusher error ", error)
        }
    }
}
module.exports = DebateService;