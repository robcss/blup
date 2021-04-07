export const validateComment = (inputComment) => {

    if (!inputComment.value.trim()) {
        throw new Error("Comment can't be empty")
    }

}


export const postComment = async (inputComment, comments) => {


    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: inputComment.value
    }

    const uri = inputComment.getAttribute("data-uri")

    const res = await fetch(uri, options)


    if (!res.ok) {
        throw new Error("status is not ok")
    }

    const resText = await res.text()

    comments.innerHTML += resText

    inputComment.value = ""
}