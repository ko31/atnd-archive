const ejs = require('ejs')
const fs = require('fs')
const moment = require('moment-timezone')

const json_dir = __dirname + '/json/events/'
const output_dir = __dirname + '/../docs/'
const template_index = __dirname + "/../ejs/index.ejs"
const template_single = __dirname + "/../ejs/single.ejs"

var items = {}

// read json files
fs.readdirSync(json_dir).forEach(function (file) {
    try {
        let data = fs.readFileSync(json_dir + file, 'utf8')
        let jsonObject = JSON.parse(data)
        let event = jsonObject.events[0].event
        let item = {
            event_id: event.event_id,
            title: event.title,
            catch_text: event.catch,
            description: event.description,
            event_url: event.event_url,
            started_at: (event.started_at ? moment.tz(event.started_at, 'UTC').tz("Asia/Tokyo").format('YYYY-MM-DD') : ''),
            ended_at: (event.ended_at ? moment.tz(event.ended_at, 'UTC').tz("Asia/Tokyo").format('YYYY-MM-DD') : ''),
            url: event.url,
            limit: event.limit,
            address: event.address,
            place: event.place,
            lat: event.lat,
            lon: event.lon,
            owner_id: event.owner_id,
            owner_nickname: event.owner_nickname,
            owner_twitter_id: event.owner_twitter_id,
            accepted: event.accepted,
            waiting: event.waiting,
            updated_at: (event.updated_at ? moment.tz(event.updated_at, 'UTC').tz("Asia/Tokyo").format('YYYY-MM-DD') : '')
        }

        // render single page
        ejs.renderFile(template_single, item, (error, html) => {
            let output_file = output_dir + 'event/' + item.event_id + '.html'
            fs.writeFile(output_file, html, 'utf8', (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Save:' + output_file);
                }
            })
        })

        let page
        if (event.event_id <= 10000) {
            page = 1
        } else if (event.event_id <= 20000) {
            page = 2
        } else if (event.event_id <= 30000) {
            page = 3
        } else if (event.event_id <= 40000) {
            page = 4
        } else if (event.event_id <= 50000) {
            page = 5
        } else if (event.event_id <= 60000) {
            page = 6
        } else if (event.event_id <= 70000) {
            page = 7
        } else if (event.event_id <= 80000) {
            page = 8
        } else if (event.event_id <= 90000) {
            page = 9
        } else if (event.event_id <= 100000) {
            page = 10
        } else if (event.event_id <= 110000) {
            page = 11
        } else {
            page = 12
        }

        if (!items.hasOwnProperty(page)) {
            items[page] = []
        }
        items[page].push(item)

    } catch (error) {
        console.log(error)
        return
    }
})

// render index page
for (let i in items) {
    if (i == 0) {
        continue
    }
    ejs.renderFile(template_index, {items: items[i], page: i}, (error, html) => {
        let output_file = output_dir + 'index' + ((i > 1) ? i : '') + '.html'
        fs.writeFile(output_file, html, 'utf8', (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Save:' + output_file);
            }
        })
    })
}

console.log('Done')
