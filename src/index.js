import './style.css';
import apiCalls from './apiCalls';

export default function index() {
    const content = document.createElement('div');
    content.classList = 'content';
    content.innerHTML = `
        <div class="content">
            <div class="inputContainer">
                <input type="text" class="weatherInput" placeholder="location">
                <button class="weatherSubmit">Check Weather</button>
            </div>
            <div class="weatherContent">
            </div>
        </div>
        
    `

    window.onload = () => {
        const submit = document.querySelector('.weatherSubmit');
        submit.onclick = () => {
            apiCalls();
        }
    }

    return content;
}

document.body.appendChild(index())