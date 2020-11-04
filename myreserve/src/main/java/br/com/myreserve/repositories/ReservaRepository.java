package br.com.myreserve.repositories;

import org.springframework.data.repository.CrudRepository;

import br.com.myreserve.entities.Reserva;

public interface ReservaRepository extends CrudRepository<Reserva, Integer>{

	//Reserva findOneByFk_estabelecimento(Integer id);
	//Reserva findOneByFk_usuario(Integer id);
}
