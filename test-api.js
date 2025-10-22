// Test Temperature API tanpa CORS restrictions
// Jalankan dengan: node test-api.js

const API_URL = 'https://api-sensor-tanah.whiteforest-7d22ee8f.southeastasia.azurecontainerapps.io/api/temperatures';
const API_KEY = 'jashuI&WEUEHCznxnnskawo8e8TYYgbhsafbjgovoosdfrAngga';

async function testAPI(headerType) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 Testing dengan header type: ${headerType}`);
    console.log('='.repeat(60));

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // Tambahkan API key sesuai format yang dipilih
        switch(headerType) {
            case 'X-API-Key':
                headers['X-API-Key'] = API_KEY;
                break;
            case 'x-api-key':
                headers['x-api-key'] = API_KEY;
                break;
            case 'Authorization':
                headers['Authorization'] = `Bearer ${API_KEY}`;
                break;
            case 'Api-Key':
                headers['Api-Key'] = API_KEY;
                break;
            case 'apikey':
                headers['apikey'] = API_KEY;
                break;
            case 'none':
                // Tidak menambahkan API key
                break;
        }

        console.log('\n📋 Request Headers:');
        console.log(JSON.stringify(headers, null, 2));
        console.log('\n🚀 Mengirim request ke:', API_URL);

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: headers,
        });

        console.log(`\n📡 Response Status: ${response.status} ${response.statusText}`);
        
        console.log('\n📋 Response Headers:');
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });
        console.log(JSON.stringify(responseHeaders, null, 2));

        if (!response.ok) {
            const errorText = await response.text();
            console.log('\n❌ ERROR Response Body:');
            console.log(errorText);
            return { success: false, headerType, status: response.status };
        }

        const data = await response.json();
        console.log('\n✅ SUCCESS! Response Data:');
        console.log(JSON.stringify(data, null, 2));
        return { success: true, headerType, data };

    } catch (error) {
        console.log('\n❌ Exception Error:');
        console.log(error.message);
        return { success: false, headerType, error: error.message };
    }
}

async function runAllTests() {
    console.log('\n🌡️ Temperature API Tester');
    console.log('='.repeat(60));
    console.log(`API URL: ${API_URL}`);
    console.log(`API Key: ${API_KEY.substring(0, 10)}...${API_KEY.substring(API_KEY.length - 5)}`);
    
    const headerTypes = [
        'X-API-Key',
        'x-api-key', 
        'Authorization',
        'Api-Key',
        'apikey',
        'none'
    ];

    const results = [];

    for (const headerType of headerTypes) {
        const result = await testAPI(headerType);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 detik
    }

    console.log('\n\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    
    results.forEach(result => {
        const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
        console.log(`${status} - ${result.headerType}`);
    });

    const successfulTest = results.find(r => r.success);
    if (successfulTest) {
        console.log('\n🎉 Format header yang BENAR:');
        console.log(`   ${successfulTest.headerType}`);
    } else {
        console.log('\n⚠️ Semua test gagal. Kemungkinan masalah:');
        console.log('   1. API Key tidak valid');
        console.log('   2. API endpoint tidak dapat diakses');
        console.log('   3. Server membutuhkan format header khusus lainnya');
    }
}

// Jalankan tests
runAllTests().catch(console.error);
