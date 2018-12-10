process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const axios = require("axios")
const Throttle = require('promise-parallel-throttle');
const _ = require("lodash");

(async function functionName() {

    const queue = _.times(10000, i => async () => {
        const client = axios.create({
            baseURL: 'https://www.vebongdaonline.vn/',
            timeout: 10000,
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'referer': 'https://www.vebongdaonline.vn/bookTicket',
                'authority': 'www.vebongdaonline.vn',
                'cookie': "_gat_UV-108626640-2=ZOPI5BH653E4_11504695; _ga=GA1.2.498058206.1544411520; _gid=GA1.2.1558458836.1544411520; JSESSIONID=A2DA6E31063124908715152F92AC5A0C; _gat_UA-108626640-2=1"
            }
        });
        try {
            const reqBody = {"matchId":"28","price":_.sample(["200000","350000","500000","600000"]),"seat":"1"}
            const res = await client.post("checkValidBookTicket", JSON.stringify(reqBody))
            console.dir(`${res.data} - ${JSON.stringify(reqBody)}`)
        } catch (e) {

        }
    });

    //Default Throttle runs with 5 promises parallel.
    const formattedNames = await Throttle.all(queue, {maxInProgress: 5});
})()