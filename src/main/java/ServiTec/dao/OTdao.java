package ServiTec.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ServiTec.dto.OTdto;
import ServiTec.dto.OTdto2;

@Repository
@Transactional
public class OTdao implements IOTdao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public OTdao() {}

	@Override
	public int crear(OTdto ot) {
		// Si falla, retorna 0. De lo contrario > 0
		int ret = 0;
		
		String sql = "INSERT INTO OrdenTrabajo " +
						"(nContrato, nIdSupervisor, fProgramada, fEjecucion, cObservaciones)"+
							" VALUES(?,?,?,?,?)";
		Object[] args = {ot.getnContrato(), ot.getnIdSupervisor(), ot.getfProgramada(),
						 ot.getfEjecucion(), ot.getcObservaciones()	};
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public int modificar(OTdto ot) {
		// Retorna 0 si falla; >0 si tiene éxito.
		int ret = 0;
		
		String sql = "UPDATE OrdenTrabajo " +
						"Set nContrato=?, nIdSupervisor=?, fProgramada=?, fEjecucion=?, cObservaciones=?"+
					" WHERE nId = ?"	;
		Object[] args = {ot.getnContrato(), ot.getnIdSupervisor(), ot.getfProgramada(),
						 ot.getfEjecucion(), ot.getcObservaciones(), ot.getnId() };
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public int eliminar(int idOT) {
		// Retorna 0 si falla; > 0, si tiene éxito.
		int ret = 0;
		
		String sql = "DELETE FROM OrdenTrabajo WHERE nId = ?";
		Object[] args = { idOT };
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	// Las consultas retornan datos desde la vista "vistaOT"
	
	@Override
	public OTdto2 consultar(int idOT) {
		OTdto2 ret = null;
		String qry = "SELECT * FROM vistaOT WHERE nId = ?";;
		Object args[] = {idOT};

		try {
			ret = jdbcTemplate.queryForObject
				(qry, BeanPropertyRowMapper.newInstance(OTdto2.class), args );
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return ret;
	}

	@Override
	public List<OTdto2> listar() {
		List<OTdto2> ret = null;
		String qry = "SELECT * FROM vistaOT ORDER BY nId DESC";
		
		try {
			ret = jdbcTemplate.query
					(qry, BeanPropertyRowMapper.newInstance(OTdto2.class) );
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

}
