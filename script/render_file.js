const ejs = require('ejs')
const fs = require('fs')

const json_dir = __dirname + '/json/events/'
const output_dir = __dirname + '/../docs/'
const template_index = __dirname + "/../ejs/index.ejs"
const template_single = __dirname + "/../ejs/single.ejs"

let items = [];

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
            started_at: event.started_at,
            ended_at: event.ended_at,
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
            updated_at: event.updated_at
        }

        // render single page
        ejs.renderFile(template_single, item, (error, html) => {
            let output_file = output_dir + 'event/' + item.event_id + '.html';
            fs.writeFile(output_file, html, 'utf8', (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Save:' + output_file);
                }
            })
        })

        items.push(item)

    } catch (error) {
        console.log(error)
        return
    }
})

// render index page
ejs.renderFile(template_index, {items: items}, (error, html) => {
    let output_file = output_dir + 'index.html';
    fs.writeFile(output_file, html, 'utf8', (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Save:' + output_file);
        }
    })
})

console.log('Done')
