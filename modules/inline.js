module.exports = ({ i18n }, url) => {
    return [{
        "type": "article",
        "id": 5,
        "title": `${i18n.t('short')}: ${url}`,
        "description": `${i18n.t('short')}`,
        "input_message_content": {
            "message_text": `${i18n.t('short')}: ${url}`,
            "parse_mode": 'Markdown',
            "disable_web_page_preview": true
        }
    }]
};