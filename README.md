# Validact

_A simple JS validation tool with custom messages_

## Get started

_Add "app.js" to your project file_
### How to use 📋

To let Validact know that an input field is validable, you must add the class "validable" to that input.
Once the class is set, you will have to add ```data-identifier``` field with an unique name for every field.
If you want to have a validation error message, you will have to add an element with the class ```validation-message```
and link the message with the input adding the same ```data-identifier``` field that the input has.

For example:

```
<label for=""> Name: </label>
<input id="name" type="text" data-identifier="name" class="form-control validable">
<span class="validation-message" data-identifier="name"></span>
```
