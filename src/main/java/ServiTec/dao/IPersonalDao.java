package ServiTec.dao;

import java.util.List;

import ServiTec.dto.PersonalDto;

public interface IPersonalDao {
	public int crear(PersonalDto persona);
	public int modificar(PersonalDto persona);
	public int eliminar(int idPersona);
	public PersonalDto consultar(int idPersona);
	public List<PersonalDto> listar();

}
