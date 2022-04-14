
function ajax_listar(){
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
	   method : 'POST',
	   url : '/personal/listar'
	   ,headers : {"X-CSRF-TOKEN" : token}
	})
	.done( function(resp) {
		// Cargo los datos en '#tablaDatos'
		var tbody = '';
		for ( let i=0; i < resp.length; i++) {
			tbody += '<tr>';

			for ( let k in resp[i] )
				tbody += '<td>' + resp[i][k] + '</td>';

			tbody += '</tr>';
		}
		$('#tablaDatos tbody').html(tbody);
	})
	.fail( function(err) { 
		alert('No se pudo ejecutar "ajax:/personal/listar"\n'+err.responseText);
	})
}

function ajax_crear() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/personal/crear',
      data : { rut: $('#txtRut').val(), 
      			nombre: $('#txtNombre').val(),
      			direccion: $('#txtDireccion').val(),
      			fono: $('#txtFono').val()
      		 }
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar crear la persona.');
      else
			dar_aviso('Se creó "' + $('#txtNombre').val() + '"');
   })
   .fail( function (request) {
   	alert('No se pudo ejecutar "ajax:/personal/crear"\n'+request.responseText);
   })
}

function ajax_modificar() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/personal/modificar',
      data : { id:  $('#lblId').text(),
					rut: $('#txtRut').val(), 
      			nombre: $('#txtNombre').val(),
      			direccion: $('#txtDireccion').val(),
      			fono: $('#txtFono').val()
      		 }
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
	.done( function(resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar modificar.');
      else 
			dar_aviso('Se modificó "' + $('#txtNombre').val() + '"');
	})
 	.fail( function (err) {
      alert('No se pudo ejecutar "ajax:/personal/modificar"\n'+err.responseText);
	} )
}
	
function ajax_eliminar() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/personal/eliminar',
      data : {id: $('#lblId').text()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar eliminar.');
      else 
			dar_aviso('Se eliminó la persona #ID='+$('#lblId').text());
   })
   .fail( function (request) {
      alert('No se pudo ejecutar "ajax:/personal/eliminar"\n'+request.responseText);
   })
}

function ajax_consultar() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/personal/consultar',
      data : {id: $('#lblId').text()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
		if ( resp == '' )
         alert('Hubo un error al intentar consultar.');
   })
   .fail( function (request) {
      alert('No se pudo ejecutar "ajax:/personal/consultar"\n'+request.responseText);
   })
}

function nuevaPersona() {
	// Limpio campos del modal, cambio el título
	$('#lblId').text('');
	$('.modal-body input').val('');
	$('.modal-title').html('Nueva persona');
	
	// ...y lo abro 
	$("#modalEdicion").modal('show');
}

function accion() {
	// Gatillada por el clic en 'btnOk' del modal
	let op = modoSelecc.val();
	let err='';
	
	if ( op == 'eliminar' ) 
		if ( confirm('Confirme la eliminación de esta persona.') )
			ajax_eliminar();
		else
			err = '!'
	else {
		err = validar_datos();
		
		if ( err != '' ) 
			alert(err);
		else if ( op =='crear' )
			ajax_crear();
		else if ( op =='modificar' )
			ajax_modificar();	

		if ( err != '' )
			$('#txtRut').focus();
	}

	if ( err == '' ) {
		// Le doy tiempo a la solicitud ajax. Sin esto, no se actualizan 
		// visualmente los datos de la tabla.
		setTimeout( function() {ajax_listar()}, 500 );  // 500ms
		$('#modalEdicion').modal('hide');
	}
}	

function validar_datos() {
	// Retorna '' si todo ok. Si hay un error, retorna un mensaje que lo describe. 
	let rut = $('#txtRut').val().trim(); 
	let nombre = $('#txtNombre').val().trim();
	let direcc = $('#txtDireccion').val().trim();
	let fono = $('#txtFono').val().trim();
	
	let msg = '';
	if ( isNaN(rut) )
		msg = 'Sólo números en el Rut.';
	else if ( parseInt(rut) < 10)
		msg = 'Al menos 2 dígitos en el Rut.';
	else if ( nombre == '' )
		msg = 'Debe indicar el nombre.';
	else if ( direcc == '' )
		msg = 'Debe indicar la dirección.';
	else if ( fono == '' )
		msg = 'Indique algún teléfono.';
	
	return msg;
}
