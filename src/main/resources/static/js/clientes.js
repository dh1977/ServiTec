function ajax_listar(){
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
	   method: 'POST',
	   url   : '/clientes/listar'
	   ,headers : {"X-CSRF-TOKEN" : token}
	})
	.done( function(resp) {
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
		alert('No se pudo ejecutar "ajax:/clientes/listar"\n'+err.responseText);
	})
}

function ajax_crear() {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      method: 'POST',
      url   : '/clientes/crear',
      data  : { rut: $('#txtRut').val(), 
      			nombre: $('#txtNombre').val(),
      			direccion: $('#txtDireccion').val(),
      			fono: $('#txtFono').val(),
      			email: $('#txtEmail').val()
      		 }
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar crear el cliente.');
      else 
			dar_aviso('Se creó "'+$('#txtNombre').val()+'"');
   })
   .fail( function (request) {
   	alert('No se pudo ejecutar "ajax:/clientes/crear"\n'+request.responseText);
   })
}

function ajax_modificar() {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      type : 'POST',
      url  : '/clientes/modificar',
      data : { id:  $('#lblId').text(),
					rut: $('#txtRut').val(), 
      			nombre: $('#txtNombre').val(),
      			direccion: $('#txtDireccion').val(),
      			fono: $('#txtFono').val(),
      			email: $('#txtEmail').val()
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
      alert('No se pudo ejecutar "ajax:/clientes/modificar"\n'+err.responseText);
	} )
}
	
function ajax_eliminar() {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      type : 'POST',
      url  : '/clientes/eliminar',
      data : {id: $('#lblId').text()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
         if ( resp == '' )
            alert('Hubo un error al intentar eliminar.');
         else 
				dar_aviso('Se eliminó el cliente #ID=' + $('#lblId').text());
   })
   .fail( function (request) {
         alert('No se pudo ejecutar "ajax:/clientes/eliminar"\n'+request.responseText);
   })
}

function ajax_consultar() {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      type : 'POST',
      url  : '/clientes/consultar',
      data : {id: $('#lblId').text()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
		if ( resp == '' )
         alert('Hubo un error al intentar consultar.');
   })
   .fail( function (request) {
      alert('No se pudo ejecutar "ajax:/clientes/consultar"\n'+request.responseText);
   })
}

function nuevoCliente() {
	// Limpio campos del modal, cambio el título
	$('#lblId').text('');
	$('.modal-body input').val('');
	$('.modal-title').html('Nuevo cliente');
	
	// ...y lo abro 
	$("#modalEdicion").modal('show');
}

function accion() {
	// Gatillada por el clic en 'btnOk' del modal
	let op = modoSelecc.val();
	let err='';
	
	if ( op == 'eliminar' ) 
		if ( confirm('Confirme la eliminación de este cliente.') )
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
	let email = $('#txtEmail').val().trim();
	
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
	else if ( email == '' )
		msg = 'Indique algún correo electrónico.';
	else if ( !(/\S+@\S+\.\S+/).test(email) )
		msg = 'El correo electrónico indicado no es correcto.';
	
	return msg;
}

