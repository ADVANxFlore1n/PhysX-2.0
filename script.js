// Здесь вы можете ввести свой ключ API OpenAI
const apiKey = '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'; // Вставьте ваш ключ API в кавычки

async function sendQuery() {
    const userInput = document.getElementById('userInput').value;
    const consoleOutput = document.getElementById('consoleOutput');

    if (userInput.trim() === "") {
        alert("Пожалуйста, введите текст запроса.");
        return;
    }

    // Отображаем запрос в консоли
    consoleOutput.innerHTML += `<br><b>Вы:</b> ${userInput}`;

    // Отправка запроса к API OpenAI
    try {
        const response = await getAIResponse(apiKey, userInput);
        consoleOutput.innerHTML += `<br><b>Нейросеть:</b> ${response}`;
    } catch (error) {
        console.error("Ошибка при запросе к API:", error);
        consoleOutput.innerHTML += `<br><b>Ошибка:</b> Не удалось получить ответ. Причина: ${error.message || error}`;
    }

    // Прокручиваем консоль вниз
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    document.getElementById('userInput').value = "";
}

async function getAIResponse(apiKey, query) {
    const url = 'https://api.openai.com/v1/completions';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                prompt: query,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Ошибка API: ${errorData.error.message}`);
        }

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        throw new Error(`Ошибка при запросе к нейросети: ${error.message}`);
    }
}
