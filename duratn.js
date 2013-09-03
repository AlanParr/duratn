(function($) {

$.fn.jqDuration = function () {
    //Add 3 new controls for days,hrs,mins.
    var container = this.parent();

    var originatingElement = this;
    var thisInstanceElementGuid = generateGuid();
    var contId = 'jqDuration_' + thisInstanceElementGuid;
    var daysId = 'jqDuration_days_' + thisInstanceElementGuid;
    var hrsId = 'jqDuration_hrs_' + thisInstanceElementGuid;
    var minsId = 'jqDuration_mins_' + thisInstanceElementGuid;

    var jqDurationContainer = $('<div>').attr({
        id: contId,
        name: contId
    }).addClass("duration-container");

    $('<input>').attr({
        type: 'number',
        id: daysId,
        name: daysId,
        placeholder: "days"
    }).appendTo(jqDurationContainer);

    $('<input>').attr({
        type: 'number',
        id: hrsId,
        name: hrsId,
        placeholder: "hrs"
    }).appendTo(jqDurationContainer);

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
    });
    for (var val in mins) {
        $('<option />', { value: val, text: mins[val] + ' mins' }).appendTo(minsInput);
    }
    minsInput.appendTo(jqDurationContainer);

    jqDurationContainer.appendTo(container);

    $('#' + daysId).bind("click", recalculate);
    $('#' + hrsId).bind("click", recalculate);
    $('#' + minsId).bind("click", recalculate);

    //Hide this
    this.hide();

    return this;

    function generateGuid() {
        var result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return result;
    }
    
    function recalculate(event) {
        var vals = new Array();
        
        if ($('#' + daysId).val() != "") { vals.push(parseInt($('#' + daysId).val() * 480));}
        if ($('#' + hrsId).val() != "") { vals.push(parseInt($('#' + hrsId).val() * 60)); }
        if ($('#' + minsId).val() != "") { vals.push(parseInt($('#' + minsId).val())); }
        
        var result = vals.reduce(function (previousValue, currentValue) {
            return currentValue + previousValue;
        });

        $(originatingElement).val(result);
    }
};

}(jQuery));