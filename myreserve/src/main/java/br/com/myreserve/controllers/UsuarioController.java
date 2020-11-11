package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.myreserve.dto.CredenciaisDTO;
import br.com.myreserve.dto.TokenDTO;
import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.entities.Usuario;
import br.com.myreserve.exceptions.SenhaInvalidaException;
import br.com.myreserve.repositories.UsuarioRepository;
import br.com.myreserve.services.JwtService;
import br.com.myreserve.services.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired 
	UsuarioService usuarioService;
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping()
	public Iterable<Usuario> getUsuario(){
		return usuarioRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Usuario> getById(@PathVariable int id) {
		return usuarioRepository.findById(id);
	}
	
	@PostMapping()
	public void addUsuario(@RequestBody Usuario usuario) {
		String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
		usuario.setSenha(senhaCriptografada);
		usuarioRepository.save(usuario);
	}
	
	@PostMapping("/auth")
	public TokenDTO autenticar(@RequestBody CredenciaisDTO credenciais) {
		try {
			Usuario usuario = Usuario.builder()
												.email(credenciais.getLogin())
												.senha(credenciais.getSenha())
												.build();
			
			usuarioService.autenticar(usuario);
			String token = jwtService.gerarTokenUsuario(usuario);
			return new TokenDTO(usuario.getEmail(), token);
		}catch(UsernameNotFoundException | SenhaInvalidaException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
		}
	}
	
	@PutMapping("/{idUser}")
	public Usuario updateUser(@PathVariable int idUser, @RequestBody Usuario dadosUsuario) throws Exception{
		Usuario userDB = usuarioRepository.findById(idUser)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosUsuario.getNome() != null) userDB.setNome(dadosUsuario.getNome());
		if(dadosUsuario.getDt_nasc() != null) userDB.setDt_nasc(dadosUsuario.getDt_nasc());
		if(dadosUsuario.getEmail() != null) userDB.setEmail(dadosUsuario.getEmail());
		if(dadosUsuario.getTelefone() != null) userDB.setTelefone(dadosUsuario.getTelefone());
		if(dadosUsuario.getImg_perfil() != null) userDB.setImg_perfil(dadosUsuario.getImg_perfil());
		if(dadosUsuario.getSenha() != null) userDB.setSenha(passwordEncoder.encode(dadosUsuario.getSenha()));
		
		return usuarioRepository.save(userDB);
		
	}
	
}
