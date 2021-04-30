# Validact

_A simple JS validation tool with custom messages_

## Get started 🔗

Add script "app.js" into your project file

### How to use 📋

The first step is to set the field ```ID``` for our form.
The ```ID``` field must be set to ```validable-form```

To let Validact know that an input field is validable, you must add the class "validable" to that input.
Once the class is set, you will have to add ```data-identifier``` field with an unique name for every field.
If you want to have a validation error message, you will have to add an element with the class ```validation-message```
and link the message with the input adding the same ```data-identifier``` field that the input has.

### Specifying rules for inputs 🔮

In the ```config.json``` file you will find an example for the rules.
Available rules: ```min```, ```max```, ```uppercase```. 
Min/Max characters that a word need to have, and uppercase true/false if the word
need at leaste 1 uppercase letter.

For example:

```
<label for=""> Name: </label>
<input id="name" type="text" data-identifier="name" class="form-control validable">
<span class="validation-message" data-identifier="name"></span>
```

In config.json:

```
{ 
    "name": {
        //Minimum of characters
        "min": 1,
        //Maximum
        "max": 16,
        //At least one uppercase?
        "uppercase": true
    },
}
```
![image](https://user-images.githubusercontent.com/41305322/116756454-812f5d00-a9e2-11eb-9ebd-8fcfe4039358.png)


