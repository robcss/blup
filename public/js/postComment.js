
const comments = document.getElementById("comments")

const inputComment = document.getElementById("inputComment")

const commentButton = document.getElementById("commentButton")

const uri = commentButton.getAttribute("href")



commentButton.addEventListener("click", event => {
    event.preventDefault()
})

commentButton.addEventListener("mouseup", async event => {

    commentButton.blur()

    try {

        await postComment(inputComment.value)

        inputComment.value = ""

    } catch (error) {
        console.log(error.message)
    }

})

const postComment = async (commentBody) => {

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: commentBody
    }

    const res = await fetch(uri, options)


    if (!res.ok) {
        throw new Error("status is not ok")
    }

    const resText = await res.text()

    comments.innerHTML += resText

}