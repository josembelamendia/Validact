(function() {

const FORM = document.getElementById('validable-form');
const FORM_INPUTS = Array.from(document.getElementsByClassName('validable'));
const ERROR_BORDER = "1px solid red"
const SUCCESS_BORDER = "1px solid green"
const NO_BORDER = "none"
const RULES = ["min", "max", "uppercase"];

var CUSTOM_INPUTS = [];

class CustomInput {

    constructor(identifier, rules) {
        this.identifier = identifier;
        this.rules = rules;
        this.animation = false;
        this.borderToggled = false;
        this.validationMessage = undefined;
        this.errorMessage = "";
        Array.from(document.getElementsByClassName("validation-message")).forEach(element => {
            if(element.dataset.identifier == identifier) {
                this.validationMessage = element;
            }
        });
    }

    get input() {
        return document.querySelector(`[data-identifier~="${this.identifier}"]`);
    }

    rules() {
        return this.rules;
    }

    animation() {
        return this.animation;
    }

    isBorderToggled() {
        return this.borderToggled;
    }

    setBorderToggled(value) {
        this.borderToggled = value;
    }

    ruleMatch(rule, ruleValue) {
        switch(rule) {
            case "max": {
                return this.input.value.trim().length <= ruleValue;
            }
            case "min": {
                return this.input.value.trim().length >= ruleValue;
            }
        }
    }

    getValidationMessageField() {
        return this.validationMessage;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    isValidated() {
        var validated = true;

        for(var rule in this.rules) {
            if(!this.ruleMatch(rule, this.rules[rule])) {
                validated = false;
                this.errorMessage = getErrorForRule(rule, this.rules[rule]);
            }
        }

        if(validated) {
            if(this.getValidationMessageField() != null) {
                this.getValidationMessageField().style.display = "none";
            }
        } else {
            if(this.getValidationMessageField() != null) {
                this.getValidationMessageField().style.display = "block";
                this.getValidationMessageField().style.color = "red";
                this.getValidationMessageField().innerText = this.getErrorMessage()
            }
        }

        return validated;
    }

}

function getErrorForRule(rule, value) {
    switch (rule) {
        case "min": {
            return `Mínimo de caracteres requerido: ${value}`;
        }
        case "max": {
            return `Máximo de caracteres permitido: ${value}`;
        }
    }
}

function getRules(identifier) {
    let rules = []

    for (let inputIdentifier in VALIDATION_RULES) {
        if(identifier == inputIdentifier) {
            if(VALIDATION_RULES.hasOwnProperty(inputIdentifier)) {
                for(var inputRuleKey in VALIDATION_RULES[inputIdentifier]) {
                    var inputRuleValue = VALIDATION_RULES[inputIdentifier][inputRuleKey];                    
                    if(RULES.includes(inputRuleKey)) {
                        rules[inputRuleKey] = inputRuleValue;                        
                    }
                }
            }
        }
    }

    return rules;
}

function init() {
    FORM_INPUTS.forEach(formInput => {

        var identifier = formInput.dataset.identifier;
        var rules = getRules(identifier);
        var input = new CustomInput(identifier, rules);
        
        CUSTOM_INPUTS.push(input);
    })
}

const VALIDATION_RULES = {
    name: {
        min: 1,
        max: 16
    },
    lastname: {
        min: 1
    },
    password: {
        min: 8,
        max: 16,
    },
    dni: {
        min: 8,
        max: 8
    },
}

init()

FORM.addEventListener('submit', event => {

    CUSTOM_INPUTS.forEach(customInput => {

        if(!customInput.isValidated()) {
            if(!customInput.animation) {
                if(!customInput.isBorderToggled()) {
                    customInput.input.style.border = ERROR_BORDER
                    setTimeout(() => {
                        customInput.input.style.border = NO_BORDER;
                        customInput.animation = false;
                    }, 3000);
                }
            }

            customInput.animation = true;
            event.preventDefault()
        }
    })

})

CUSTOM_INPUTS.forEach(customInput => {
    customInput.input.addEventListener("keyup", event => {
        customInput.setBorderToggled(true)

        if(!customInput.isValidated()) {
            customInput.input.style.border = ERROR_BORDER
            return;
        }
        customInput.input.style.border = SUCCESS_BORDER
    })

    customInput.input.addEventListener("click", event => {
        customInput.setBorderToggled(true)

        if(!customInput.isValidated()) {
            customInput.input.style.border = ERROR_BORDER
            return;
        }
        customInput.input.style.border = SUCCESS_BORDER
    })
})


})();