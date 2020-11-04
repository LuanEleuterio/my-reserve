package br.com.myreserve.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.myreserve.entities.Estabelecimento;

public interface EstabelecimentoRepository extends CrudRepository<Estabelecimento, Integer>{
	
	List<Estabelecimento> findByNomeContaining(String nome);
}
