const https = require('https');

const baseUrl = 'https://carrotfoodelivery.com';
const slug = 'bharat-caterers'; // Check this specific restaurant

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

function isRestaurantOpen(active, schedules) {
    if (!active) return false;
    // Simple check: assuming if active=true, it's open. 
    // Real logic might involve checking time ranges in 'schedules'.
    return true;
}

async function diagnose() {
    console.log(`Diagnosing Restaurant: ${slug}...`);

    try {
        // 1. Get Restaurant Details
        const detailsUrl = `${baseUrl}/api/v1/restaurants/details/${slug}`;
        const detailsRes = await fetchJson(detailsUrl);

        if (detailsRes.status !== 200) {
            console.error('❌ Failed to fetch restaurant details.');
            return;
        }

        const restaurant = detailsRes.data;
        const resId = restaurant.id;
        console.log(`✅ Restaurant Found: ${restaurant.name} (ID: ${resId})`);
        console.log(`   - Output: Active=${restaurant.active}, Status=${restaurant.status}`);

        // 2. Get Products
        // params: restaurant_id, category_id=0, type='all', offset=1, page_limit=50
        const productsUrl = `${baseUrl}/api/v1/products/latest?restaurant_id=${resId}&category_id=0&type=all&offset=1&limit=50`;
        const productsRes = await fetchJson(productsUrl);

        const products = productsRes.data.products || [];

        if (products.length > 0) {
            console.log(`✅ Products Found: ${products.length} items`);
            console.log('   - Sample Item:', products[0].name);
            console.log('   - Available Time:', products[0].available_time_starts, '-', products[0].available_time_ends);
        } else {
            console.error('❌ No products found for this restaurant.');
        }

        console.log('\n--- Diagnosis Summary ---');
        if (restaurant.active && products.length > 0) {
            console.log('Everything looks CORRECT on the backend.');
            console.log('If you still see "No Food Found", it is strictly a frontend display issue (likely the Previous API URL fix needs a browser refresh).');
        } else {
            console.log('There is a backend data issue.');
        }

    } catch (e) {
        console.error('Diagnosis Script Error:', e);
    }
}

diagnose();
