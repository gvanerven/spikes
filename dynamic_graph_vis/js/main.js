//
function startSlider(local, min, max, initial, update) {
    $( local ).slider({
        range: "max",
        min: min,
        max: max,
        value: initial,
        slide: function( event, ui ) {
          update(ui.value);
        }
      });
    update( $( local ).slider( "value" ) );
}

function timepointInPeriodOpened(timemark, dtStart, dtFinal){
    if(dtStart < timemark && timemark < dtFinal){
        return true;
    }
    return false;
}

//Define a update function to slider. It must have updateLocal, values, graph_data as parameters
//and return a function with the slider's value as parameter. The slider's value is a number from 0 to n which
//references the date array to get the date 'YYYY-MM-DD' value for the label in the div.
function updataDate(updateLocal, values, graph_data, engine_function) {
    if(engine_function != undefined){
        //returns a function such as f(value)
        return engine_function(updateLocal, values, graph_data);
    }

    return function(value){
        //default function
        $( updateLocal ).val( values[value] );
    }

}

