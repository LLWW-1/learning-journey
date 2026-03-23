// ====================================
// Day 8 - JavaScript 高级操作
// ====================================

// ========== 1. 数组高级方法 ==========
const numbers = [1, 2, 3, 4, 5];

// forEach - 遍历数组
document.getElementById('forEachBtn').addEventListener('click', function () {
    let result = 'forEach 遍历结果：<br>';
    numbers.forEach((num, index) => {
        result += `索引 ${index}: ${num}<br>`;
    });
    document.getElementById('arrayOutput').innerHTML = result;
});

// map - 转换数组（每个元素乘以2）
document.getElementById('mapBtn').addEventListener('click', function () {
    const doubled = numbers.map(num => num * 2);
    document.getElementById('arrayOutput').innerHTML = `
        map 转换 (乘以2)：<br>
        原数组: [${numbers}]<br>
        新数组: [${doubled}]
    `;
});

// filter - 筛选数组（筛选偶数）
document.getElementById('filterBtn').addEventListener('click', function () {
    const evens = numbers.filter(num => num % 2 === 0);
    document.getElementById('arrayOutput').innerHTML = `
        filter 筛选偶数：<br>
        原数组: [${numbers}]<br>
        偶数: [${evens}]
    `;
});

// reduce - 累加求和
document.getElementById('reduceBtn').addEventListener('click', function () {
    const sum = numbers.reduce((total, num) => total + num, 0);
    document.getElementById('arrayOutput').innerHTML = `
        reduce 求和：<br>
        原数组: [${numbers}]<br>
        总和: ${sum}
    `;
});

// ========== 2. 字符串方法 ==========
const originalStr = " Hello, JavaScript! ";

document.getElementById('trimBtn').addEventListener('click', function () {
    document.getElementById('stringOutput').innerHTML = `
        原始字符串: "${originalStr}"<br>
        长度: ${originalStr.length}<br>
        trim 去空格后: "${originalStr.trim()}"<br>
        长度: ${originalStr.trim().length}
    `;
});

document.getElementById('upperBtn').addEventListener('click', function () {
    document.getElementById('stringOutput').innerHTML = `
        原始: "${originalStr}"<br>
        大写: "${originalStr.toUpperCase()}"
    `;
});

document.getElementById('lowerBtn').addEventListener('click', function () {
    document.getElementById('stringOutput').innerHTML = `
        原始: "${originalStr}"<br>
        小写: "${originalStr.toLowerCase()}"
    `;
});

document.getElementById('includesBtn').addEventListener('click', function () {
    const hasJava = originalStr.includes('Java');
    const hasPython = originalStr.includes('Python');
    document.getElementById('stringOutput').innerHTML = `
        检查字符串是否包含 "Java": ${hasJava}<br>
        检查字符串是否包含 "Python": ${hasPython}
    `;
});

document.getElementById('splitBtn').addEventListener('click', function () {
    const trimmed = originalStr.trim();
    const words = trimmed.split(' ');
    document.getElementById('stringOutput').innerHTML = `
        按空格分割：<br>
        原始: "${trimmed}"<br>
        结果: ${JSON.stringify(words)}
    `;
});

// ========== 3. 数字与随机数 ==========
document.getElementById('randomBtn').addEventListener('click', function () {
    // 生成 1-100 的随机整数
    const random = Math.floor(Math.random() * 100) + 1;
    document.getElementById('numberOutput').innerHTML = `
        随机数 (1-100): ${random}
    `;
});

document.getElementById('roundBtn').addEventListener('click', function () {
    const num = 3.14159;
    document.getElementById('numberOutput').innerHTML = `
        原始数字: ${num}<br>
        Math.round 四舍五入: ${Math.round(num)}<br>
        Math.floor 向下取整: ${Math.floor(num)}<br>
        Math.ceil 向上取整: ${Math.ceil(num)}
    `;
});

document.getElementById('fixBtn').addEventListener('click', function () {
    const num = 3.1415926535;
    document.getElementById('numberOutput').innerHTML = `
        原始数字: ${num}<br>
        保留2位小数: ${num.toFixed(2)}<br>
        保留3位小数: ${num.toFixed(3)}<br>
        保留4位小数: ${num.toFixed(4)}
    `;
});

// ========== 4. 倒计时器 ==========
let timerInterval = null;
let currentTime = 0;

document.getElementById('startTimerBtn').addEventListener('click', function () {
    // 停止之前的计时器
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // 获取秒数
    let seconds = parseInt(document.getElementById('timerSeconds').value);
    if (isNaN(seconds) || seconds <= 0) {
        seconds = 10;
    }
    currentTime = seconds;

    // 立即显示
    document.getElementById('timerOutput').innerHTML = `${currentTime} 秒`;

    // 开始倒计时
    timerInterval = setInterval(function () {
        currentTime--;

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('timerOutput').innerHTML = '⏰ 时间到！';
        } else {
            document.getElementById('timerOutput').innerHTML = `${currentTime} 秒`;
        }
    }, 1000);
});

document.getElementById('stopTimerBtn').addEventListener('click', function () {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('timerOutput').innerHTML = '⏸️ 已停止';
    }
});

// ========== 5. 计算器 ==========
document.getElementById('calcBtn').addEventListener('click', function () {
    const num1 = parseFloat(document.getElementById('calcNum1').value);
    const num2 = parseFloat(document.getElementById('calcNum2').value);
    const operator = document.getElementById('calcOp').value;

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('calcOutput').innerHTML = '❌ 请输入有效的数字！';
        return;
    }

    let result;
    let symbol;

    switch (operator) {
        case '+':
            result = num1 + num2;
            symbol = '+';
            break;
        case '-':
            result = num1 - num2;
            symbol = '-';
            break;
        case '*':
            result = num1 * num2;
            symbol = '×';
            break;
        case '/':
            if (num2 === 0) {
                document.getElementById('calcOutput').innerHTML = '❌ 除数不能为0！';
                return;
            }
            result = num1 / num2;
            symbol = '÷';
            break;
        default:
            result = 0;
    }

    document.getElementById('calcOutput').innerHTML = `
        ${num1} ${symbol} ${num2} = ${result.toFixed(2)}
    `;
});

// ========== 6. 待办事项应用 ==========
let todos = [];

function renderTodos() {
    const todoListDiv = document.getElementById('todoList');

    if (todos.length === 0) {
        todoListDiv.innerHTML = '<p style="text-align: center; color: #999;">暂无待办事项，添加一个吧！</p>';
        return;
    }

    let html = '';
    todos.forEach((todo, index) => {
        html += `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <span style="flex: 1; cursor: pointer;" onclick="toggleTodo(${index})">
                    ${todo.completed ? '✅' : '◻️'} ${todo.text}
                </span>
                <button class="delete-btn" onclick="deleteTodo(${index})">删除</button>
            </div>
        `;
    });

    todoListDiv.innerHTML = html;
}

// 全局函数（需要在 window 对象上）
window.toggleTodo = function (index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
};

window.deleteTodo = function (index) {
    todos.splice(index, 1);
    renderTodos();
};

document.getElementById('addTodoBtn').addEventListener('click', function () {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
        alert('请输入待办事项！');
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = '';
    renderTodos();
});

// 按回车键添加
document.getElementById('todoInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('addTodoBtn').click();
    }
});

// 初始化待办事项
todos = [
    { text: '学习 JavaScript 高级方法', completed: true },
    { text: '完成倒计时器练习', completed: false },
    { text: '做一个待办事项应用', completed: false }
];
renderTodos();

// ========== 额外演示：setTimeout ==========
console.log('setTimeout 演示：2秒后输出');
setTimeout(() => {
    console.log('⏰ 2秒后执行的代码！');
}, 2000);