package br.com.myreserve.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.myreserve.entities.Estabelecimento;

public interface EstabelecimentoRepository extends PagingAndSortingRepository<Estabelecimento, Integer>{
	
	List<Estabelecimento> findByNomeContaining(String nome);
	
	Optional<Estabelecimento> findByEmail(String email);
}
