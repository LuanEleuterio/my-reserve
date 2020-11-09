package br.com.myreserve.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.myreserve.entities.Estabelecimento;

public interface EstabelecimentoRepository extends PagingAndSortingRepository<Estabelecimento, Integer>{
	
	List<Estabelecimento> findByNomeContaining(String nome);
}
