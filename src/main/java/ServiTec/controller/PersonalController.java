package ServiTec.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ServiTec.dao.IPersonalDao;
import ServiTec.dto.PersonalDto;

@Controller
@RequestMapping("/personal")
public class PersonalController {
	@Autowired
	private IPersonalDao persona;
	
	@RequestMapping("/crear")
	public @ResponseBody int crear(HttpServletRequest req) {
		int rut = Integer.parseInt(req.getParameter("rut"));
		String nom = req.getParameter("nombre");
		String dir = req.getParameter("direccion");
		String fono = req.getParameter("fono");
		
		return persona.crear( new PersonalDto( 0, rut, nom, dir, fono ) );
	}
	
	@RequestMapping("/modificar")
	public @ResponseBody int modificar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));
		int rut = Integer.parseInt(req.getParameter("rut"));
		String nom = req.getParameter("nombre");
		String dir = req.getParameter("direccion");
		String fono = req.getParameter("fono");
		
		return persona.modificar( new PersonalDto( id, rut, nom, dir, fono ) );
	}
	
	@RequestMapping("/eliminar")
	public @ResponseBody int eliminar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));
		
		return persona.eliminar( id );
	}

	@RequestMapping("/consultar")
	public @ResponseBody PersonalDto consultar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));

		return persona.consultar( id );
	}

	@RequestMapping("/listar")
	public @ResponseBody List<PersonalDto> listar(HttpServletRequest req) {
		return persona.listar();
	}
}

