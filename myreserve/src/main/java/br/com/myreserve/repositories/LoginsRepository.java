package br.com.myreserve.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import br.com.myreserve.entities.Logins;

public interface LoginsRepository extends CrudRepository<Logins, Integer>{

	Optional<Logins> findByEmail(String email);
	
	Optional<Logins> findOneByIdEstabelecimento(Integer idEstab);
	
	Optional<Logins> findOneByIdUsuario(Integer idUser);
}
