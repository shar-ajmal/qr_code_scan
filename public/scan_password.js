document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore()
    const urlString = window.location.href;
    const alreadyScanned = document.getElementById('scanned-message')
    const submitButton = document.getElementById('submit-button')
    const successMessage = document.getElementById('scan-success')
    const passwordForm = document.getElementById('password-form')

    console.log(urlString);
    let paramString = urlString.split('?')[1];
    console.log(paramString)
    const urlParams = new URLSearchParams(paramString);
    console.log(urlParams)
    const qrCodeId = urlParams.get('id')
    console.log(qrCodeId)

    submitButton.addEventListener('click', e => {
        let passwordField = document.getElementById('password').value
        db.collection('qr_codes').doc(qrCodeId).get().then(doc => { 
            let data = doc.data()
            console.log(passwordField)
            console.log(data['password'])
            if (passwordField == data['password']) {
                db.collection("qr_codes").doc(qrCodeId).update({'scanned': true});
                successMessage.style.display = 'block'
                passwordForm.style.display = 'none'
                
            }
            else (
                alert("Wrong password, please try again")
            )
        })

    })

    db.collection('qr_codes').doc(qrCodeId).get().then(doc => {
        let data = doc.data()
        console.log(data)
        if (data['scanned']) {
            alreadyScanned.style.display = 'block'
        }
        else {
            passwordForm.style.display = 'block'
        }
    })




})