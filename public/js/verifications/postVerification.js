export const postVerification = async (uri, verifications) => {

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: "posting verification"
    }

    const res = await fetch(uri, options)

    if (!res.ok) {
        throw new Error(res.status)
    }

    const resText = await res.text()

    verifications.innerHTML += resText
}