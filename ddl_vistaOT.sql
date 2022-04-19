USE ServiTec;

CREATE  OR REPLACE VIEW vistaOT AS
	SELECT ot.nId, ot.fProgramada, ot.fEjecucion, ot.cObservaciones,
			 cm.nContrato, cm.fDesde, cm.fHasta, cm.nPeriodicidad,
			 c.nId nIdCli, c.nRut nRutCli, c.cNombre cNombreCli, c.cDireccion cDireccionCli, c.cFono cFonoCli, c.cEmail cEmailCli,
			 p.nId nIdSupervisor, p.cNombre cNombreSupervisor
		FROM OrdenTrabajo ot
			JOIN ContratoMantencion cm ON cm.nContrato = ot.nContrato
			JOIN Cliente c ON c.nId = cm.nIdCliente
			JOIN Personal p ON p.nId = ot.nIdSupervisor;
