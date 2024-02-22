const axios = require('axios');
const cheerio = require('cheerio');

const PuzzleSolver = require('./puzzleSolver');


const askforPuzzle = async (siteKey, url = 'https://api.friendlycaptcha.com/api/v1/puzzle') => {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36 OPR/44.0.2510.857',
        'Accept': '*/*',
        'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'none',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'dnt': '1',
        'x-frc-client': 'js-0.9.0'
    };

    try {
        const res = await axios.get(url, { headers: headers, params: { sitekey: siteKey } });
        return res.data.data.puzzle;
    } catch (error) {
        console.error('Error getting Puzzle! Retrying...');
    }
};

(async () => {
    const puzzle = await askforPuzzle('FCMGEMUD2KTDSQ5H');
    console.log(`Puzzle ${puzzle} generated, solving...`);

    const solver = new PuzzleSolver(puzzle);
    const captchaSolved = await solver.solve();
    console.log(`Solution: ${captchaSolved.slice(0, 10)}...${captchaSolved.slice(-10)}`);


    const payload = new URLSearchParams({
        "name": "bad captcha",
        "feedback": ":/",
        "thoughts": ":D",
        "frc-captcha-solution": captchaSolved
    });

    const headers = {
        "authority": "friendlycaptcha.com",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "cookie": "trp_language=en_US; pdfcc=12",
        "origin": "https://friendlycaptcha.com",
        "referer": "https://friendlycaptcha.com/demo",
        "sec-ch-ua": '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    };

    const response = await axios.post("https://friendlycaptcha.com/demo", payload, { headers: headers });
    const $ = cheerio.load(response.data);
    console.log(`Response: ${$('h3.title').text()}`);
})();
