document.getElementById("sendButton").onclick = function() {
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    const chatContent = document.getElementById("chatContent");
    chatContent.innerHTML += `<p class="user"><strong>You:</strong> ${userInput}</p>`;

    // Send question to Flask backend
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.answer || 'Sorry, I could not find an answer.';
        chatContent.innerHTML += `<p class="bot"><strong>Bot:</strong> ${botResponse}</p>`;
        document.getElementById("userInput").value = '';
        chatContent.scrollTop = chatContent.scrollHeight; // Scroll to the bottom
    })
    .catch(error => {
        console.error('Error:', error);
        chatContent.innerHTML += `<p class="bot"><strong>Bot:</strong> Error connecting to the API.</p>`;
    });
};
