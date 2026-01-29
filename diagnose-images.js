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
    console.log('Diagnosing Product Images...');

    try {
        // Fetch products for Restaurant 2
        const productsUrl = `${baseUrl}/api/v1/products/latest?restaurant_id=2&category_id=0&type=all&offset=1&limit=50`;
        console.log(`Fetching: ${productsUrl}`);

        const productsRes = await fetchJson(productsUrl);
        const products = productsRes.data.products || [];

        console.log(`✅ Products Found: ${products.length}`);

        // Log ALL items
        products.forEach(p => {
            console.log(`\n🔍 Product: "${p.name}"`);
            console.log(`   - Image: ${p.image}`);
            console.log(`   - Image Full URL: ${p.image_full_url}`);

            if (!p.image_full_url || p.image_full_url.endsWith('null') || p.image_full_url.endsWith('undefined')) {
                console.log('   ❌ URL is invalid!');
            } else {
                console.log('   ✅ URL looks structurally valid.');
            }
        });

    } catch (e) {
        console.error('Diagnosis Error:', e);
    }
}

diagnose();
