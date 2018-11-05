(function ($) {
    // periodPicker defaults setting.
    $.fn.periodPickerDefaults = {
        // Min month : YYYY/MM format.
        min: false,
        // Max month : YYYY/MM format.
        max: false,
        // Default year : YYYY format.
        year: false,
        // Current active element. Must match : /^(\d{4})(\/(0[1-9]|1[0-2]|Q[1-4]|S[1-2]))?$/
        // Examples : 2018 , 2014/S1 , 1981/Q3 , 1512/02
        active: false,
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
        // Active button class.
        activeClass: 'btn btn-success',
        // Previous year button content.
        prevTemplate: '&lt;&lt;',
        // Next year button content.
        nextTemplate: '&gt;&gt;',
        // Popover title template
        titleTemplate: '<div class="inner">\
            <a href="#" class="period-picker-prev">%P</a>\
            <div class="year"></div>\
            <a href="#" class="period-picker-next">%N</a>\
        </div>',
        // Popover body template.
        bodyTemplate: '<div class="inner">\
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

    var activeRegex = /^(\d{4})(\/(0[1-9]|1[0-2]|Q[1-4]|S[1-2]))?$/;

    // Merge and validate setting.
    var getSettings = function (options) {
        var settings = $.extend({}, $.fn.periodPickerDefaults, options);

        if (settings.year) {
            if (!moment(settings.year, 'YYYY', true).isValid()) {
                console.error('[Period picker] Invalid value for year option : ' + settings.year);
                return false;
            }
            settings.year = moment(settings.year, 'YYYY').startOf('year');
        } else {
            settings.year = moment().startOf('year');
        }

        if (settings.min) {
            if (!moment(settings.min, 'YYYY/MM', true).isValid()) {
                console.error('[Period picker] Invalid value for min option : ' + settings.min);
                return false;
            }
            settings.min = moment(settings.min, 'YYYY/MM').startOf('month');
        }

        if (settings.max) {
            if (!moment(settings.max, 'YYYY/MM', true).isValid()) {
                console.error('[Period picker] Invalid value for max option : ' + settings.max);
                return false;
            }
            settings.max = moment(settings.max, 'YYYY/MM').endOf('month');
        }

        if (settings.active) {
            if (!activeRegex.test(settings.active)) {
                console.error('[Period picker] Invalid value for active option : ' + settings.active);
                return false;
            }
        }

        return settings;
    };

    // Validate markup options.
    var getPicker = function ($picker, settings) {
        $picker.settings = settings;

        if ($picker.data('year')) {
            if (!moment($picker.data('year'), 'YYYY', true).isValid()) {
                console.error('[Period picker] Invalid value for data-year option : ' + $picker.data('year'));
                return false;
            }
            $picker.data('year', moment($picker.data('year'), 'YYYY').startOf('year'));
        } else {
            $picker.data('year', settings.year.clone());
        }

        if ($picker.data('min')) {
            if (!moment($picker.data('min'), 'YYYY/MM', true).isValid()) {
                console.error('[Period picker] Invalid value for data-min option : ' + $picker.data('min'));
                return false;
            }
            $picker.data('min', moment($picker.data('min'), 'YYYY/MM').startOf('month'));
        } else {
            $picker.data('min', settings.min ? settings.min.clone() : false);
        }

        if ($picker.data('max')) {
            if (!moment($picker.data('max'), 'YYYY/MM', true).isValid()) {
                console.error('[Period picker] Invalid value for data-max option : ' + $picker.data('max'));
                return false;
            }
            $picker.data('max', moment($picker.data('max'), 'YYYY/MM').endOf('month'));
        } else {
            $picker.data('max', settings.max ? settings.max.clone() : false);
        }

        if ($picker.data('active')) {
            if (!activeRegex.test($picker.data('active'))) {
                console.error('[Period picker] Invalid value for active option : ' + $picker.data('active'));
                return false;
            }
        } else {
            $picker.data('active', settings.active);
        }

        return $picker;
    };

    // Register year switch events.
    var switchYear = function (e) {
        e.preventDefault();

        if ($(this).prop('disabled')) {
            return;
        }

        var $popover = $(this).parents('.period-picker-popover');
        var $picker = $popover.data('picker');

        $(this).is('.period-picker-prev') ? $picker.data('current').subtract(1, 'y') : $picker.data('current').add(1, 'y');

        refresh($picker, $popover);
    };

    // Manage picker content.
    var refresh = function ($picker, $popover) {
        var current = $picker.data('current');
        var year = current.format('YYYY');

        $('.popover-header .year', $popover).text(current.format('YYYY'));

        $('.popover-body > .inner .year button', $popover).data('value', {
            type: 'year',
            year: year,
            start: current.clone(),
            end: current.clone().endOf('year')
        }).data('slug', year);

        $('.popover-body > .inner .semester button', $popover).each(function () {
            var period = parseInt($(this).data('period'));
            $(this).data('value', {
                type: 'semester',
                semester: period,
                year: year,
                start: current.clone().quarter(period === 1 ? 1 : 3).startOf('quarter'),
                end: current.clone().quarter(period === 1 ? 2 : 4).endOf('quarter')
            }).data('slug', year + '/S' + period);
        });

        $('.popover-body > .inner .quarter button', $popover).each(function () {
            var period = parseInt($(this).data('period'));
            $(this).data('value', {
                type: 'quarter',
                quarter: period,
                year: year,
                start: current.clone().quarter(period).startOf('quarter'),
                end: current.clone().quarter(period).endOf('quarter')
            }).data('slug', year + '/Q' + period);
        });

        $('.popover-body > .inner .month button', $popover).each(function () {
            var period = parseInt($(this).data('period'));
            $(this).data('value', {
                type: 'month',
                month: period,
                year: year,
                start: current.clone().month(period - 1).startOf('month'),
                end: current.clone().month(period - 1).endOf('month')
            }).data('slug', year + '/' + ('0' + period).substr(-2));
        });

        var min = $picker.data('min');
        var max = $picker.data('max');

        $('.popover-body > .inner button', $popover).each(function () {
            var value = $(this).data('value');
            $(this).prop('disabled', (min && value.start.isBefore(min)) || (max && value.end.isAfter(max)))

            var active = ($(this).data('slug') === $picker.data('active'));
            $(this).attr('class', active ? $picker.settings.activeClass : $picker.settings.btnClass);
        });
    };

    // periodPicker plugin.
    $.fn.periodPicker = function (options) {
        // Configuration.
        var settings = getSettings(options);
        if (!settings) {
            return;
        }

        // Prepare popover config.
        var popover = $.extend({}, settings.popover, {
            title: settings.titleTemplate
                    .replace('%P', settings.prevTemplate)
                    .replace('%N', settings.nextTemplate),
            content: settings.bodyTemplate
                    .replace('%Y', settings.yearName)
                    .replace(/%S/g, settings.semesterName)
                    .replace(/%Q/g, settings.quarterName)
                    .replace(/%C/g, settings.btnClass),
            html: true
        });

        // Loop on nodes.
        return this.each(function () {
            // Initialize picker element.
            var $picker = getPicker($(this), settings);

            // Initialize element & popover.
            var $popover;
            $picker.addClass('period-picker-button')
                    .attr('tabindex', 0)
                    .popover(popover)
                    .on('show.bs.popover', function () {
                        $('.period-picker-button.in').popover('hide');

                        $(this).addClass('in');

                        $picker.data('current', $picker.data('year').clone());

                        $popover = $($(this).data('bs.popover').tip).addClass('period-picker-popover').data('picker', $picker);
                    })
                    .on('shown.bs.popover', function () {
                        refresh($picker, $popover);

                        $('.popover-body > .inner button', $popover).click(function () {
                            if (settings.pick($(this).data('value'), $picker, $popover) !== true) {
                                $picker.popover('hide');
                            }
                        });
                    })
                    .on('hide.bs.popover', function () {
                        $(this).removeClass('in');
                    });
        });
    };

    $(document).on('click', function (e) {
        if (!$(e.target).hasClass('period-picker-button') && $(e.target).parents('.period-picker-button').length === 0 && $(e.target).parents('.popover').length === 0) {
            $('.period-picker-button').popover('hide');
        }
    });

    $(document).on('click', '.period-picker-prev, .period-picker-next', switchYear);
}(jQuery));
