// ====================================
// Day 7 - JavaScript 基础入门
// ====================================

// ========== 1. 变量与数据类型 ==========
document.getElementById('showVariablesBtn').addEventListener('click', function () {
    // 变量声明
    let name = '小明';           // 字符串
    const age = 18;              // 常量，不能修改
    var city = '北京';           // 旧式声明

    // 数据类型
    let score = 95;              // 数字
    let isStudent = true;        // 布尔值
    let hobbies = ['编程', '读书', '跑步'];  // 数组
    let person = {               // 对象
        name: '小明',
        age: 18,
        city: '北京'
    };

    let output = `
        📌 变量演示：<br>
        name = ${name} (类型: ${typeof name})<br>
        age = ${age} (类型: ${typeof age})<br>
        city = ${city} (类型: ${typeof city})<br><br>
        
        📌 数据类型：<br>
        score = ${score} (类型: ${typeof score})<br>
        isStudent = ${isStudent} (类型: ${typeof isStudent})<br>
        hobbies = ${hobbies} (类型: ${typeof hobbies})<br>
        person = ${JSON.stringify(person)} (类型: ${typeof person})
    `;

    document.getElementById('variablesOutput').innerHTML = output;
});

// ========== 2. 运算符演示 ==========
// 算术运算
document.getElementById('calcBtn').addEventListener('click', function () {
    let a = 10, b = 20;
    let sum = a + b;
    let diff = a - b;
    let product = a * b;
    let quotient = a / b;

    document.getElementById('operatorOutput').innerHTML = `
        算术运算：<br>
        ${a} + ${b} = ${sum}<br>
        ${a} - ${b} = ${diff}<br>
        ${a} × ${b} = ${product}<br>
        ${a} ÷ ${b} = ${quotient}
    `;
});

// 比较运算
document.getElementById('compareBtn').addEventListener('click', function () {
    let a = 5, b = 3;
    let c = '5';

    document.getElementById('operatorOutput').innerHTML = `
        比较运算：<br>
        ${a} > ${b} : ${a > b}<br>
        ${a} < ${b} : ${a < b}<br>
        ${a} == ${b} : ${a == b}<br>
        ${a} == '${c}' : ${a == c} (== 只比较值)<br>
        ${a} === '${c}' : ${a === c} (=== 比较值和类型)<br>
        ${a} != ${b} : ${a != b}
    `;
});

// 逻辑运算
document.getElementById('logicBtn').addEventListener('click', function () {
    let isWeekend = true;
    let isSunny = false;

    document.getElementById('operatorOutput').innerHTML = `
        逻辑运算：<br>
        isWeekend = ${isWeekend}, isSunny = ${isSunny}<br>
        isWeekend && isSunny (与): ${isWeekend && isSunny}<br>
        isWeekend || isSunny (或): ${isWeekend || isSunny}<br>
        !isWeekend (非): ${!isWeekend}
    `;
});

// ========== 3. 条件判断 ==========
document.getElementById('checkAgeBtn').addEventListener('click', function () {
    let age = document.getElementById('ageInput').value;

    // 转换为数字
    age = Number(age);

    let message;

    if (isNaN(age) || age <= 0) {
        message = '❌ 请输入有效的年龄！';
    } else if (age < 12) {
        message = '🎈 小朋友，可以在家长陪同下观看电影！';
    } else if (age < 18) {
        message = '🎬 你可以观看大部分电影，但有些限制级需要家长陪同！';
    } else if (age < 60) {
        message = '🎉 欢迎观影！你可以观看所有电影！';
    } else {
        message = '👴 老年票半价优惠，祝您观影愉快！';
    }

    document.getElementById('ageOutput').innerHTML = `你 ${age} 岁：${message}`;
});

// ========== 4. 循环语句 ==========
// for 循环
document.getElementById('forLoopBtn').addEventListener('click', function () {
    let result = '';
    for (let i = 1; i <= 5; i++) {
        result += `第 ${i} 次循环<br>`;
    }
    result += '<br>✅ for 循环执行完毕！';
    document.getElementById('loopOutput').innerHTML = result;
});

// while 循环
document.getElementById('whileLoopBtn').addEventListener('click', function () {
    let sum = 0;
    let i = 1;

    while (i <= 10) {
        sum += i;
        i++;
    }

    document.getElementById('loopOutput').innerHTML = `
        while 循环：计算 1 到 10 的和<br>
        1 + 2 + 3 + ... + 10 = ${sum}
    `;
});

// ========== 5. 函数 ==========
// 打招呼函数
function greet(name) {
    return `你好，${name}！欢迎学习 JavaScript！`;
}

// 求和函数
function add(a, b) {
    return a + b;
}

// 乘法函数
function multiply(a, b) {
    return a * b;
}

document.getElementById('greetBtn').addEventListener('click', function () {
    let result = greet('小明');
    document.getElementById('functionOutput').innerHTML = result;
});

document.getElementById('sumBtn').addEventListener('click', function () {
    let result = add(5, 3);
    document.getElementById('functionOutput').innerHTML = `5 + 3 = ${result}`;
});

document.getElementById('multiplyBtn').addEventListener('click', function () {
    let result = multiply(6, 7);
    document.getElementById('functionOutput').innerHTML = `6 × 7 = ${result}`;
});

// ========== 6. 数组操作 ==========
let fruits = ['苹果', '香蕉', '橘子', '葡萄'];

function showArray() {
    document.getElementById('arrayOutput').innerHTML = `
        水果列表：[${fruits.join(', ')}]<br>
        数组长度：${fruits.length}<br>
        第二个水果：${fruits[1]}
    `;
}

document.getElementById('showArrayBtn').addEventListener('click', showArray);

document.getElementById('addFruitBtn').addEventListener('click', function () {
    fruits.push('芒果');
    showArray();
    document.getElementById('arrayOutput').innerHTML += '<br>✅ 已添加"芒果"！';
});

document.getElementById('removeLastBtn').addEventListener('click', function () {
    let removed = fruits.pop();
    showArray();
    document.getElementById('arrayOutput').innerHTML += `<br>✅ 已删除"${removed}"！`;
});

// ========== 7. 对象操作 ==========
let personInfo = {
    name: '小明',
    age: 18,
    city: '北京',
    hobbies: ['编程', '读书']
};

function showObject() {
    document.getElementById('objectOutput').innerHTML = `
        👤 个人信息：<br>
        姓名：${personInfo.name}<br>
        年龄：${personInfo.age}<br>
        城市：${personInfo.city}<br>
        爱好：${personInfo.hobbies.join(', ')}
    `;
}

document.getElementById('showObjectBtn').addEventListener('click', showObject);

document.getElementById('updateCityBtn').addEventListener('click', function () {
    personInfo.city = '上海';
    showObject();
    document.getElementById('objectOutput').innerHTML += '<br>✅ 城市已修改为上海！';
});

// ========== 8. DOM 操作实战 ==========
// 改变文字
document.getElementById('changeTextBtn').addEventListener('click', function () {
    let demoText = document.getElementById('textDemo');
    demoText.innerHTML = '🎉 文字被改变了！这是 JavaScript 做到的！';
});

// 改变颜色
let colorIndex = 0;
const colors = ['#e94560', '#0f3460', '#2ecc71', '#f39c12'];

document.getElementById('changeColorBtn').addEventListener('click', function () {
    let demoText = document.getElementById('textDemo');
    colorIndex = (colorIndex + 1) % colors.length;
    demoText.style.color = colors[colorIndex];
    demoText.style.fontWeight = 'bold';
});

// 显示/隐藏
let isVisible = true;
document.getElementById('toggleBtn').addEventListener('click', function () {
    let demoText = document.getElementById('textDemo');
    if (isVisible) {
        demoText.style.display = 'none';
        this.textContent = '显示文字';
    } else {
        demoText.style.display = 'block';
        this.textContent = '隐藏文字';
    }
    isVisible = !isVisible;
});

// 添加新元素
let elementCount = 0;
document.getElementById('addElementBtn').addEventListener('click', function () {
    elementCount++;
    let container = document.getElementById('dynamicContainer');
    let newElement = document.createElement('div');
    newElement.className = 'output';
    newElement.style.marginTop = '10px';
    newElement.innerHTML = `✨ 这是动态添加的第 ${elementCount} 个元素！`;
    container.appendChild(newElement);
});