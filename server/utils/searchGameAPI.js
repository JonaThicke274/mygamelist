const fetch = require('node-fetch');

async function searchForGameByTitle(title) {
    const options = {
        method: 'POST',
        headers: {
          cookie: '__cf_bm=37lz39WA3E45IG89gK7PThsJfemRyHN3dpOayu.TQ98-1672967334-0-AcbTaoF%2B4rc680gxcVmCVOQauaRe6Cjg7i3yIjip5%2Fq6wzBMS0HgRw4t%2FJdMjRxOxz0m5Cm8cZ8ugvPYQy%2FE8HA%3D',
          'Client-ID': 'kjvc6vnrvqhdakzi2t1u7czzdsj70s',
          Authorization: 'Bearer o6txj49s2qpq6z7cbwtdupj4ured8n',
          'Content-Type': 'application/json'
        },
        body: `search "${title}"; fields game.name, game.cover.url, game.summary, game.url;`
    };
      
    try {
        const response = await fetch('https://api.igdb.com/v4/search', options);
        const body = await response.json();
        console.log(body)
        return { error: false, data: body };
    } catch (e) {
        console.log(e);
        return { error: true };
    }
}

module.exports = searchForGameByTitle;
// console.log(searchForGameByTitle("Returnal"))