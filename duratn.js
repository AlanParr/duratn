(function($) {

$.fn.duratn = function () {
    //Add 3 new controls for days,hrs,mins.
    var container = this.parent();

    var originatingElement = this;
    var thisInstanceElementGuid = generateGuid();
    var contId = 'duratn_' + thisInstanceElementGuid;
    var daysId = 'duratn_days_' + thisInstanceElementGuid;
    var hrsId = 'duratn_hrs_' + thisInstanceElementGuid;
    var minsId = 'duratn_mins_' + thisInstanceElementGuid;

    var minutesInADay = 480;
    var minutesInAnHour = 60;

    var duratnContainer = $('<div>').attr({
        id: contId,
        name: contId
    }).addClass("duratn-container");

    $('<input>').attr({
        type: 'number',
        id: daysId,
        name: daysId,
        placeholder: "days"
    }).addClass("ui-input-text").appendTo(duratnContainer);

    $('<input>').attr({
        type: 'number',
        id: hrsId,
        name: hrsId,
        placeholder: "hrs"
    }).addClass("ui-input-text").appendTo(duratnContainer);

    var mins = {
        '0': '0',
        '15': '15',
        '30': '30',
        '45': '45'
    };
    
    var minsInput = $('<select>').attr({
        type: 'number',
        id: minsId,
        name: minsId,
        placeholder: "mins"
    }).addClass("ui-input-text");
    for (var val in mins) {
        $('<option />', { value: val, text: mins[val] + ' mins' }).appendTo(minsInput);
    }
    minsInput.appendTo(duratnContainer);

    duratnContainer.appendTo(container);

    $("[id*=" + thisInstanceElementGuid + "][type=number]").on("change keyup paste click", function () {
        recalculate();
    })

    //Hide this
    this.hide();

    populateControls();

    return this;

    function generateGuid() {
        var result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return result;
    }
    
    function populateControls() {
        if ($(originatingElement).val() != "") {
            var totalValue = parseInt($(originatingElement).val());
            
            var days = parseInt(totalValue / minutesInADay);
            $('#' + daysId).val(days);
            totalValue = totalValue - (days * minutesInADay);

            var hours = parseInt(totalValue / minutesInAnHour);
            $('#' + hrsId).val(hours);
            totalValue = totalValue - (hours * minutesInAnHour);

            $('#' + minsId).val(totalValue);
        }
    }

    function recalculate(event) {
        var vals = new Array();
        
        if ($('#' + daysId).val() != "") { vals.push(parseInt($('#' + daysId).val() * minutesInADay)); }
        if ($('#' + hrsId).val() != "") { vals.push(parseInt($('#' + hrsId).val() * minutesInAnHour)); }
        if ($('#' + minsId).val() != "") { vals.push(parseInt($('#' + minsId).val())); }
        
        var result = vals.reduce(function (previousValue, currentValue) {
            return currentValue + previousValue;
        });

        $(originatingElement).val(result);
    }
};

}(jQuery));