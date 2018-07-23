# period-picker

A period picker build on the top of Bootstrap 4 and Moment.js that allow to select month, quarter, semester or full year .

## Requirements.

**periodPicker** requires [jQuery](https://jquery.com/), [Bootstrap 4](https://getbootstrap.com) and [Moment.js](https://momentjs.com).

## Basic usage.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
        <title>periodPicker</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="dist/period-picker.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <button type="button" class="btn btn-primary" id="period-picker">periodPicker</button>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="dist/period-picker.js" type="text/javascript"></script>
        <script type="text/javascript">
            (function ($) {
                $('document').ready(function () {
                    $('#period-picker').periodPicker({
                        pick: function (value) {
                            window.location.href = 'my/url?start=' + value.start.format('YYY-MM-DD HH:mm:ss') + '&end=' + value.end.format('YYY-MM-DD HH:mm:ss');
                        }
                    });
                });
            }(jQuery));
        </script>
    </body>
</html>
```

## Advanced usage.

### Markup.

You can define following options using `data-xxx` attribute :

+ **year** : default year (YYYY format)
+ **min** : first selectable month (YYYY/MM format).
+ **max** : last selectable month (YYYY/MM format).

Example :

```html
<button type="button" id="period-picker" data-year="2016" data-min="2015/05" data-max="2017/08">periodPicker</button>
<script type="text/javascript">
    $('#period-picker').periodPicker();
</script>
```

### Custom options.

Any of default options (see full list below) can be override when initilizing periodPicker.

Example :

```html
<button type="button" id="period-picker">periodPicker</button>
<script type="text/javascript">
    $('#period-picker').periodPicker({
        btnClass: 'btn btn-success',
        yearName: 'Année complète',
        quarterName: 'T',
        prevTemplate: '<i class="fa fa-arrow-left"></i>',
        nextTemplate: '<i class="fa fa-arrow-right"></i>'
    });
</script>
```

### Global configuration.

You can override globally any default options (see full list below).  
This must be done before periodPicker initilization.

Example :

```js
$.fn.periodPickerDefaults.pick = function (value) {
    // ...
};
```

## Default options.

```js
$.fn.periodPickerDefaults = {
    // Min month : YYYY/MM format.
    min: false,
    // Max month : YYYY/MM format.
    max: false,
    // Default year : YYYY format.
    year: false,
    // Action when a picker button is clicked.
    // Return true to keep the popover opened, otherwise it will be closed.
    pick: function (value, $picker, $popover) {
        console.log(value);
    },
    // Options to pass to Bootstrap 4 popover.
    // Following options WILL be ignored : title, content, html
    popover: {
        placement: 'bottom',
    },
    // Year button title.
    yearName: 'Whole year',
    // Strint to populate semester buttons.
    semesterName: 'S',
    // Strint to populate quarter buttons.
    quarterName: 'Q',
    // Buttons class.
    btnClass: 'btn btn-primary',
    // Previous year button content.
    prevTemplate: '&lt;&lt;',
    // Next year button content.
    nextTemplate: '&gt;&gt;',
    // Popover title template
    titleTemplate: '<div class="period-picker-title">\
        <a href="#" class="period-picker-prev">%P</a>\
        <div class="year"></div>\
        <a href="#" class="period-picker-next">%N</a>\
    </div>',
    // Popover body template.
    bodyTemplate: '<div class="period-picker-body">\
        <div class="year">\
            <div>\
                <button class="%C">%Y</button>\
            </div>\
        </div>\
        <div class="semester">\
            <div>\
                <button class="%C" data-period="1">%S1</button>\
            </div>\
            <div>\
                <button class="%C" data-period="2">%S2</button>\
            </div>\
        </div>\
        <div class="quarter">\
            <div>\
                <button class="%C" data-period="1">%Q1</button>\
            </div>\
            <div>\
                <button class="%C" data-period="2">%Q2</button>\
            </div>\
            <div>\
                <button class="%C" data-period="3">%Q3</button>\
            </div>\
            <div>\
                <button class="%C" data-period="4">%Q4</button>\
            </div>\
        </div>\
        <div class="month">\
            <div>\
                <button class="%C" data-period="1">01</button>\
            </div>\
            <div>\
                <button class="%C" data-period="2">02</button>\
            </div>\
            <div>\
                <button class="%C" data-period="3">03</button>\
            </div>\
            <div>\
                <button class="%C" data-period="4">04</button>\
            </div>\
            <div>\
                <button class="%C" data-period="5">05</button>\
            </div>\
            <div>\
                <button class="%C" data-period="6">06</button>\
            </div>\
            <div>\
                <button class="%C" data-period="7">07</button>\
            </div>\
            <div>\
                <button class="%C" data-period="8">08</button>\
            </div>\
            <div>\
                <button class="%C" data-period="9">09</button>\
            </div>\
            <div>\
                <button class="%C" data-period="10">10</button>\
            </div>\
            <div>\
                <button class="%C" data-period="11">11</button>\
            </div>\
            <div>\
                <button class="%C" data-period="12">12</button>\
            </div>\
        </div>\
    </div>'
};
```