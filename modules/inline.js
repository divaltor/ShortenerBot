module.exports = (url) => {
    return [{
        "type": "article",
        "id": 5,
        "title": `Короткая ссылка: ${url}`,
        "description": 'Короткая ссылка',
        "input_message_content": {
            "message_text": `Короткая ссылка: ${url}`,
            "parse_mode": 'Markdown',
            "disable_web_page_preview": true
        }
    }]
};