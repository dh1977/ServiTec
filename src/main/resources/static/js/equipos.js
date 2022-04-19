function ajax_listar(){
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/equipos/listar'
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

		$(document).ready(function() {
			// Programo el evento clic sobre una fila de datos 
			$("#tablaDatos tbody").on('click','tr', function() {
				if ( modoSelecc.val() == 'crear' )
					// El modo 'crear' se atiende a través del botón 'btnCrear'
					return;
					
				// Cargo los datos de la fila selecc. para modif. o elim.
				$('.modal-title').html(modoSelecc.html()+' Equipo');
				
				$("#lblId").text( $(this).find('td').eq(0).text() );
				$("#txtncontrato").val( $(this).find('td').eq(1).text() );
				$("#txtcnombre").val( $(this).find('td').eq(2).text() );
		
				
				// Abro el modal
				$("#modalEdicion").modal('show');
				
				// Los inputs del modal quedan readonly en modo 'eliminar'
				if ( modoSelecc.val() == 'eliminar' ) {
					$('#inputsModal .input-sm').prop('readonly', true);
					$('#btnOk').text('Eliminar');
					$('#btnCancelar').focus();
				}
				else {
					$('#inputsModal .input-sm').prop('readonly', false);
					$('#btnOk').text('Grabar');
					$('#txtncontrato').focus();
				}
			})
		})
	})
	.fail( function(request) {
		alert('No se pudo ejecutar "ajax:/equipos/listar"\n'+request.responseText);
   });
}

function ajax_crear() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/equipos/crear',
      data : { ncontrato: $('#txtncontrato').val(), 
      			cnombre: $('#txtcnombre').val(),
      		 }
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar crear el equipo.');
      else 
			alert('Se creó el equipo.');
   })
   .fail( function (request) {
   	alert('No se pudo ejecutar "ajax:/equipos/crear"\n'+request.responseText);
   })
}

function ajax_modificar() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/equipos/modificar',
      data : { id:  $('#lblId').text(),
				ncontrato: $('#txtncontrato').val(), 
      			cnombre: $('#txtcnombre').val(),
      			}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
 	.done( function (resp) {
      if ( resp == 0 )
         alert('Hubo un error al intentar modificar.');
      else 
			alert('Se modificó el equipo.');
   })
   .fail( function (request) {
      alert('No se pudo ejecutar "ajax:/equipos/modificar"\n'+request.responseText);
   })
}

function ajax_eliminar() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/equipos/eliminar',
      data : {id: $('#lblId').text()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
         if ( resp == '' )
            alert('Hubo un error al intentar eliminar el equipo.');
         else 
				alert('Se eliminó el equipo correctamente.');
   })
   .fail( function (request) {
         alert('No se pudo ejecutar "ajax:/equipos/eliminar"\n'+request.responseText);
   })
}

function ajax_consultar() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/equipos/consultar',
      data : {id: $('#lblId').text()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
		if ( resp == '' )
         alert('Hubo un error al intentar consultar el equipo.');
   })
   .fail( function (request) {
      alert('No se pudo ejecutar "ajax:/equipos/consultar"\n'+request.responseText);
   })
}

function nuevoEquipo() {
	// Limpio campos del modal
	$('#lblId').text('');
	$('#modalEdicion input').val('');
	$('.modal-title').html('Nuevo Equipo');

	// ...y lo abro 
	$("#modalEdicion").modal('show');
}

function accion() {
	// Gatillada por el clic en 'btnOk' del modal
	let op = modoSelecc.val();
	let err='';
	
	if ( op == 'eliminar' ) 
		if ( confirm('Confirme la eliminación de este equipo.') )
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
			$('#txtnContrato').focus();
	}

	if ( err == '' ) {
		ajax_listar();
		$('#modalEdicion').modal('hide');
	}
}	

function validar_datos() {
	// Retorna '' si todo ok. Si hay un error, retorna un mensaje que lo describe. 
	let ncontrato = $('#txtncontrato').val().trim(); 
	let cnombre = $('#txtcnombre').val().trim();

	let msg = '';
	if ( isNaN(ncontrato) )
		msg = 'Sólo números en el Numero de Contrato.';
	else if ( cnombre == '' )
		msg = 'Debe indicar el nombre del equipo.';

	
	return msg;
}
/**
 * 
 */