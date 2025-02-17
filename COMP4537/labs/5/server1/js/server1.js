import clientMessages from '../lang/messages/en/user.js'; 

export class DatabaseInterface {
    constructor() {
        this.SERVER_URL = 'https://shark-app-wkh5r.ondigitalocean.app';
        this.initializeUI();
        this.initializeEventListeners();
    }

    initializeUI() {
        document.querySelector('h1').textContent = clientMessages.TITLE_APP;
        document.querySelector('h2:first-of-type').textContent = clientMessages.TITLE_INSERT;
        document.querySelector('h2:last-of-type').textContent = clientMessages.TITLE_QUERY;
        document.getElementById('insertButton').textContent = clientMessages.BUTTON_INSERT;
        document.getElementById('submitQuery').textContent = clientMessages.BUTTON_SUBMIT;
        document.getElementById('queryInput').placeholder = clientMessages.PLACEHOLDER_QUERY;
    }

    initializeEventListeners() {
        document.getElementById('insertButton').addEventListener('click', () => this.insertSampleData());
        document.getElementById('submitQuery').addEventListener('click', () => this.submitQuery());
    }

    async insertSampleData() {
        const responseElement = document.getElementById('insertResponse');
        responseElement.textContent = clientMessages.LOADING_INSERT;

        try {
            const response = await fetch(`${this.SERVER_URL}/insert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            responseElement.textContent = data.message || clientMessages.SUCCESS_INSERT;
        } catch (error) {
            responseElement.textContent = `${clientMessages.ERROR_NETWORK} ${error.message}`;
        }
    }

    async submitQuery() {
        const query = document.getElementById('queryInput').value.trim();
        const responseElement = document.getElementById('queryResponse');

        if (!query) {
            responseElement.textContent = clientMessages.ERROR_EMPTY_QUERY;
            return;
        }

        const upperQuery = query.toUpperCase();
        const isSelect = upperQuery.startsWith('SELECT');
        const isInsert = upperQuery.startsWith('INSERT');

        if (!isSelect && !isInsert) {
            responseElement.textContent = clientMessages.ERROR_INVALID_QUERY;
            return;
        }

        responseElement.textContent = clientMessages.LOADING_QUERY;

        try {
            const method = isSelect ? 'GET' : 'POST';
            const url = `${this.SERVER_URL}/query${isSelect ? '?' + new URLSearchParams({query}) : ''}`;
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: isSelect ? null : JSON.stringify({ query })
            });

            const data = await response.json();
            responseElement.textContent = 
                data.error ? 
                `${clientMessages.ERROR_SERVER} ${data.error}` : 
                JSON.stringify(data.results || data, null, 2);
        } catch (error) {
            responseElement.textContent = `${clientMessages.ERROR_NETWORK} ${error.message}`;
        }
    }
}

const instance = new DatabaseInterface();
export default instance;