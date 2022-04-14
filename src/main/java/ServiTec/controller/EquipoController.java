package ServiTec.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ServiTec.dao.IEquipoDao;
import ServiTec.dto.EquipoDto;


@Controller
@RequestMapping("/equipos")
public class EquipoController {	
	@Autowired
	private IEquipoDao equipo ;
	
	@RequestMapping("/crear")
	public @ResponseBody long crear(HttpServletRequest req) {
		int ncontrato = Integer.parseInt(req.getParameter("ncontrato"));
		String cnombre = req.getParameter("cnombre");		
		return equipo.crear( new EquipoDto( 0, ncontrato , cnombre) );
	}
	
	@RequestMapping("/modificar")
	public @ResponseBody int modificar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));
		int ncontrato = Integer.parseInt(req.getParameter("ncontrato"));
		String cnombre = req.getParameter("cnombre");
		
		return equipo.modificar( new EquipoDto( id, ncontrato, cnombre) );
	}
	
	@RequestMapping("/eliminar")
	public @ResponseBody int eliminar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));
		
		return equipo.eliminar( id );
	}

	@RequestMapping("/consultar")
	public @ResponseBody EquipoDto consultar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));

		return equipo.consultar( id );
	}

	@RequestMapping("/listar")
	public @ResponseBody List<EquipoDto> listar(HttpServletRequest req) {
		return equipo.listar();
	}
}


