package ServiTec.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ServiTec.dao.IOTdao;
import ServiTec.dto.OTdto;
import ServiTec.dto.OTdto2;


@Controller
@RequestMapping("/ot")
public class OTcontroller {
	@Autowired
	private IOTdao ot;
	
	@RequestMapping("/crear")
	public @ResponseBody int crear(HttpServletRequest req) {
		int nContrato = Integer.parseInt(req.getParameter("nContrato"));
		int nIdSuperv = Integer.parseInt(req.getParameter("nIdSupervisor"));
		String fProg = req.getParameter("fProgramada");
		String fEjec = req.getParameter("fEjecucion");
		String cObs = req.getParameter("cObservaciones");
		
		return ot.crear( new OTdto( 0, nContrato, nIdSuperv, fProg, fEjec, cObs ) );
	}
	
	@RequestMapping("/modificar")
	public @ResponseBody int modificar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));
		int nContrato = Integer.parseInt(req.getParameter("nContrato"));
		int nIdSuperv = Integer.parseInt(req.getParameter("nIdSupervisor"));
		String fProg = req.getParameter("fProgramada");
		String fEjec = req.getParameter("fEjecucion");
		String cObs = req.getParameter("cObservaciones");
		
		return ot.modificar( new OTdto( id, nContrato, nIdSuperv, fProg, fEjec, cObs ) );
	}
	
	@RequestMapping("/eliminar")
	public @ResponseBody int eliminar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));
		
		return ot.eliminar( id );
	}

	@RequestMapping("/consultar")
	public @ResponseBody OTdto2 consultar(HttpServletRequest req) {
		int id = Integer.parseInt(req.getParameter("id"));

		return ot.consultar( id );
	}

	@RequestMapping("/listar")
	public @ResponseBody List<OTdto2> listar(HttpServletRequest req) {
		return ot.listar();
	}
}

