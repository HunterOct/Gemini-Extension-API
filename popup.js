
const API_KEY = "API_KEY";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

document.getElementById("submit").addEventListener("click", async () => {
    const question = document.getElementById("question").value;
    const answerBox = document.getElementById("answer");

    if (!question) {
        answerBox.value = "Vui lòng nhập câu hỏi!";
        return;
    }
    answerBox.value = "Đang tải câu trả lời...";

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{
                        text: question
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            answerBox.value = data.candidates[0].content.parts[0].text;
        } else {
            answerBox.value = "Không nhận được phản hồi từ Gemini!";
        }

    } catch (error) {
        console.error("Error:", error);
        answerBox.value = "Lỗi kết nối: " + error.message;
    }
});