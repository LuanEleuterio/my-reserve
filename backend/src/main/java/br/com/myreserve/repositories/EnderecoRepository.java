package br.com.myreserve.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.com.myreserve.entities.Endereco;

public interface EnderecoRepository extends CrudRepository<Endereco, Integer> {
	
	@Transactional
	@Modifying
	@Query("delete from Endereco e where e.fk_estabelecimento = :fkEstab")
	void deleteByFk(@Param("fkEstab") Integer idEstab);
}
