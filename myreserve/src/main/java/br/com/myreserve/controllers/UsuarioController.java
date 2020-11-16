package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Logins;
import br.com.myreserve.entities.Usuario;
import br.com.myreserve.repositories.LoginsRepository;
import br.com.myreserve.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	LoginsRepository loginsRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@CrossOrigin
	@GetMapping()
	public Iterable<Usuario> getUsuario(){
		return usuarioRepository.findAll();
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public Optional<Usuario> getById(@PathVariable int id) {
		return usuarioRepository.findById(id);
	}
	
	@CrossOrigin
	@PostMapping()
	public void addUsuario(@RequestBody Usuario usuario) {
		Logins login = new Logins();
		
		String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
		
		usuario.setSenha(senhaCriptografada);
		usuario.setUser_ativo(true);
		usuarioRepository.save(usuario);
		
		login.setEmail(usuario.getEmail());
		login.setSenha(senhaCriptografada);
		login.setIdUsuario(usuario.getId_usuario());
		loginsRepository.save(login);
	}
	
	@CrossOrigin
	@PutMapping("/{idUser}")
	public Usuario updateUser(@PathVariable int idUser, @RequestBody Usuario dadosUsuario) throws Exception{
		Usuario userDB = usuarioRepository.findById(idUser)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosUsuario.getNome() != null) userDB.setNome(dadosUsuario.getNome());
		if(dadosUsuario.getDt_nasc() != null) userDB.setDt_nasc(dadosUsuario.getDt_nasc());
		if(dadosUsuario.getEmail() != null) userDB.setEmail(dadosUsuario.getEmail());
		if(dadosUsuario.getTelefone() != null) userDB.setTelefone(dadosUsuario.getTelefone());
		if(dadosUsuario.getImg_perfil() != null) userDB.setImg_perfil(dadosUsuario.getImg_perfil());
		if(dadosUsuario.getSenha() != null) { 
			String newPassword = passwordEncoder.encode(dadosUsuario.getSenha());
			
			userDB.setSenha(newPassword);
			
			Logins login = loginsRepository.findOneByIdUsuario(idUser)
					.orElseThrow(() -> new IllegalAccessException());
			
			login.setSenha(newPassword);
			
			loginsRepository.save(login);
		}
		
		return usuarioRepository.save(userDB);
		
	}
	
}
