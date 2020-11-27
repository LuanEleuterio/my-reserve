package br.com.myreserve.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.com.myreserve.entities.Horario;

public interface HorarioRepository extends CrudRepository<Horario, Integer>{
	
	@Transactional
	@Modifying
	@Query("update Horario h set h.qtd_pessoa_vaga = :qtdPessoa where h.fk_estabelecimento = :fkEstab")
	void updateQtdPessoaByFk(@Param("qtdPessoa") Integer qtdPessoa, @Param("fkEstab") Integer idEstab);
	
	@Query("select h from Horario h where h.fk_estabelecimento = :fkEstab")
	Iterable<Horario> selectAllByFk(@Param("fkEstab") Integer idEstab);
}
