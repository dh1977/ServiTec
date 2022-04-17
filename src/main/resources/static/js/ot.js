function ajax_listar(){
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
	   method : 'POST',
	   url : '/ot/listar'
	   ,headers : {"X-CSRF-TOKEN" : token}
	})
	.done( function(resp) {
		// Cargo los datos en '#tablaDatos'
		var tbody = '';
		for ( let i=0; i < resp.length; i++) {
			tbody += '<tr>';
			tbody += '<td>' + resp[i].nId + '</td>' +
						'<td>' + resp[i].cNombreCli + '</td>' +
						'<td>' + resp[i].nContrato + '</td>' +
						'<td>' + resp[i].cNombreSupervisor + '</td>' +
						'<td>' + resp[i].fProgramada + '</td>' +
						'<td>' + resp[i].fEjecucion + '</td>' +
						'<td>' + resp[i].cObservaciones + '</td>';
			tbody += '</tr>';
		}
		$('#tablaDatos tbody').html(tbody);
	})
	.fail( function(err) { 
		alert('No se pudo ejecutar "ajax:/ot/listar"\n'+err.responseText);
	})
}

function ajax_crear() {
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
      type : 'POST',
      url  : '/ot/crear',
      data : {	nContrato: $('#txtContrato').val(),
					nIdSupervisor: $('#selAsigna').children(':selected').val(),
					fProgramada: $('#txtfProg').val(),
					fEjecucion: $('#txtfEjec').val(),
					cObservaciones: $('#txtObs').val()
				 }
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar crear la OT.');
      else 
			dar_aviso('Se creó la OT');
   })
   .fail( function (request) {
   	alert('No se pudo ejecutar "ajax:/ot/crear"\n'+request.responseText);
   })
}

function ajax_modificar() {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      type : 'POST',
      url  : '/ot/modificar',
      data : { id: idOTDesdeModal(),
					nContrato: $('#txtContrato').val(),
					nIdSupervisor: $('#selAsigna').children(':selected').val(),
					fProgramada: $('#txtfProg').val(),
					fEjecucion: $('#txtfEjec').val(),
					cObservaciones: $('#txtObs').val()
				 }
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
	.done( function(resp) {
      if ( resp == '' )
         alert('Hubo un error al intentar modificar.');
      else 
			dar_aviso('Se modificó la OT #' + idOTDesdeModal() );
	})
 	.fail( function (err) {
      alert('No se pudo ejecutar "ajax:/ot/modificar"\n'+err.responseText);
	} )
}
	
function ajax_eliminar() {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      type : 'POST',
      url  : '/ot/eliminar',
      data : {id: idOTDesdeModal()}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
         if ( resp == '' )
            alert('Hubo un error al intentar eliminar.');
         else 
				dar_aviso('Se eliminó la OT #' + idOTDesdeModal());
   })
   .fail( function (request) {
         alert('No se pudo ejecutar "ajax:/ot/eliminar"\n'+request.responseText);
   })
}

function ajax_consultar(id) {
	var token = $("meta[name='_csrf']").attr("content");
	
   $.ajax({
      type : 'POST',
      url  : '/ot/consultar',
      data : {id: id}
	   ,headers : {"X-CSRF-TOKEN" : token}
   })
   .done( function (resp) {
		// Lleno datos del modal
		let ms = resp.nPeriodicidad;

		$('.modal-title').append(' #'+id);
		$('#txtContrato').val(resp.nContrato);
		llenarDatosContrato( resp.fDesde, resp.fHasta, ms, resp.cNombreCli );
		llenarListaPersonal(resp.nIdSupervisor);

		$('#txtfProg').val( resp.fProgramada );
		$('#txtfEjec').val( resp.fEjecucion );
		$('#txtObs').val( resp.cObservaciones );
   })
   .fail( function (request) {
         alert('No se pudo ejecutar "ajax:/ot/consultar"\n'+request.responseText);
   })
}

function nuevaOT() {
	// Limpio campos del modal, cambio el título
	$('.modal-body input').val('');
	$('#datosContrato').html('');
	llenarListaPersonal('0');
	readOnlyModal(true,false);
	$('.modal-title').html('Nueva O.T.');
	
	// ...y lo abro 
	$("#modalEdicion").modal('show');
	$('#txtContrato').focus();
}

function readOnlyModal(readOnly, inclContrato) {
	$('#txtContrato').prop( 'readonly', (readOnly && inclContrato) );
	$('#selAsigna').prop( 'disabled', readOnly );
	$('#txtfProg').prop( 'readonly', readOnly );
	$('#txtfEjec').prop( 'readonly', readOnly );
	$('#txtObs').prop( 'readonly', readOnly );
}

function llenarListaPersonal(id) {
	var token = $("meta[name='_csrf']").attr("content");

	$('#selAsigna').html('');
	
   $.ajax({
	   method : 'POST',
	   url : '/personal/listar'
	   ,headers : {"X-CSRF-TOKEN" : token}
	})
	.done( function(resp) {
		// Cargo los datos en '#selAsigna'
		var lista = '';
		if ( id=='0' )
			lista = '<option value="0" selected>&nbsp;</option>';
		
		for ( let i=0; i < resp.length; i++) {
			lista += '<option value="' + resp[i].nId + '"';
			if ( resp[i].nId == id )
				lista += ' selected'
			
			lista += '>'+resp[i].cNombre+'</option>'; 
		}
		$('#selAsigna').html(lista);
	})
	.fail( function(err) { 
		alert('No se pudo leer la lista del personal"\n'+err.responseText);
	})
}

function accion() {
	// Gatillada por el clic en 'btnOk' del modal
	let op = modoSelecc.val();
	let err='';
	
	if ( op == 'eliminar' ) 
		if ( $('txtfEjec').val() != '' ) 
			alert('No puede eliminar una OT ya ejecutada.');
		else if ( confirm('Confirme la eliminación de esta OT.') )
			ajax_eliminar();
		else
			err = '!'
	else {
		err = validar_datos();
		
		if ( err != '' )
			alert(err);
		else if ( op == 'crear' )
			ajax_crear();
		else if ( op == 'modificar' )
			ajax_modificar();	
	}

	if ( err == '' ) {
		setTimeout( function() {ajax_listar()}, 500 );  // 500ms
		$('#modalEdicion').modal('hide');
	}
	else
		$('#txtRut').focus();
}	

function validar_datos() {
	// Retorna '' si todo ok. Si hay un error, retorna un mensaje que lo describe. 
	let nContrato = $('#txtContrato').val().trim(); 
	let idPersona = $('#selAsigna').children(':selected').val();
	let fProg = $('#txtfProg').val().trim();
	let fEjec = $('#txtfEjec').val().trim();

	let msg = '';
	if ( nContrato == '' )
		msg = 'No ha indicado el nro. de contrato';
	else if ( idPersona == '' || idPersona == '0' )
		msg = 'Indique la persona que asigna el trabajo.';
	else if ( fProg == '' )
		msg = 'Falta la fecha programada.';
	else if ( fProg < Date.now() )
		msg = 'La fecha programada es anterior a hoy.';
	else if ( fEjec != '' && fEjec < fProg )
		msg = 'Fecha de ejecución es anterior a la programada.';
	
	return msg;
}

function leerDatosContrato(nContrato) {
	// Llamada al dar Enter en el nº de contrato en el modal, con un nº válido.
	// Esto se da en los modos 'crear' y 'modificar'.
	var token = $("meta[name='_csrf']").attr("content");

   $.ajax({
	   method : 'POST',
	   url : '/contrato/listar',
	   data: {nContrato: nContrato}
	   ,headers : {"X-CSRF-TOKEN" : token}
	})
	.done( function(resp) {
		if ( resp.length == 0) 
			alert('Contrato no encontrado.');
		else if ( resp[0].fHasta < Date.now() )
			alert('Contrato ya expirado el '+resp[0].fHasta);
		else {
			let ms = resp[0].nPeriodicidad;
			llenarDatosContrato( resp[0].fDesde, resp[0].fHasta, ms, resp[0].cNombre );
			readOnlyModal(false,false);			
			$('#selAsigna').focus();
		}
	})
	.fail( function(err) { 
		alert('No se pudo leer la info del contrato"\n'+err.responseText);
	})
	
}

function idOTDesdeModal() {
	var id='0';
	
	if ( $('.modal-title').html().indexOf('#') >= 0 )
		id = $('.modal-title').html().split('#')[1];

	return id; 
}

function llenarDatosContrato(fDesde, fHasta, periodicidad, nombreClte) {
	$('#datosContrato').html
		( fDesde + ' al ' + fHasta + 
			', mant. ' + (periodicidad==1?'mensual.':'c/'+periodicidad+' meses.') +
			'<br>Clte: ' + nombreClte
		);
}
