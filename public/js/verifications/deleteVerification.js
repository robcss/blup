export const deleteVerification = async (uri) => {

    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: "deleting verification"
    }

    const res = await fetch(uri, options)

    if (!res.ok) {
        throw new Error(res.status)
    }

    const resText = await res.text()

    const verificationId = resText.slice(1, -1)

    const verification = document.getElementById(`verification_${verificationId}`)

    verification.remove()
}