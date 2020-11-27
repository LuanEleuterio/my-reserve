package br.com.myreserve.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import br.com.myreserve.entities.Estabelecimento;

public interface EstabelecimentoRepository extends PagingAndSortingRepository<Estabelecimento, Integer>{
	
	List<Estabelecimento> findByNomeContaining(String nome);
	
	Optional<Estabelecimento> findByEmail(String email);
	
	@Query("select e from Estabelecimento e where e.fk_categoria = :fkCategoria")
	List<Estabelecimento> findByCategoria(@Param("fkCategoria") Integer fkCategoria);
}
