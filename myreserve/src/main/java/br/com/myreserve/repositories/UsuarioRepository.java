package br.com.myreserve.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.myreserve.entities.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {
	
	List<Usuario> findByNomeContaining(String nome);

	Optional<Usuario> findByEmail(String email);
}
