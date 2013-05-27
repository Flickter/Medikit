function validate(){
	var user = $('#textinput2').val();
	var pass = $('#textinput3').val();
	$.ajax({
		url: 'http://localhost:8888/validate?username=' + user + '&password=' + pass,
		dataType: "jsonp",
    	jsonpCallback: "_log",
		cache: false,
    	timeout: 5000,
    	success: function (data) {
    		if(!(data === 'false')){
    			window.location.href = '#page2';
    		}else{
    			alert('Autenticación invalida');
    		}
    	},
    	error: function(jqHXR, textStatus, errorThrown){
    		alert('error '+ textStatus+" "+errorThrown);
    	}
	}).done(function(){
		load_medicines();
	});
	var user = $('#textinput2').val('');
	var pass = $('#textinput3').val('');
}
function load_medicines(){
	$('.optmedi').remove().trigger( 'updatelayout' );
	$.ajax({
		url: 'http://localhost:8888/obt_medicines',
		dataType: "jsonp",
    	jsonpCallback: "_log",
		cache: false,
    	timeout: 5000,
    	success: function (data) {
    		if(!(data === 'false')){
    			data = eval( "(" + data + ")" );
    			for(var i in data){
	    			$('#listmedic').append('<li class="optmedi"><a>'+data[i]+'</a><a onclick="disable_medicine('+"'"+data[i]+"'"+')"></a></li>');
	    		}
	    		$('#listmedic').listview('refresh');
    		}
    	},
    	error: function(jqHXR, textStatus, errorThrown){
    		alert('error '+ textStatus+" "+errorThrown);
    	}
	});
}
function insert_medicine(){
	var medicine = $('#textinput1').val();
	$.ajax({
		url: 'http://localhost:8888/insert_medicine?medicine=' + medicine,
		dataType: "jsonp",
    	jsonpCallback: "_log",
		cache: false,
    	timeout: 5000,
    	success: function (data) {
    		if(!(data === 'false')){
    		}else{
    			alert('Inserción no valida');
    		}
    	},
    	error: function(jqHXR, textStatus, errorThrown){
    		alert('error '+ textStatus+" "+errorThrown);
    	}
	}).done(function(){
		load_medicines();
		$('#textinput1').val('');
	});
}
function disable_medicine(medi){
	$.ajax({
		url: 'http://localhost:8888/disable_medicine?medicine=' + medi,
		dataType: "jsonp",
    	jsonpCallback: "_log",
		cache: false,
    	timeout: 5000,
    	success: function (data) {
    	},
    	error: function(jqHXR, textStatus, errorThrown){
    		alert('error '+ textStatus+" "+errorThrown);
    	}
	}).done(function(){
		load_medicines();
	});
}