import changer from './changer'

document.getElementById('activate').addEventListener('click', function() {
	changer(document)
	this.disabled = true
})

const demoLoginButtons = document.getElementsByClassName('demo-login-button')
for (const button of demoLoginButtons) {
	button.addEventListener('click', () => alert('Log in button activated.'))
}
