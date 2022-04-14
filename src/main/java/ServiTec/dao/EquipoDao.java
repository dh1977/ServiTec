package ServiTec.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ServiTec.dto.EquipoDto;

@Repository
@Transactional
public class EquipoDao implements IEquipoDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public EquipoDao() {}

	@Override
	public int crear(EquipoDto equipo) {
		
		int ret = 0;
		
		String sql = "INSERT INTO Equipocontrato (nContrato, cNombre) "+
							"VALUES(?,?)";
		Object[] args = {equipo.getnContrato(), equipo.getcNombre()
						};
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public int modificar(EquipoDto equipo) {
		
int ret = 0;
		
		String sql = "UPDATE Equipocontrato Set nContrato=?, cNombre=?"+
						" WHERE nId = ?"	;
		Object[] args = {equipo.getnContrato(), equipo.getcNombre(), equipo.getnId()
						};
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public int eliminar(int nId) {
		int ret = 0;
		
		String sql = "DELETE FROM Equipocontrato WHERE nId = ?";
		Object[] args = { nId };
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public EquipoDto consultar(int nId) {
		
		EquipoDto ret = null;
		String qry = "SELECT * FROM Equipocontrato WHERE nId = ?";;
		Object args[] = {nId};

		try {
			ret = jdbcTemplate.queryForObject
				(qry, BeanPropertyRowMapper.newInstance(EquipoDto.class), args );
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return ret;
	}

	@Override
	public List<EquipoDto> listar() {
		List<EquipoDto> ret = null;
		String qry = "SELECT * FROM Equipocontrato";
		
		try {
			ret = jdbcTemplate.query
					(qry, BeanPropertyRowMapper.newInstance(EquipoDto.class) );
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}
	

}
