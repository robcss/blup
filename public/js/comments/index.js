import { postComment, validateComment } from "./postComment.js"
import { deleteComment, idPrefixMatches } from "./deleteComment.js"

const comments = document.getElementById("comments")

const inputComment = document.getElementById("inputComment")

const postCommentButton = document.getElementById("postCommentButton")

const postCommentUri = postCommentButton.getAttribute("data-uri")


//post comment events
postCommentButton.addEventListener("click", event => {
    event.preventDefault()
})

postCommentButton.addEventListener("mouseup", async event => {


    postCommentButton.blur()

    try {

        validateComment(inputComment)

        await postComment(inputComment, postCommentUri, comments)


    } catch (error) {
        console.log(error.message) // insert flash
    }

})

//delete comment events
comments.addEventListener("click", async event => {

    const isDeleteButton = idPrefixMatches(event.target, "deleteCommentButton_")

    if (isDeleteButton) {

        const deleteCommentButton = event.target

        try {
            await deleteComment(deleteCommentButton)
        } catch (error) {
            console.log(error.message) // insert flash
        }
    }

})