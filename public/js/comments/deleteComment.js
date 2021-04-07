
export const idPrefixMatches = (element, idPrefix) => {

    return element.id.startsWith(idPrefix)

}


export const deleteComment = async (deleteCommentButton) => {

    const uri = deleteCommentButton.getAttribute("data-uri")

    const res = await fetch(uri, { method: "DELETE" })

    if (!res.ok) {
        throw new Error("status is not ok")
    }

    const commentId = deleteCommentButton.id.split("_")[1]

    const comment = document.getElementById(`comment_${commentId}`)

    comment.remove()
}