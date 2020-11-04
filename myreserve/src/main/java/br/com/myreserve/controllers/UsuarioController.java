package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Usuario;
import br.com.myreserve.repositories.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	UsuarioRepository usuarioRepository;
	
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
		usuarioRepository.save(usuario);
	}
	
	@PutMapping("/{idUser}")
	public Usuario updateUser(@PathVariable int idUser, @RequestBody Usuario dadosUsuario) throws Exception{
		Usuario userDB = usuarioRepository.findById(idUser)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosUsuario.getNome_usuario() != null) userDB.setNome_usuario(dadosUsuario.getNome_usuario());
		if(dadosUsuario.getImg_perfil() != null) userDB.setImg_perfil(dadosUsuario.getImg_perfil());
		return usuarioRepository.save(userDB);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
