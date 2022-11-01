const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let inputLines = new Array();

readline.on("line", (line) => { //считывание входных данных в массив
    inputLines.push(line); 
});

readline.on('close', function() {
    let firstLineArr = inputLines[0].split(" "),
    	firstStackSize = firstLineArr[0], // n - размер первой стопки
    	secondStackSize = firstLineArr[1], // m - размер второй стопки
    	maxSalarySum = firstLineArr[2], // s - максимальная сумма зарплат
		firstStack = new Array(),
        secondStack = new Array();

    for (let i = 1; i <= Math.max(firstStackSize, secondStackSize); i++) { //разбиение входных строк на массивы (стопки)
        curLineArr = inputLines[i].split(" ");
        firstStack.push(Number(curLineArr[0]));
        secondStack.push(Number(curLineArr[1]));
    }

    let firstCase = cvSumCalculating(firstStack, secondStack);
    let secondCase = cvSumCalculating(secondStack, firstStack);

    console.log(Math.max(firstCase, secondCase)); //вывод результата в консоль

    function cvSumCalculating(stack1, stack2) {
        let cvSum = 0, // промежуточное количество взятых резюме
            salarySum = 0, //сумма зарплат
            fi = 0, //определяет взятые резюме из первой стопки
            si = 0; //определяет взятые резюме из второй стопки

        if ((salarySum + stack1[fi]) <= maxSalarySum) {
            salarySum += stack1[fi];
            cvSum++;
            fi++;
        }

        while (fi < firstStackSize || si < secondStackSize) {

            if (stack1[fi] <= stack2[si] && salarySum + stack1[fi] <= maxSalarySum) {
                salarySum += stack1[fi];
                cvSum++;
                fi++;
            } else {
                if (salarySum + stack2[si] <= maxSalarySum) {
                    salarySum += stack2[si];
                    cvSum++;
                    si++;
                } else {
                    break;
                }
            }
        }
        return cvSum;
    }
});
