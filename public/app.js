document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore()
    const qrCodeImg = document.getElementById('qr-code-img')
    const generateButton = document.getElementById('generate-button')
    
    
    generateButton.addEventListener('click', e => {
        console.log("clicked event")
        db.collection('qr_codes').add({
            'password': 'food',
            'scanned': false,
        }) .then(res => {
            console.log('Added document with ID: ', res.id);
            generateQRCode(res.id)
        })
    })
    
    generateQRCode = (id) => {
        const urlString = 'https://api.qrserver.com/v1/create-qr-code/?data=https://qr-code-scan-c68cc.web.app/scan_password.html?id=' + id +'&size=100x100'
        console.log(urlString)
        fetch(urlString)
        .then(response => {
            console.log(response)
            console.log(response.url)
            console.log(qrCodeImg)
            qrCodeImg.setAttribute('src',response.url)
        })
    }
})
