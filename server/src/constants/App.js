module.exports = {
    COMMAND_EXECUTE_CODE_BY_LANGUAGE: {
        "php": "docker exec php-container php -r ",
        "js": "docker exec node-container node -e ",
        "javascript": "docker exec node-container node -e ",
        "python": "docker exec python-container python -c "
    }
}