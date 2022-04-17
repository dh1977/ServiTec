package ServiTec.dto;

public class OTdto2 {
	// nId, fProgramada, fEjecucion, cObservaciones           -> datos OT
	// nContrato, fDesde, fHasta, nPeriodicidad               -> datos contrato
	// nIdCliente, nRut, cNombre, cDireccion, cFono, cEmail   -> datos cliente
	
	// Datos OT
	private int nId;
	private String fProgramada;
	private String fEjecucion;
	private String cObservaciones;
	
	// Datos del contrato
	private int nContrato;
	private String fDesde;
	private String fHasta;
	private int nPeriodicidad;

	// Datos del cliente
	private int nIdCli;
	private int nRutCli;
	private String cNombreCli;
	private String cDireccionCli;
	private String cFonoCli;
	private String cEmailCli;
	
	// Datos del supervisor que la hizo
	private int nIdSupervisor;
	private String cNombreSupervisor;

	// Constructor x defecto
	public OTdto2() {}

	// Constructor general
	public OTdto2(int nId, String fProgramada, String fEjecucion, String cObservaciones, int nContrato, String fDesde,
			String fHasta, int nPeriodicidad, int nIdCli, int nRutCli, String cNombreCli, String cDireccionCli,
			String cFonoCli, String cEmailCli, int nIdSupervisor, String cNombreSupervisor) 
	{
		this.nId = nId;
		this.fProgramada = fProgramada;
		this.fEjecucion = fEjecucion;
		this.cObservaciones = cObservaciones;
		this.nContrato = nContrato;
		this.fDesde = fDesde;
		this.fHasta = fHasta;
		this.nPeriodicidad = nPeriodicidad;
		this.nIdCli = nIdCli;
		this.nRutCli = nRutCli;
		this.cNombreCli = cNombreCli;
		this.cDireccionCli = cDireccionCli;
		this.cFonoCli = cFonoCli;
		this.cEmailCli = cEmailCli;
		this.nIdSupervisor = nIdSupervisor;
		this.cNombreSupervisor = cNombreSupervisor;
	}


	public int getnId() {
		return nId;
	}

	public void setnId(int nId) {
		this.nId = nId;
	}

	public String getfProgramada() {
		return fProgramada;
	}

	public void setfProgramada(String fProgramada) {
		this.fProgramada = fProgramada;
	}

	public String getfEjecucion() {
		return fEjecucion;
	}

	public void setfEjecucion(String fEjecucion) {
		this.fEjecucion = fEjecucion;
	}

	public String getcObservaciones() {
		return cObservaciones;
	}

	public void setcObservaciones(String cObservaciones) {
		this.cObservaciones = cObservaciones;
	}

	public int getnContrato() {
		return nContrato;
	}

	public void setnContrato(int nContrato) {
		this.nContrato = nContrato;
	}

	public String getfDesde() {
		return fDesde;
	}

	public void setfDesde(String fDesde) {
		this.fDesde = fDesde;
	}

	public String getfHasta() {
		return fHasta;
	}

	public void setfHasta(String fHasta) {
		this.fHasta = fHasta;
	}

	public int getnPeriodicidad() {
		return nPeriodicidad;
	}

	public void setnPeriodicidad(int nPeriodicidad) {
		this.nPeriodicidad = nPeriodicidad;
	}


	public int getnIdCli() {
		return nIdCli;
	}

	public void setnIdCli(int nIdCli) {
		this.nIdCli = nIdCli;
	}

	public int getnRutCli() {
		return nRutCli;
	}

	public void setnRutCli(int nRutCli) {
		this.nRutCli = nRutCli;
	}

	public String getcNombreCli() {
		return cNombreCli;
	}

	public void setcNombreCli(String cNombreCli) {
		this.cNombreCli = cNombreCli;
	}

	public String getcDireccionCli() {
		return cDireccionCli;
	}

	public void setcDireccionCli(String cDireccionCli) {
		this.cDireccionCli = cDireccionCli;
	}

	public String getcFonoCli() {
		return cFonoCli;
	}

	public void setcFonoCli(String cFonoCli) {
		this.cFonoCli = cFonoCli;
	}

	public String getcEmailCli() {
		return cEmailCli;
	}

	public void setcEmailCli(String cEmailCli) {
		this.cEmailCli = cEmailCli;
	}

	public int getnIdSupervisor() {
		return nIdSupervisor;
	}

	public void setnIdSupervisor(int nIdSupervisor) {
		this.nIdSupervisor = nIdSupervisor;
	}

	public String getcNombreSupervisor() {
		return cNombreSupervisor;
	}

	public void setcNombreSupervisor(String cNombreSupervisor) {
		this.cNombreSupervisor = cNombreSupervisor;
	}

}
