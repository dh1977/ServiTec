package ServiTec.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebAppController {
	@RequestMapping("/")
	public String irInicio() {
		return("index");
	}

	@RequestMapping("/clientes")
	public String irClientes() {
		return("clientes");
	}
	@RequestMapping("/contrato")
	public String irContratos() {
		return("contrato");
	}
	
	@RequestMapping("/personal")
	public String irPersonal() {
		return("personal");
	}
		
	@RequestMapping("/equipos")
	public String irEquipos() {
		return("equipos");
	}

	@RequestMapping("/ot")
	public String irOT() {
		return("ot");
	}
	@RequestMapping("/menuInicio_pag.html")
	public String ir() {
		return("menuInicio_pag.html");
	}
	
//	@RequestMapping("/login")
//	public String index() {
//		return("index");
//	}
}
