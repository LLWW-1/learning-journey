// ====================================
// Day 10 - 异步编程与 API 调用
// ====================================

// ========== 1. 同步 vs 异步演示 ==========

// 同步演示 - 会阻塞
document.getElementById('syncBtn').addEventListener('click', function () {
    const output = document.getElementById('asyncOutput');
    output.innerHTML = '开始执行...<br>';

    output.innerHTML += '第1步<br>';

    // 同步等待 3 秒（阻塞）
    const start = Date.now();
    while (Date.now() - start < 3000) {
        // 阻塞 3 秒
    }
    output.innerHTML += '第2步（等了3秒）<br>';
    output.innerHTML += '第3步<br>';
    output.innerHTML += '✅ 同步执行完成（被阻塞了3秒）';
});

// 异步演示 - 不阻塞
document.getElementById('asyncBtn').addEventListener('click', function () {
    const output = document.getElementById('asyncOutput');
    output.innerHTML = '开始执行...<br>';

    output.innerHTML += '第1步<br>';

    // 异步等待 3 秒（不阻塞）
    setTimeout(() => {
        output.innerHTML += '第2步（异步，3秒后执行）<br>';
        output.innerHTML += '✅ 异步执行完成<br>';
    }, 3000);

    output.innerHTML += '第3步（不会等待，立即执行）<br>';
    output.innerHTML += '⏰ 等待3秒后会看到第2步...';
});

// Promise 演示
document.getElementById('promiseBtn').addEventListener('click', function () {
    const output = document.getElementById('asyncOutput');
    output.innerHTML = 'Promise 演示...<br>';

    // 创建一个 Promise
    const myPromise = new Promise((resolve, reject) => {
        output.innerHTML += 'Promise 内部：开始执行<br>';

        setTimeout(() => {
            const success = true;
            if (success) {
                resolve('数据加载成功！🎉');
            } else {
                reject('加载失败 😢');
            }
        }, 2000);
    });

    output.innerHTML += '等待 Promise 结果...<br>';

    // 处理 Promise 结果
    myPromise
        .then(result => {
            output.innerHTML += `✅ Promise 成功: ${result}<br>`;
        })
        .catch(error => {
            output.innerHTML += `❌ Promise 失败: ${error}<br>`;
        });
});

// ========== 2. Fetch API 演示 ==========

// 使用 .then() 方式
document.getElementById('fetchThenBtn').addEventListener('click', function () {
    const output = document.getElementById('fetchOutput');
    output.innerHTML = '⏳ 加载中...';

    // 使用免费的 JSON 占位 API
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json(); // 解析 JSON
        })
        .then(data => {
            output.innerHTML = `
                ✅ 请求成功！<br>
                <strong>标题:</strong> ${data.title}<br>
                <strong>内容:</strong> ${data.body}<br>
                <strong>用户ID:</strong> ${data.userId}
            `;
        })
        .catch(error => {
            output.innerHTML = `❌ 错误: ${error.message}`;
        });
});

// 使用 async/await 方式（更优雅）
document.getElementById('fetchAsyncBtn').addEventListener('click', async function () {
    const output = document.getElementById('fetchOutput');
    output.innerHTML = '⏳ 加载中...';

    try {
        // await 会等待 Promise 完成
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/2');

        if (!response.ok) {
            throw new Error('网络请求失败');
        }

        const data = await response.json();

        output.innerHTML = `
            ✅ 请求成功！(async/await)<br>
            <strong>标题:</strong> ${data.title}<br>
            <strong>内容:</strong> ${data.body}<br>
            <strong>用户ID:</strong> ${data.userId}
        `;
    } catch (error) {
        output.innerHTML = `❌ 错误: ${error.message}`;
    }
});

// ========== 3. 天气查询应用 ==========

// OpenWeatherMap API 配置
// 注意：你需要注册免费账号获取 API Key
// 注册地址：https://openweathermap.org/api
const API_KEY = 'YOUR_API_KEY';  // ⚠️ 请替换成你自己的 API Key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 备选方案：如果不想注册，可以用模拟数据演示
// 实际使用时请注册获取免费 API Key

// 模拟天气数据（当没有 API Key 时使用）
function getMockWeather(city) {
    const mockData = {
        '北京': { temp: 22, desc: '晴朗', humidity: 45, wind: 12, pressure: 1013 },
        '上海': { temp: 24, desc: '多云', humidity: 65, wind: 8, pressure: 1012 },
        '成都': { temp: 20, desc: '阴天', humidity: 70, wind: 5, pressure: 1015 },
        '深圳': { temp: 28, desc: '晴天', humidity: 60, wind: 10, pressure: 1010 },
        '广州': { temp: 27, desc: '晴间多云', humidity: 62, wind: 9, pressure: 1011 },
    };

    return mockData[city] || { temp: 18, desc: '未知天气', humidity: 50, wind: 8, pressure: 1013 };
}

// 从 OpenWeatherMap 获取真实天气数据
async function fetchRealWeather(city) {
    // 检查是否配置了 API Key
    if (API_KEY === 'YOUR_API_KEY') {
        console.log('⚠️ 请先注册 OpenWeatherMap 获取免费 API Key');
        return null;
    }

    try {
        const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_cn`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('未找到该城市，请检查城市名称');
            }
            throw new Error(`请求失败: ${response.status}`);
        }

        const data = await response.json();
        return {
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            pressure: data.main.pressure,
            city: data.name
        };
    } catch (error) {
        console.error('获取天气失败:', error);
        return null;
    }
}

// 更新页面显示天气
function updateWeatherUI(weather, city) {
    const weatherResult = document.getElementById('weatherResult');

    if (!weather) {
        weatherResult.innerHTML = `
            <div class="error">
                ❌ 获取天气失败，请检查城市名称或网络连接
            </div>
        `;
        return;
    }

    weatherResult.innerHTML = `
        <div class="weather-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div class="weather-city">📍 ${city}</div>
            <div class="weather-temp">${weather.temp}°C</div>
            <div class="weather-desc">${weather.desc}</div>
            <div class="weather-info">
                <div class="weather-info-item">
                    <div class="weather-info-label">湿度</div>
                    <div class="weather-info-value">${weather.humidity}%</div>
                </div>
                <div class="weather-info-item">
                    <div class="weather-info-label">风速</div>
                    <div class="weather-info-value">${weather.wind} km/h</div>
                </div>
                <div class="weather-info-item">
                    <div class="weather-info-label">气压</div>
                    <div class="weather-info-value">${weather.pressure} hPa</div>
                </div>
            </div>
        </div>
    `;
}

// 查询天气（主函数）
async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (!city) {
        alert('请输入城市名称');
        return;
    }

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <div class="loading">
            <div>⏳ 正在查询 ${city} 的天气...</div>
        </div>
    `;

    // 先尝试获取真实天气
    let weather = await fetchRealWeather(city);

    // 如果真实天气获取失败，使用模拟数据
    if (!weather) {
        console.log('使用模拟数据');
        const mock = getMockWeather(city);
        weather = {
            temp: mock.temp,
            desc: mock.desc,
            humidity: mock.humidity,
            wind: mock.wind,
            pressure: mock.pressure
        };
    }

    updateWeatherUI(weather, city);
}

// 绑定搜索按钮
document.getElementById('searchBtn').addEventListener('click', searchWeather);

// 按回车键搜索
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// 页面加载时自动查询默认城市
setTimeout(() => {
    searchWeather();
}, 500);

// ========== 控制台输出说明 ==========
console.log('📡 天气应用已启动！');
console.log('💡 提示：要获取真实天气数据，请注册 OpenWeatherMap 获取免费 API Key');
console.log('🔗 注册地址: https://openweathermap.org/api');
console.log('📝 注册后替换 script.js 中的 API_KEY 变量');