const https = require('https');

const baseUrl = 'https://carrotfoodelivery.com';

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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
    console.log('Diagnosing Categories...');

    try {
        // 1. Get Categories
        const categoriesUrl = `${baseUrl}/api/v1/categories`;
        const categoriesRes = await fetchJson(categoriesUrl);

        const categories = categoriesRes.data || [];
        console.log(`✅ Categories Found: ${categories.length}`);
        if (categories.length > 0) {
            console.log('   - Sample Category:', categories[0].name, '(ID:', categories[0].id, ')');
        } else {
            console.error('❌ NO CATEGORIES FOUND. This will break the frontend display logic.');
        }

        // 2. Get Products again to check their category_ids
        // We know from previous test that restaurant_id=2 (Swagat Hotel)
        const productsUrl = `${baseUrl}/api/v1/products/latest?restaurant_id=2&category_id=0&type=all&offset=1&limit=10`;
        const productsRes = await fetchJson(productsUrl);
        const products = productsRes.data.products || [];

        console.log(`\nChecking Product Category IDs for Restaurant 2...`);
        if (products.length > 0) {
            products.forEach(p => {
                console.log(`   - Product: "${p.name}" has Category IDs: ${JSON.stringify(p.category_ids)}`);
            });
        }

    } catch (e) {
        console.error('Diagnosis Error:', e);
    }
}

diagnose();
