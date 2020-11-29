package br.com.myreserve.controllers;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.myreserve.dto.CredenciaisDTO;
import br.com.myreserve.dto.TokenDTO;
import br.com.myreserve.entities.Logins;
import br.com.myreserve.exceptions.SenhaInvalidaException;
import br.com.myreserve.repositories.LoginsRepository;
import br.com.myreserve.services.DeletaRegistroEstabService;
import br.com.myreserve.services.JwtService;
import br.com.myreserve.services.LoginsService;
import br.com.myreserve.services.UserOrEstabService;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginsController {
	
	@Autowired 
	LoginsService loginsService;
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	UserOrEstabService userEstabService;
	
	@Autowired
	DeletaRegistroEstabService deletaRegService;
	
	@Autowired
	LoginsRepository loginRepository;
	
	@PostMapping("/auth")
	public TokenDTO autenticar(@RequestBody CredenciaisDTO credenciais) throws Exception {
		try {
			Logins login= Logins.builder()
								.email(credenciais.getLogin())
								.senha(credenciais.getSenha())
								.build();
			
			loginsService.autenticar(login);
			String token = jwtService.gerarToken(login);
			
			String userOrEstab = userEstabService.verificaUserOrEstab(credenciais.getLogin());
			
			Logins loginId = loginRepository.findByEmail(credenciais.getLogin())
					.orElseThrow(() -> new IllegalAccessException());
			
			if(userOrEstab.equals("USER")) {
				System.out.println(loginId.getIdUsuario());
				return new TokenDTO(login.getEmail(), token, userOrEstab, loginId.getIdUsuario());
			}else {
				return new TokenDTO(login.getEmail(), token, userOrEstab, loginId.getIdEstabelecimento());
			}

		}catch(UsernameNotFoundException | SenhaInvalidaException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
		}
	}
	
	@DeleteMapping("/delete")
	public void deleteLogin(@PathParam("idEstab") Integer idEstab, @PathParam("etapa") Integer etapa) throws IllegalAccessException {
		deletaRegService.deletaAllEstabelecimento(idEstab, etapa);
	}
}
