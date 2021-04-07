
const comments = document.getElementById("comments")

const inputComment = document.getElementById("inputComment")

const commentButton = document.getElementById("commentButton")

const uri = commentButton.getAttribute("data-uri")



commentButton.addEventListener("click", event => {
    event.preventDefault()
})

commentButton.addEventListener("mouseup", async event => {


    commentButton.blur()

    try {

        if (!inputComment.value.trim()) {
            throw new Error("Comment can't be empty")
        }

        await postComment(inputComment.value)

        inputComment.value = ""

    } catch (error) {
        console.log(error.message) // insert flash
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

    console.log(uri, commentBody)
    const res = await fetch(uri, options)

    console.log(res)
    if (!res.ok) {
        throw new Error("status is not ok")
    }

    const resText = await res.text()

    comments.innerHTML += resText

}