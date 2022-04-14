package ServiTec.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ServiTec.dto.PersonalDto;

@Repository
@Transactional
public class PersonalDao implements IPersonalDao {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public PersonalDao() {}

	@Override
	public int crear(PersonalDto persona) {
		// Si la inserción es exitosa, retorna la ID asignada a la nueva persona.
		// Si falla, retorna 0.
		int ret = 0;
		
		String sql = "INSERT INTO Personal (nRut, cNombre, cDireccion, cFono) "+
							"VALUES(?,?,?,?)";
		Object[] args =	{persona.getnRut(), persona.getcNombre(), 
						 persona.getcDireccion(), persona.getcFono() };
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public int modificar(PersonalDto persona) {
		// Retorna 0 si falla; >0 si tiene éxito.
		int ret = 0;
		
		String sql = "UPDATE Personal Set nRut=?, cNombre=?, cDireccion=?, cFono=? "+
						" WHERE nId = ?"	;
		Object[] args = {persona.getnRut(), persona.getcNombre(), persona.getcDireccion(),
						 persona.getcFono(), persona.getnId() };
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public int eliminar(int idPersona) {
		// Retorna 0 si falla; > 0, si tiene éxito.
		int ret = 0;
		
		String sql = "DELETE FROM Personal WHERE nId = ?";
		Object[] args = { idPersona };
		
		try {
			ret = jdbcTemplate.update(sql, args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

	@Override
	public PersonalDto consultar(int idPersona) {
		PersonalDto ret = null;
		String qry = "SELECT * FROM Personal WHERE nId = ?";;
		Object args[] = {idPersona};

		try {
			ret = jdbcTemplate.queryForObject
				(qry, BeanPropertyRowMapper.newInstance(PersonalDto.class), args );
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}

		return ret;
	}

	@Override
	public List<PersonalDto> listar() {
		List<PersonalDto> ret = null;
		String qry = "SELECT * FROM Personal";
		
		try {
			ret = jdbcTemplate.query
					(qry, BeanPropertyRowMapper.newInstance(PersonalDto.class) );
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return ret;
	}

}
