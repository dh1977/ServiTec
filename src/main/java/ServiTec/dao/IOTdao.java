package ServiTec.dao;

import java.util.List;

import ServiTec.dto.OTdto;
import ServiTec.dto.OTdto2;

public interface IOTdao {
	public int crear(OTdto ot);
	public int modificar(OTdto ot);
	public int eliminar(int idOT);
	public OTdto2 consultar(int idOT);
	public List<OTdto2> listar();

}
