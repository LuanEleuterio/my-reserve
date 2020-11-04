package br.com.myreserve.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.myreserve.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
	
	List<Usuario> findByNome_usuarioContaining(String nome);

}
