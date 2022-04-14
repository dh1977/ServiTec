// Funciones de uso global para proyecto ServiTec

function dar_aviso(msg) {
	// Objetivo: mostrar mensajes de no-error al usuario, evitando el uso de "Alert()"

	// Esta función requiere de la sección "th:fragment="modos_agregar_mensajes"
	// definida en "/ServiTec/src/main/resources/templates/fragments/complementos.html",
	// la que debe ser incrustada justo bajo el título "jumbotron":
	// 	<div th:replace="fragments/complementos :: modos_agregar_mensajes"></div>
	// Obs: válido para las páginas que utilicen "modos"
	$('#avisos').html(msg);
	$('#avisos').toast('show');	
}

