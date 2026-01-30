const https = require('https');

const baseUrl = 'https://carrotfoodelivery.com';

function fetchJson(url, headers) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: headers
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, data: json });
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function diagnose() {
    console.log('Diagnosing Categories with Headers...');

    const headers = {
        'Content-Type': 'application/json',
        'X-localization': 'en',
        'zoneId': '[1]', // Based on restaurant details having zone_id: 1
        'X-software-id': 33571750,
        'origin': 'http://localhost:3000'
    };

    try {
        // 1. Get Categories
        const categoriesUrl = `${baseUrl}/api/v1/categories`;
        console.log(`Fetching from: ${categoriesUrl} with zoneId=[1]`);

        const categoriesRes = await fetchJson(categoriesUrl, headers);

        const categories = categoriesRes.data || [];
        console.log(`✅ Categories Found: ${categories.length}`);

        if (categories.length > 0) {
            console.log('   - Sample Category:', categories[0].name, '(ID:', categories[0].id, ')');
            categories.slice(0, 5).forEach(c => {
                console.log(`     * ${c.name} (ID: ${c.id})`);
            });
        } else {
            console.error('❌ NO CATEGORIES FOUND even with headers.');
        }

    } catch (e) {
        console.error('Diagnosis Error:', e);
    }
}

diagnose();
