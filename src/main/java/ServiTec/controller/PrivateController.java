package ServiTec.controller;

import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ServiTec.entity.Usuario;
import ServiTec.service.IUsuarioService;

@Controller
@RequestMapping("/private")
public class PrivateController {
	
	@Autowired
	private IUsuarioService usuarioService;
	
	@GetMapping("menuInicio_pag")
	public String menuInicio(Authentication auth, HttpSession session)
	{
		String username = auth.getName();
		if(session.getAttribute("usuario") == null)
		{
			Usuario usuario  = usuarioService.findByUsername(username);
			usuario.setPassword(null);
			session.setAttribute("usuario", usuario);
			
		}
		return "menuInicio_pag";
	
	}
	
	

	

}
