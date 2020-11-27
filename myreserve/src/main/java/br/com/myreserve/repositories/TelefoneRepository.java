package br.com.myreserve.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.com.myreserve.entities.Telefone;

public interface TelefoneRepository extends CrudRepository<Telefone, Integer>{
	
	@Transactional
	@Modifying
	@Query("delete from Telefone t where t.fk_estabelecimento = :fkEstab")
	void deleteAllByFk(@Param("fkEstab") Integer idEstab);

}
