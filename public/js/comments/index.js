import { postComment, validateComment } from "./postComment.js"
import { deleteComment } from "./deleteComment.js"
import { elemIdPrefixMatches } from "../utils.js"

const comments = document.getElementById("comments")

const inputComment = document.getElementById("inputComment")

const postCommentButton = document.getElementById("postCommentButton")


//post comment events
postCommentButton.addEventListener("click", event => {
    event.preventDefault()
})

postCommentButton.addEventListener("mouseup", async event => {


    postCommentButton.blur()

    try {

        validateComment(inputComment)

        await postComment(inputComment, comments)


    } catch (e) {
        if (e.message === "401") {

            location.reload()
        }

        console.log(e.message)

    }

})

//delete comment events
comments.addEventListener("click", async event => {

    const isDeleteButton = elemIdPrefixMatches(event.target, "deleteCommentButton_")

    if (isDeleteButton) {

        const deleteCommentButton = event.target

        try {
            await deleteComment(deleteCommentButton)
        } catch (e) {

            if (e.message === "401") {

                location.reload()
            }

            console.log(e.message)
        }
    }

})