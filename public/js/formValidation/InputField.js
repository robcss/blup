export class InputField {
    constructor(id) {
        this.id = id;
        this.inputElement = document.getElementById(id)
        this.iconElement = document.getElementById(`${id}Icon`)
        this.helpElement = document.getElementById(`${id}Help`)
        this.validated = false
        this.styles = {
            visibility: "is-hidden",
            success: {
                input: "is-success",
                icon: "fa-check"
            },
            danger: {
                input: "is-danger",
                icon: "fa-exclamation-triangle"
            }
        }
    }

    _showIcon() {
        this.iconElement.classList.remove(this.styles.visibility)
    }

    _removeStyle(style) {
        this.inputElement.classList.remove(style.input)

        this.iconElement.classList.remove(style.icon)

        this.helpElement.classList.add(this.styles.visibility)
        this.helpElement.classList.remove(style.input)
        this.helpElement.textContent = ""

    }

    _addStyle(style, helpText = null) {
        this.inputElement.classList.add(style.input)

        this.iconElement.classList.add(style.icon)

        if (helpText) {
            this.helpElement.classList.remove(this.styles.visibility)
            this.helpElement.classList.add(style.input)
            this.helpElement.textContent = helpText
        }
    }


    setSuccess(helpText = null) {
        this._showIcon()
        this._removeStyle(this.styles.danger)
        this._addStyle(this.styles.success, helpText)
    }

    setDanger(helpText = null) {
        this._showIcon()
        this._removeStyle(this.styles.success)
        this._addStyle(this.styles.danger, helpText)
    }

    get isNotEmpty() {
        const value = this.inputElement.value.trim()

        return value !== null && value !== ""
    }

    validateEmpty() { // use this instead of validate() if isNotEmpty is the only validation needed
        if (this.isNotEmpty) {
            this.setSuccess()
            this.validated = true
        } else {
            this.setDanger("Field is required")
            this.validated = false
        }
    }

    validate() {
        this.validated = true //generic method to be replaced for each field
    }

    get isValid() {
        return this.validated
    }
}

