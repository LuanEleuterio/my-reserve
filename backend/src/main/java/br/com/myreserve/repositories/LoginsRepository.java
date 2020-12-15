package br.com.myreserve.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.com.myreserve.entities.Logins;

public interface LoginsRepository extends CrudRepository<Logins, Integer>{

	Optional<Logins> findByEmail(String email);
	
	Optional<Logins> findOneByIdEstabelecimento(Integer idEstab);
	
	Optional<Logins> findOneByIdUsuario(Integer idUser);
	
	@Transactional
	@Modifying
	@Query("delete from Logins l where l.idEstabelecimento = :fkEstab")
	void deleteByFk(@Param("fkEstab") Integer idEstab);
}
